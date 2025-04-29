import { useDeleteSavedSongMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

interface Props {
  songId: number;
}

export default function useDeleteSavedSong({ songId }: Props) {
  const [deleteSavedSong] = useDeleteSavedSongMutation();

  const handleDelete = async () => {
    try {
      await deleteSavedSong(songId).unwrap();
      toast.success("Song deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete song");
    }
  };

  return {
    handleDelete,
  };
}
