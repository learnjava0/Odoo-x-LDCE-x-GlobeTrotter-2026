from django.contrib import admin

from .models import ItineraryActivity, Trip, TripStop


admin.site.register(Trip)
admin.site.register(TripStop)
admin.site.register(ItineraryActivity)
