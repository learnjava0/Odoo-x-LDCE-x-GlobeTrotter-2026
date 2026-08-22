from rest_framework import serializers

from destinations.serializers import DestinationSerializer
from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    city_detail = DestinationSerializer(source="city", read_only=True)
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = "__all__"

    def get_is_saved(self, obj):
        user = self.context.get("request").user if self.context.get("request") else None
        return bool(user and user.is_authenticated and obj.favorited_by.filter(id=user.id).exists())
