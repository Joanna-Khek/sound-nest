import { useState, FormEvent } from "react";
import { useSongRecommenderMutation } from "@/redux/features/modelApiSlice";
import { toast } from "react-toastify";
import {
  SongRecommendationInput,
  SongRecommendationResponse,
} from "@/schemas/songs";

export default function useSongRecommender({
  adjusted_attributes,
  sessionId,
}: SongRecommendationInput) {
  const [songsRecommend, { isLoading }] = useSongRecommenderMutation();
  const [response, setResponse] = useState<SongRecommendationResponse | null>(
    null
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const responseData = await songsRecommend({
        session_id: sessionId, // Match API expected key
        updated_attributes: adjusted_attributes, // Match API expected key
      }).unwrap();
      setResponse(responseData);
      toast.success("Recommendations fetched successfully");
      console.log("Response data:", responseData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch recommendations");
    }
  };

  return {
    response,
    isLoading,
    onSubmit,
  };
}
