from django.contrib.auth import get_user_model, authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
import json
from .models import Campaign, Donation
from .serializers import CampaignSerializer, DonationSerializer, UserSerializer
from .models import CustomUser
import json
import stripe
from django.conf import settings
from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.contrib import messages
from .models import CustomUser

User = get_user_model()

# ✅ Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY  # Add this to your Django settings

# ✅ Send Email Verification Link
def send_verification_email(user, request):
    token = default_token_generator.make_token(user)
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    verification_link = request.build_absolute_uri(reverse('verify_email', args=[uidb64, token]))

    subject = "Verify Your Email"
    message = f"Click the link to verify your email: {verification_link}"

    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=True)


# ✅ User Registration with Stripe Connect
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            full_name = data.get("full_name", "")
            email = data.get("email", "")
            password = data.get("password", "")
            address = data.get("address", "")
            phone = data.get("phone", "")

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already registered."}, status=400)

            # ✅ Create user (inactive & unverified)
            user = User.objects.create(
                username=full_name, email=email, first_name=full_name,
                address=address, phone=phone, is_verified=False, is_active=False
            )
            user.set_password(password)
            user.save()

            send_verification_email(user, request)  # ✅ Send verification email

            return JsonResponse({"message": "Registration successful! Please verify your email."}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data."}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=405)

def verify_email(request, uidb64, token):
    if request.method != "GET":
        return JsonResponse({"error": "Invalid request method."}, status=405)

    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return HttpResponse("Invalid or expired verification link.", status=400)

    if user and default_token_generator.check_token(user, token):
        user.is_verified = True
        user.is_active = True
        user.save()

        # Create Stripe account
        try:
            stripe_account = stripe.Account.create(
                type="express",
                country="US",
                email=user.email,
                capabilities={
                    "card_payments": {"requested": True},
                    "transfers": {"requested": True},
                },
                business_type="individual",
            )

            user.stripe_account_id = stripe_account.id
            user.is_stripe_connected = False
            user.save()

            # Generate onboarding link
            account_link = stripe.AccountLink.create(
                account=stripe_account.id,
                refresh_url="http://localhost:5173/",
                return_url="http://localhost:5173/login",  # Redirect to login after onboarding
                type="account_onboarding",
            )

            # Redirect directly to Stripe onboarding
            return HttpResponseRedirect(account_link.url)

        except stripe.error.StripeError as e:
            return JsonResponse({"error": f"Stripe error: {str(e)}"}, status=400)

    return HttpResponse("Invalid or expired verification link.", status=400)
import stripe
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from .models import CustomUser

stripe.api_key = settings.STRIPE_SECRET_KEY
from django.shortcuts import get_object_or_404

@login_required
def create_onboarding_link(request, stripe_account_id):  # Accept stripe_account_id
    user = request.user  
    print(f"User Stripe ID: {user.stripe_account_id}, Received: {stripe_account_id}")  # ✅ Debug

    if user.stripe_account_id != stripe_account_id:
        return JsonResponse({"error": "Invalid Stripe account ID."}, status=403)

    try:
        # ✅ Create Stripe onboarding link
        account_link = stripe.AccountLink.create(
            account=stripe_account_id,
            refresh_url="http://localhost:5173/",  # Redirect if canceled
            return_url="http://localhost:5173/",  # Redirect after onboarding
            type="account_onboarding",
        )
        return JsonResponse({"onboarding_url": account_link.url})

    except stripe.error.StripeError as e:
        return JsonResponse({"error": f"Stripe error: {str(e)}"}, status=400)


    
import stripe
from django.conf import settings
from django.http import JsonResponse
from .models import CustomUser

stripe.api_key = settings.STRIPE_SECRET_KEY

def create_stripe_account(request):
    if request.method == "POST":
        user = request.user  # Assuming user is authenticated
        
        try:
            # ✅ Create Stripe account with required capabilities
            account = stripe.Account.create(
                type="express",  # Use 'custom' if you're handling everything
                country="US",  # Update based on your target country
                email=user.email,
                capabilities={
                    "card_payments": {"requested": True},  # ✅ Required for US accounts
                    "transfers": {"requested": True},  # ✅ Only works after card_payments
                },
                business_type="individual",  # Adjust based on fundraiser type
            )

            # ✅ Save Stripe Account ID
            user.stripe_account_id = account.id
            user.save()

            return JsonResponse({"stripe_account_id": account.id})
        
        except stripe.error.StripeError as e:
            return JsonResponse({"error": f"Stripe error: {str(e)}"}, status=400)



from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
import json

@csrf_exempt
def login_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print(data)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({
                    "status": "error",
                    "message": "Email and password are required"
                }, status=400)

            user = authenticate(request, email=email, password=password)

            if user is not None:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return JsonResponse({
                    "status": "success",
                    "message": "Login successful",
                    "token": token.key,
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "username": user.username
                    }
                }, status=200)
            else:
                return JsonResponse({
                    "status": "error",
                    "message": "Invalid email or password"
                }, status=400)

        except json.JSONDecodeError:
            return JsonResponse({
                "status": "error",
                "message": "Invalid JSON data"
            }, status=400)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            }, status=500)

    return JsonResponse({
        "status": "error",
        "message": "Only POST method allowed"
    }, status=405)

