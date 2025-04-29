interface PredictedAttributes {
  user_query: string;
  genre: string;
  artists_list: string[];
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  time_signature: number;
}

export interface PredictAttributesResponse {
  data: PredictedAttributes;
  session_id: string;
}
