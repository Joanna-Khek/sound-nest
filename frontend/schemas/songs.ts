export interface SongRecommendationInput {
  adjusted_attributes: {
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
  };
  sessionId: string;
}

export interface Songs {
  track_name: string;
  track_artist: string;
  track_genre: string;
  track_link: string;
  track_rating: number;
}

interface SongRecommendation {
  track_name: string;
  track_artist: string;
  track_genre: string;
  track_link: string;
  score: number;
}

export interface SongRecommendationResponse {
  similar_songs: SongRecommendation[];
  attributes: Record<string, number | string>;
}
