from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SavedSong
from .serializers import SavedSongSerializer


# Create your views here.
class SavedSongView(APIView):
    def get(self, request, *args, **kwargs):
        songs = SavedSong.objects.filter(user=request.user)
        serializer = SavedSongSerializer(songs, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SavedSongSerializer(
            data=request.data, context={"request": request}
        )

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(
                    {"message": "Song saved successfully"},
                    status=status.HTTP_201_CREATED,
                )
            except Exception as e:
                error_message = str(e)
                if "UNIQUE" in error_message:  # Check if UNIQUE constraint error
                    return Response(
                        {"message": "You have already added this song."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                return Response(
                    {"message": f"Failed to save song: {error_message}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SavedSongDetailView(APIView):
    def patch(self, request, song_id, *args, **kwargs):
        try:
            song = SavedSong.objects.get(id=song_id, user=request.user)
        except SavedSong.DoesNotExist:
            return Response(
                {
                    "message": "Song not found or you're not authorized to update this song."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # Update
        track_rating = request.data.get("track_rating")
        if track_rating is not None:
            song.track_rating = track_rating
            song.save()
            return Response(
                {
                    "message": "Track rating updated successfully",
                    "track_rating": song.track_rating,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": "Invalid track rating."}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, song_id, *args, **kwargs):
        try:
            song = SavedSong.objects.get(id=song_id, user=request.user)
            song.delete()
            return Response(
                {"message": "Song deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except SavedSong.DoesNotExist:
            return Response(
                {
                    "message": "Song not found or you're not authorized to delete this song."
                },
                status=status.HTTP_404_NOT_FOUND,
            )
