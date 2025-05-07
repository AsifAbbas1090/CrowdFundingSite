from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.conf import settings

def send_verification_email(user, request):
    token = default_token_generator.make_token(user)
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    verification_link = request.build_absolute_uri(reverse('verify_email', args=[uidb64, token]))

    subject = "Verify Your Email"
    message = f"""
    Hello {user.first_name},

    Please click the link below to verify your email:

    {verification_link}

    After verifying, you'll be redirected to the login page.

    Thank you!
    """

    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)


def generate_verification_token(user):
    return default_token_generator.make_token(user)

def encode_uid(user):
    return urlsafe_base64_encode(force_bytes(user.pk))
