from rest_framework import permissions


class IsTripOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        trip = getattr(obj, "trip", obj)
        if hasattr(obj, "trip_stop"):
            trip = obj.trip_stop.trip
        return trip.user_id == request.user.id
