from django.contrib.auth import get_user_model
from django.db.models import Count, Sum
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from activities.models import Activity
from budgets.models import Expense
from destinations.models import Destination
from trips.models import Trip


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (request.user.is_staff or request.user.is_admin))


class AdminAnalyticsViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=["get"])
    def statistics(self, request):
        User = get_user_model()
        return Response({
            "total_users": User.objects.count(),
            "total_trips": Trip.objects.count(),
            "public_trips": Trip.objects.filter(is_public=True).count(),
            "active_users": User.objects.filter(is_active=True).count(),
            "total_destinations": Destination.objects.count(),
            "total_activities": Activity.objects.count(),
            "average_trip_budget": Expense.objects.aggregate(total=Sum("amount"))["total"] or 0,
        })

    @action(detail=False, methods=["get"])
    def users(self, request):
        User = get_user_model()
        return Response(list(User.objects.values("id", "name", "email", "is_active", "is_admin", "created_at")[:100]))

    @action(detail=False, methods=["get"])
    def trips(self, request):
        return Response(list(Trip.objects.select_related("user").values("id", "name", "user__email", "start_date", "end_date", "is_public")[:100]))

    @action(detail=False, methods=["get"], url_path="popular-destinations")
    def popular_destinations(self, request):
        rows = Destination.objects.annotate(trip_count=Count("trip_stops")).order_by("-trip_count", "-popularity_score")[:10]
        return Response([{"id": d.id, "city_name": d.city_name, "country": d.country, "trip_count": d.trip_count} for d in rows])
