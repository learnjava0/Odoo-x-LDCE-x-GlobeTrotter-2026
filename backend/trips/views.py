from django.db.models import Count, Sum
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from budgets.serializers import ExpenseSerializer
from .models import ItineraryActivity, Trip, TripStop
from .permissions import IsTripOwner
from .serializers import ItineraryActivitySerializer, TripSerializer, TripStopSerializer
from .services import calculate_trip_budget, duplicate_trip


class TripViewSet(viewsets.ModelViewSet):
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripOwner]

    def get_queryset(self):
        return (
            Trip.objects.filter(user=self.request.user)
            .prefetch_related("stops__city", "stops__itinerary_activities__activity")
            .annotate(
                cities_count=Count("stops", distinct=True),
                activities_count=Count("stops__itinerary_activities", distinct=True),
                estimated_budget=Sum("stops__itinerary_activities__estimated_cost"),
            )
            .order_by("-start_date", "-id")
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def duplicate(self, request, pk=None):
        return Response(self.get_serializer(duplicate_trip(self.get_object(), request.user)).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def share(self, request, pk=None):
        trip = self.get_object()
        trip.is_public = bool(request.data.get("is_public", True))
        if not trip.is_public:
            trip.public_slug = None
        trip.save()
        return Response(self.get_serializer(trip).data)

    @action(detail=True, methods=["get"])
    def itinerary(self, request, pk=None):
        trip = self.get_object()
        return Response(TripStopSerializer(trip.stops.all(), many=True, context={"request": request}).data)

    @action(detail=True, methods=["get"])
    def budget(self, request, pk=None):
        return Response(calculate_trip_budget(self.get_object()))

    @action(detail=True, methods=["post"], url_path="reorder-stops")
    def reorder_stops(self, request, pk=None):
        trip = self.get_object()
        for item in request.data.get("items", []):
            TripStop.objects.filter(trip=trip, id=item["id"]).update(order=item["order"])
        return Response(TripStopSerializer(trip.stops.all(), many=True).data)

    @action(detail=True, methods=["post"], url_path="reorder-activities")
    def reorder_activities(self, request, pk=None):
        trip = self.get_object()
        for item in request.data.get("items", []):
            ItineraryActivity.objects.filter(trip_stop__trip=trip, id=item["id"]).update(order=item["order"])
        return Response(status=204)

    @action(detail=True, methods=["get", "post"])
    def stops(self, request, pk=None):
        trip = self.get_object()
        if request.method == "GET":
            return Response(TripStopSerializer(trip.stops.all(), many=True, context={"request": request}).data)
        serializer = TripStopSerializer(data={**request.data, "trip": trip.id}, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    @action(detail=True, methods=["post"])
    def activities(self, request, pk=None):
        trip = self.get_object()
        stop = TripStop.objects.filter(trip=trip, id=request.data.get("trip_stop")).first()
        if not stop:
            return Response({"detail": "Trip stop not found."}, status=404)
        serializer = ItineraryActivitySerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    @action(detail=True, methods=["post"])
    def expenses(self, request, pk=None):
        trip = self.get_object()
        serializer = ExpenseSerializer(data={**request.data, "trip": trip.id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class TripStopViewSet(viewsets.ModelViewSet):
    serializer_class = TripStopSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripOwner]

    def get_queryset(self):
        return TripStop.objects.filter(trip__user=self.request.user).select_related("trip", "city")


class ItineraryActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ItineraryActivitySerializer
    permission_classes = [permissions.IsAuthenticated, IsTripOwner]

    def get_queryset(self):
        return ItineraryActivity.objects.filter(trip_stop__trip__user=self.request.user).select_related("trip_stop__trip", "activity")
