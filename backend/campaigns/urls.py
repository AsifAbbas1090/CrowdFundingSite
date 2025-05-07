from django.urls import path
from .views import  CreateCheckoutSessionView, create_campaign, create_donation, create_onboarding_link, create_stripe_account, get_campaign, get_campaigns, get_csrf_token, get_user, login_api, register_user,  verify_email
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", register_user, name="register"),
   path("login/", login_api, name="login_api"),
    path("verify-email/<str:uidb64>/<str:token>/", verify_email, name="verify_email"),
    path("api/campaigns/create/", create_campaign, name="create_campaign"),
    # path("donations/", DonationCreateView.as_view(), name="donations"),
    path("campaigns/", get_campaigns, name="get_campaigns"),  
    path("campaigns/<int:campaign_id>/", get_campaign, name="get_campaign"),
    path('user/', get_user, name='get_user'),
    # path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    # path('taken/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path("stripe/onboarding/<str:stripe_account_id>/", create_onboarding_link, name="stripe_onboarding"),
    path("create-stripe-account/", create_stripe_account, name="create_stripe_account"),
    path("stripe-checkout/", CreateCheckoutSessionView.as_view(), name="stripe-checkout"),
     path("csrf/", get_csrf_token, name="csrf"),
    #    path('webhook/stripe/', stripe_webhook, name='stripe-webhook'),
    path("create-donation/", create_donation, name="create-donation"),
    
    
]