# ✅ Campaign API
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Campaign
from .serializers import CampaignSerializer

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_campaign(request):
    # Check if the user is verified
    if not request.user.is_verified:
        return Response({"error": "You must verify your email before creating a campaign."}, status=403)

    title = request.data.get("title")
    description = request.data.get("description")
    goal_amount = request.data.get("goal_amount")
    header_image = request.FILES.get("header_image")

    if not title or not description or not goal_amount:
        return Response({"error": "All fields are required except image."}, status=400)

    campaign = Campaign.objects.create(
        user=request.user,
        title=title,
        description=description,
        goal_amount=goal_amount,
        header_image=header_image
    )
    return Response(CampaignSerializer(campaign).data, status=201)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Donation, Campaign

@csrf_exempt
def create_donation(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            campaign = Campaign.objects.get(id=data["campaign_id"])

            donation = Donation.objects.create(
                campaign=campaign,
                donor_name=data["donor_name"],
                amount=data["amount"],
                email=data["email"],
                is_anonymous=data["is_anonymous"],
            )

            # Update campaign current_amount
            campaign.current_amount += donation.amount
            campaign.save()

            return JsonResponse({"message": "Donation created successfully", "donation_id": donation.id}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_verified": user.is_verified,  # ✅ Ensure frontend can check verification
        "address": user.address,
        "phone": user.phone,
    })

from django.contrib.auth import logout

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_api(request):
    logout(request)
    return Response({"message": "Logout successful"}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_campaigns(request):
    campaigns = Campaign.objects.filter(is_published=True).order_by("-id")  # Only published campaigns
    serializer = CampaignSerializer(campaigns, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_campaign(request, campaign_id):
    try:
        campaign = Campaign.objects.get(id=campaign_id)
        return Response(CampaignSerializer(campaign).data)
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found"}, status=404)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_campaign(request, campaign_id):
    try:
        campaign = Campaign.objects.get(id=campaign_id, user=request.user)

        campaign.title = request.data.get("title", campaign.title)
        campaign.description = request.data.get("description", campaign.description)
        campaign.goal_amount = request.data.get("goal_amount", campaign.goal_amount)

        if "header_image" in request.FILES:
            campaign.header_image = request.FILES["header_image"]

        campaign.save()
        return Response(CampaignSerializer(campaign).data)
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found or permission denied"}, status=403)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_campaign(request, campaign_id):
    try:
        campaign = Campaign.objects.get(id=campaign_id, user=request.user)
        campaign.delete()
        return Response({"message": "Campaign deleted successfully"}, status=200)
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found or permission denied"}, status=403)
@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_donations(request, campaign_id):
    try:
        donations = Donation.objects.filter(campaign_id=campaign_id)
        return Response(DonationSerializer(donations, many=True).data)
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found"}, status=404)
    

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model

CustomUser = get_user_model()  # Fetch the custom user model dynamically

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user  # This will be an instance of CustomUser

    return Response({
        "username": user.username,
        "email": user.email,
        "is_verified": user.is_verified,  # Ensure this field exists in your model
    })






# strip integaration

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class CreateCheckoutSessionView(View):
    def post(self, request, *args, **kwargs):
        import json
        data = json.loads(request.body)

        # Extract campaign_id and amount
        campaign_id = data.get("campaign_id")
        amount = data.get("amount")

        # Validate inputs
        try:
            amount = float(amount)
            if amount <= 0:
                return JsonResponse({"error": "Invalid amount"}, status=400)
        except (TypeError, ValueError):
            return JsonResponse({"error": "Invalid amount format"}, status=400)

        # Get campaign object
        campaign = get_object_or_404(Campaign, id=campaign_id)

        # Define domain (Change for production)
        YOUR_DOMAIN = "http://127.0.0.1:8000"

        # Create Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "unit_amount": int(amount * 100),  # Convert dollars to cents
                        "product_data": {"name": campaign.title},
                    },
                    "quantity": 1,
                }
            ],
            metadata={"campaign_id": str(campaign.id), "amount": str(amount)},
            mode="payment",
            success_url=f"{YOUR_DOMAIN}/success/?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{YOUR_DOMAIN}/cancel/",
        )

        return JsonResponse({"url": checkout_session.url})

from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})



# import stripe
# import json
# from django.conf import settings
# from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.core.mail import send_mail
# from django.shortcuts import get_object_or_404
# from .models import Campaign  # Import your Campaign model

# @csrf_exempt
# def stripe_webhook(request):
#     payload = request.body
#     sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
#     event = None

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, settings.STRIPE_WEBHOOK_SECRET  # Ensure you set this in settings.py
#         )
#     except ValueError:
#         return HttpResponse(status=400)  # Invalid payload
#     except stripe.error.SignatureVerificationError:
#         return HttpResponse(status=400)  # Invalid signature

#     # Handle the event for successful payments
#     if event['type'] == 'checkout.session.completed':
#         session = event['data']['object']

#         customer_email = session["customer_details"]["email"]
#         amount_donated = session["amount_total"] / 100  # Convert cents to dollars
#         campaign_id = session["metadata"]["campaign_id"]

#         campaign = get_object_or_404(Campaign, id=campaign_id)

#         # Send confirmation email
#         send_mail(
#             subject="Thank you for your donation!",
#             message=f"Dear Donor,\n\nThank you for your generous donation of ${amount_donated} to {campaign.title}. Your support is greatly appreciated!\n\nBest regards,\nYour Fundraising Team",
#             recipient_list=[customer_email],
#             from_email="your_email@example.com"
#         )

#     return HttpResponse(status=200)


