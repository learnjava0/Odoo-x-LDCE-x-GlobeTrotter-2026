from django.conf import settings
from django.db import models


class Destination(models.Model):
    city_name = models.CharField(max_length=120, db_index=True)
    country = models.CharField(max_length=120, db_index=True)
    region = models.CharField(max_length=120, blank=True)
    description = models.TextField()
    image = models.URLField(blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    cost_index = models.PositiveIntegerField(default=50)
    popularity_score = models.PositiveIntegerField(default=50)
    favorited_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="favorite_cities", blank=True)

    class Meta:
        ordering = ["city_name"]
        indexes = [models.Index(fields=["city_name", "country"])]

    def __str__(self):
        return f"{self.city_name}, {self.country}"
