from django.db.models import Q
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Activity
from .serializers import ActivitySerializer


class ActivityViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ActivitySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Activity.objects.select_related("city")
        q = self.request.query_params.get("q") or self.request.query_params.get("search")
        city = self.request.query_params.get("city")
        category = self.request.query_params.get("category")
        max_cost = self.request.query_params.get("max_cost")
        max_duration = self.request.query_params.get("max_duration")
        min_rating = self.request.query_params.get("min_rating")
        if q:
            qs = qs.filter(Q(name__icontains=q) | Q(description__icontains=q) | Q(city__city_name__icontains=q))
        if city:
            qs = qs.filter(city_id=city)
        if category:
            qs = qs.filter(category=category)
        if max_cost:
            qs = qs.filter(estimated_cost__lte=max_cost)
        if max_duration:
            qs = qs.filter(duration__lte=max_duration)
        if min_rating:
            qs = qs.filter(rating__gte=min_rating)
        return qs

    @action(detail=False, methods=["get"])
    def search(self, request):
        return self.list(request)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def save(self, request, pk=None):
        activity = self.get_object()
        activity.favorited_by.add(request.user)
        return Response(self.get_serializer(activity).data)

    @action(detail=True, methods=["delete"], permission_classes=[permissions.IsAuthenticated])
    def unsave(self, request, pk=None):
        activity = self.get_object()
        activity.favorited_by.remove(request.user)
        return Response(status=204)
