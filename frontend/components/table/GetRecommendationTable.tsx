"use client";

import { useEffect, useRef } from "react";
import { useSongRecommender } from "@/hooks";
import { LoadingProgress } from "@/components/common";
import { TableList } from "@/components/common";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSaveSongs } from "@/hooks";
import { SongRecommendationInput } from "@/schemas/songs";

const columns = [
  { id: "track_name", label: "Track Name" },
  { id: "track_artist", label: "Artist" },
  { id: "track_genre", label: "Genre" },
  {
    id: "track_link",
    label: "Link",
    render: (value: string) => (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-500 underline"
      >
        Listen
      </a>
    ),
  },
  {
    id: "add_songs",
    label: "Add to Dashboard",
    render: (
      _: string,
      row: any,
      { saveSong, savedSongs }: { saveSong: any; savedSongs: any[] }
    ) => {
      const isAlreadySaved = savedSongs.some(
        (saved: any) => saved.track_link === row.track_link
      );

      return (
        <button
          onClick={() =>
            saveSong({
              track_name: row.track_name,
              track_artist: row.track_artist,
              track_genre: row.track_genre,
              track_link: row.track_link,
              track_rating: row.track_rating,
            })
          }
          className={`p-2 cursor-pointer ${
            isAlreadySaved
              ? "text-gray-300 cursor-not-allowed" // Grey if already saved
              : "text-indigo-800 hover:text-indigo-900"
          }`}
          title="Add to Dashboard"
          disabled={isAlreadySaved}
        >
          <IoMdAddCircleOutline className="w-5 h-5" />
        </button>
      );
    },
  },
];

export default function GetRecommendationsTable({
  adjusted_attributes,
  sessionId,
}: SongRecommendationInput) {
  const { response, isLoading, onSubmit } = useSongRecommender({
    adjusted_attributes,
    sessionId,
  });

  const { saveSong, savedSongs } = useSaveSongs();

  const hasFetched = useRef(false); // Track if API call has been made

  // Auto-fetch recommendations only once on mount
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      const event = new Event(
        "submit"
      ) as unknown as React.FormEvent<HTMLFormElement>;
      onSubmit(event);
    }
  }, []); // Empty dependency array to run only once

  return (
    <div>
      {isLoading && <LoadingProgress />}

      {!isLoading && response && (
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Song Recommendations
        </h3>
      )}

      {response && (
        <div>
          <TableList
            columns={columns}
            data={response.similar_songs}
            extraProps={{ saveSong, savedSongs }} // Pass saveSong and isSaving as object
          />
        </div>
      )}
    </div>
  );
}
