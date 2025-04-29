import { useState } from "react";
import { useSaveSongsMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import { Songs } from "@/schemas/songs";

const useSaveSongs = () => {
  const [saveSongs] = useSaveSongsMutation();
  const [savedSongs, setSavedSongs] = useState<Songs[]>([]); // NEW

  const saveSong = async (song: Songs) => {
    console.log("Saving song:", song);
    try {
      await saveSongs(song).unwrap();
      toast.success("Song saved successfully");

      // Add song to savedSongs list
      setSavedSongs((prev) => [...prev, song]);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to save song");
    }
  };

  return { saveSong, savedSongs };
};

export default useSaveSongs;
