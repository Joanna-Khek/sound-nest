"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/common";
import { StarRating, TableList } from "@/components/common";
import { useUpdateTrackRatings, useDeleteSavedSong } from "@/hooks";
import {
  useSongsQuery,
  useRetrieveUserQuery,
} from "@/redux/features/authApiSlice";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const {
    data: user,
    isLoading: userLoading,
    isFetching: userFetching,
    refetch: refetchUser,
  } = useRetrieveUserQuery();

  const {
    data: songs,
    isLoading: songsLoading,
    isFetching: songsFetching,
    refetch: refetchSongs,
  } = useSongsQuery();

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
      id: "track_rating",
      label: "Rating",
      render: (_value: string, row: any) => {
        const { rating, updateTrackRating } = useUpdateTrackRatings({
          songId: row.id,
          initialRating: row.track_rating,
        });

        return (
          <div>
            <StarRating
              maxStars={5}
              value={rating} // Use the rating from the hook
              onChange={(newValue) => updateTrackRating(newValue)} // Pass the updated rating
            />
          </div>
        );
      },
    },
    {
      id: "delete",
      label: "Delete",
      render: (_value: string, row: any) => {
        const { handleDelete } = useDeleteSavedSong({ songId: row.id });

        return (
          <button
            onClick={async () => {
              await handleDelete();
              await refetchSongs(); // After deleting, refetch the songs
            }}
            title="Delete Songs"
            className="cursor-pointer"
          >
            <MdDelete className="w-5 h-5 text-red-500" />
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    // Force refetch the user data when the component mounts
    refetchUser();
    refetchSongs();
  }, [refetchUser, refetchSongs]);

  if (userLoading || userFetching || songsLoading || songsFetching) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  return (
    <>
      <header className="bg-white-shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-light text-gray-900">
            {user?.first_name ? `${user.first_name}'s Dashboard` : "Dashboard"}
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8">
        {(songs ?? []).length === 0 ? (
          <div>
            <p className="text-center text-gray-500 my-3">
              You currently don't have any songs saved to your dashboard.{" "}
            </p>
            <div className="text-center">
              <a href="/explore-songs" className="text-indigo-500 underline">
                {"Explore Songs"}
              </a>
            </div>
          </div>
        ) : (
          <TableList columns={columns} data={songs || []} />
        )}
      </main>
    </>
  );
}
