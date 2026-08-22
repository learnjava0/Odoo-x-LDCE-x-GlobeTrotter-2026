import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from activities.models import Activity
from destinations.models import Destination


def unique_slug(name):
    return f"{slugify(name)[:48]}-{uuid.uuid4().hex[:8]}"


class Trip(models.Model):
    PLANNING = "PLANNING"
    UPCOMING = "UPCOMING"
    ONGOING = "ONGOING"
    COMPLETED = "COMPLETED"
    STATUS_CHOICES = [(s, s) for s in [PLANNING, UPCOMING, ONGOING, COMPLETED]]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="trips", db_index=True)
    name = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    start_date = models.DateField(db_index=True)
    end_date = models.DateField()
    cover_image = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PLANNING)
    is_public = models.BooleanField(default=False)
    public_slug = models.SlugField(unique=True, null=True, blank=True, db_index=True)
    favorited_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="favorite_trips", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-start_date"]

    def compute_status(self):
        """Auto-derive status from trip dates relative to today."""
        today = timezone.localdate()
        if self.end_date < today:
            return self.COMPLETED
        elif self.start_date <= today <= self.end_date:
            return self.ONGOING
        elif self.start_date > today:
            return self.UPCOMING
        return self.PLANNING

    def save(self, *args, **kwargs):
        if self.is_public and not self.public_slug:
            self.public_slug = unique_slug(self.name)
        # Auto-set status based on dates (always keep dates as source of truth)
        self.status = self.compute_status()
        super().save(*args, **kwargs)

    @property
    def days_count(self):
        return (self.end_date - self.start_date).days + 1

    def __str__(self):
        return self.name


class TripStop(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="stops")
    city = models.ForeignKey(Destination, on_delete=models.PROTECT, related_name="trip_stops")
    arrival_date = models.DateField()
    departure_date = models.DateField()
    order = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "arrival_date"]
        unique_together = [("trip", "order")]

    def __str__(self):
        return f"{self.trip.name}: {self.city.city_name}"


class ItineraryActivity(models.Model):
    trip_stop = models.ForeignKey(TripStop, on_delete=models.CASCADE, related_name="itinerary_activities")
    activity = models.ForeignKey(Activity, on_delete=models.PROTECT, related_name="scheduled_items")
    date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        ordering = ["date", "order", "start_time"]

    def save(self, *args, **kwargs):
        if self.estimated_cost is None:
            self.estimated_cost = self.activity.estimated_cost
        super().save(*args, **kwargs)
