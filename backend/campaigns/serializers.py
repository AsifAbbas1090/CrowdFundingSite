from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Campaign, Donation,CustomUser

User = get_user_model()


# ✅ User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "first_name", "address", "phone", "is_verified"]


# ✅ Campaign Serializer
class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = "__all__"


# ✅ Donation Serializer
class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = "__all__"
