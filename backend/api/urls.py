"""
Central API router — all endpoints live under /api/
"""
from django.urls import include, path
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from accounts.views import AuthViewSet, UserViewSet
from trips.views import TripViewSet, TripStopViewSet, ItineraryActivityViewSet
from destinations.views import DestinationViewSet
from activities.views import ActivityViewSet
from budgets.views import ExpenseViewSet
from analytics.views import AdminAnalyticsViewSet
from sharing.views import PublicTripViewSet


def health_check(request):
    return JsonResponse({"status": "ok"})


router = DefaultRouter()
# Auth
router.register(r"auth", AuthViewSet, basename="auth")
router.register(r"users", UserViewSet, basename="users")
# Trips
router.register(r"trips", TripViewSet, basename="trips")
router.register(r"stops", TripStopViewSet, basename="stops")
router.register(r"itinerary-activities", ItineraryActivityViewSet, basename="itinerary-activities")
# Destinations & Activities
router.register(r"destinations", DestinationViewSet, basename="destinations")
router.register(r"activities", ActivityViewSet, basename="activities")
# Budget
router.register(r"expenses", ExpenseViewSet, basename="expenses")
# Admin Analytics
router.register(r"admin", AdminAnalyticsViewSet, basename="admin")
# Public trip sharing (lookup by slug)
router.register(r"public", PublicTripViewSet, basename="public")

urlpatterns = [
    path("health/", health_check, name="health-check"),
    # JWT token refresh
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("", include(router.urls)),
]
