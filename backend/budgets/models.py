from django.db import models

from trips.models import Trip, TripStop


class Expense(models.Model):
    TRANSPORT = "Transport"
    ACCOMMODATION = "Accommodation"
    ACTIVITIES = "Activities"
    FOOD = "Food"
    SHOPPING = "Shopping"
    OTHER = "Other"
    CATEGORY_CHOICES = [(c, c) for c in [TRANSPORT, ACCOMMODATION, ACTIVITIES, FOOD, SHOPPING, OTHER]]

    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="expenses")
    trip_stop = models.ForeignKey(TripStop, on_delete=models.SET_NULL, related_name="expenses", null=True, blank=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    description = models.CharField(max_length=240)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date", "category"]
