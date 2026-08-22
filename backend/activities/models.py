from django.conf import settings
from django.db import models

from destinations.models import Destination


class Activity(models.Model):
    SIGHTSEEING = "Sightseeing"
    FOOD = "Food"
    ADVENTURE = "Adventure"
    SHOPPING = "Shopping"
    CULTURE = "Culture"
    NATURE = "Nature"
    NIGHTLIFE = "Nightlife"
    ENTERTAINMENT = "Entertainment"
    OTHER = "Other"
    CATEGORY_CHOICES = [(c, c) for c in [SIGHTSEEING, FOOD, ADVENTURE, SHOPPING, CULTURE, NATURE, NIGHTLIFE, ENTERTAINMENT, OTHER]]

    city = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name="activities")
    name = models.CharField(max_length=160, db_index=True)
    description = models.TextField()
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, db_index=True)
    image = models.URLField(blank=True)
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.0)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    favorited_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="favorite_activities", blank=True)

    class Meta:
        ordering = ["city__city_name", "name"]
        indexes = [models.Index(fields=["category", "estimated_cost"])]

    def __str__(self):
        return self.name
