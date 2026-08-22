from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("email", "name", "is_admin", "is_staff", "is_active")
    ordering = ("email",)
    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("name", "profile_image", "language", "is_admin")}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {"fields": ("email", "name")}),)
