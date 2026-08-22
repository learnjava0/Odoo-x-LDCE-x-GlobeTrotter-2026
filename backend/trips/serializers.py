from rest_framework import serializers

from activities.serializers import ActivitySerializer
from destinations.serializers import DestinationSerializer
from .models import ItineraryActivity, Trip, TripStop


class ItineraryActivitySerializer(serializers.ModelSerializer):
    activity_detail = ActivitySerializer(source="activity", read_only=True)

    class Meta:
        model = ItineraryActivity
        fields = "__all__"

    def validate(self, attrs):
        stop = attrs.get("trip_stop") or self.instance.trip_stop
        date = attrs.get("date") or self.instance.date
        if date < stop.arrival_date or date > stop.departure_date:
            raise serializers.ValidationError("Activity date must be within the stop dates.")
        return attrs


class TripStopSerializer(serializers.ModelSerializer):
    city_detail = DestinationSerializer(source="city", read_only=True)
    itinerary_activities = ItineraryActivitySerializer(many=True, read_only=True)

    class Meta:
        model = TripStop
        fields = "__all__"

    def validate(self, attrs):
        trip = attrs.get("trip") or self.instance.trip
        arrival = attrs.get("arrival_date") or self.instance.arrival_date
        departure = attrs.get("departure_date") or self.instance.departure_date
        if arrival > departure:
            raise serializers.ValidationError("Departure date cannot be before arrival date.")
        if arrival < trip.start_date or departure > trip.end_date:
            raise serializers.ValidationError("Stop dates must be inside the trip date range.")
        return attrs


class TripSerializer(serializers.ModelSerializer):
    stops = TripStopSerializer(many=True, read_only=True)
    cities_count = serializers.SerializerMethodField()
    activities_count = serializers.SerializerMethodField()
    estimated_budget = serializers.SerializerMethodField()
    days_count = serializers.IntegerField(read_only=True)
    # Always compute status from dates so existing trips show the right badge on read
    status = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = "__all__"
        read_only_fields = ["user", "public_slug", "created_at", "updated_at"]

    def validate(self, attrs):
        start = attrs.get("start_date") or self.instance.start_date
        end = attrs.get("end_date") or self.instance.end_date
        if end < start:
            raise serializers.ValidationError("End date cannot be before start date.")
        return attrs

    def get_status(self, obj):
        """Derive status dynamically from dates so all existing trips are correct."""
        return obj.compute_status()

    def get_cities_count(self, obj):
        return getattr(obj, "cities_count", None) or obj.stops.count()

    def get_activities_count(self, obj):
        return getattr(obj, "activities_count", None) or ItineraryActivity.objects.filter(trip_stop__trip=obj).count()

    def get_estimated_budget(self, obj):
        return getattr(obj, "estimated_budget", None) or sum(item.estimated_cost or 0 for stop in obj.stops.all() for item in stop.itinerary_activities.all()) + sum(exp.amount or 0 for exp in obj.expenses.all())
