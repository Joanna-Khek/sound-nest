from django.urls import path
from .views import SavedSongView, SavedSongDetailView

urlpatterns = [
    path('saved-songs/', SavedSongView.as_view()),
    path('saved-songs/<int:song_id>/', SavedSongDetailView.as_view()),
]