import { useState, useEffect } from "react";
import { useSaveTrackRatingMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

interface Props {
  songId: number;
  initialRating: number;
}

export default function useUpdateTrackRatings({
  songId,
  initialRating,
}: Props) {
  const [saveTrackRating] = useSaveTrackRatingMutation();
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating); // Ensure the rating is updated if it changes from the backend
  }, [initialRating]);

  const updateTrackRating = async (newRating: number) => {
    setRating(newRating);

    try {
      await saveTrackRating({
        song_id: songId,
        track_rating: newRating,
      }).unwrap();
    } catch (error: any) {
      toast.error("Failed to update rating");
    }
  };

  return {
    rating,
    updateTrackRating,
  };
}
