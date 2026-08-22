from django.contrib import admin

from .models import Destination


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ("city_name", "country", "cost_index", "popularity_score")
    search_fields = ("city_name", "country")
