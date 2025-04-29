from django.db import models
from users.models import UserAccount

# Create your models here.

class SavedSong(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='saved_songs')
    id = models.AutoField(primary_key=True)
    track_name = models.CharField(max_length=255)
    track_artist = models.CharField(max_length=255)
    track_genre = models.CharField(max_length=255)
    track_link = models.URLField(blank=True)
    track_rating = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ["user", "track_name", "track_artist"]  # Prevent duplicate songs per user
        
    def __str__(self):
        return f"{self.track_name} by {self.track_artist} saved by {self.user.email}"
