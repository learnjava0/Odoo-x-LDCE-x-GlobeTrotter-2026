from django.db.models import Q
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Destination
from .serializers import DestinationSerializer


class DestinationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DestinationSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Destination.objects.all()
        q = self.request.query_params.get("q") or self.request.query_params.get("search")
        country = self.request.query_params.get("country")
        region = self.request.query_params.get("region")
        max_cost = self.request.query_params.get("max_cost")
        min_popularity = self.request.query_params.get("min_popularity")
        if q:
            qs = qs.filter(Q(city_name__icontains=q) | Q(country__icontains=q) | Q(description__icontains=q))
        if country:
            qs = qs.filter(country__icontains=country)
        if region:
            qs = qs.filter(region__icontains=region)
        if max_cost:
            qs = qs.filter(cost_index__lte=max_cost)
        if min_popularity:
            qs = qs.filter(popularity_score__gte=min_popularity)
        return qs

    @action(detail=False, methods=["get"])
    def search(self, request):
        return self.list(request)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def save(self, request, pk=None):
        destination = self.get_object()
        destination.favorited_by.add(request.user)
        return Response(self.get_serializer(destination).data)

    @action(detail=True, methods=["delete"], permission_classes=[permissions.IsAuthenticated])
    def unsave(self, request, pk=None):
        destination = self.get_object()
        destination.favorited_by.remove(request.user)
        return Response(status=204)
