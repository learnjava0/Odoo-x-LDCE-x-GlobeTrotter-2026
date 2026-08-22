from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from trips.models import Trip
from trips.serializers import TripSerializer
from trips.services import calculate_trip_budget, duplicate_trip


class PublicTripViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TripSerializer
    lookup_field = "public_slug"
    lookup_url_kwarg = "public_slug"
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Trip.objects.filter(is_public=True).prefetch_related("stops__city", "stops__itinerary_activities__activity")

    def retrieve(self, request, *args, **kwargs):
        trip = self.get_object()
        data = self.get_serializer(trip).data
        data["budget"] = calculate_trip_budget(trip)
        return Response(data)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def copy(self, request, public_slug=None):
        trip = self.get_object()
        return Response(TripSerializer(duplicate_trip(trip, request.user), context={"request": request}).data, status=status.HTTP_201_CREATED)
