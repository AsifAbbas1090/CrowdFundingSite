from django.contrib import admin
from .models import Campaign, Donation
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'goal_amount', 'is_published','header_image')
    list_filter = ('user', 'is_published')
    search_fields = ('title', 'user__username')  # Allow searching by user's username

    def save_model(self, request, obj, form, change):
        # Automatically set the user to the currently logged-in user if not set
        if not obj.user_id:
            obj.user = request.user
        super().save_model(request, obj, form, change)


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'is_verified', 'is_staff', 'is_active')
    search_fields = ('username', 'email')
    ordering = ('id',)
    fieldsets = UserAdmin.fieldsets + (
        ("Additional Info", {"fields": ("is_verified", "address", "phone")}),
    )


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('id', 'campaign', 'display_donor', 'amount', 'email', 'is_anonymous', 'created_at')
    list_filter = ('is_anonymous', 'campaign', 'created_at')
    search_fields = ('donor_name', 'email', 'campaign__title')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    
    def display_donor(self, obj):
        return "Anonymous" if obj.is_anonymous else obj.donor_name
    display_donor.short_description = 'Donor Name'