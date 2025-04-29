from rest_framework import serializers
from .models import SavedSong

class SavedSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedSong
        fields = ["id", "track_name", "track_artist", "track_genre", "track_link", "track_rating"]
        read_only_fields = ["user"] # User is set automatically
        
    def create(self, validated_data):
        # Automatically set the user from the request
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
    