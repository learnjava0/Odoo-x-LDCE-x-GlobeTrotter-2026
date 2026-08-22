from rest_framework import serializers

from .models import Destination


class DestinationSerializer(serializers.ModelSerializer):
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = "__all__"

    def get_is_saved(self, obj):
        user = self.context.get("request").user if self.context.get("request") else None
        return bool(user and user.is_authenticated and obj.favorited_by.filter(id=user.id).exists())
