from django.contrib import admin

from .models import Activity


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "category", "estimated_cost", "rating")
    list_filter = ("category", "city__country")
    search_fields = ("name", "city__city_name")
