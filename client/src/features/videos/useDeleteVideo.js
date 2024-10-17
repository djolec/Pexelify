import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useDeleteVideo = () => {
  const { setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const deleteVideo = (videoId) => {
    return serverAxios.delete("media/videos", { data: { videoId } });
  };

  const { mutate: removeVideo, isPending } = useMutation({
    mutationFn: (videoId) => deleteVideo(videoId),
    onSuccess: (data) => {
      setAuth((prev) => {
        const newPhotoArray = prev.media.videos.filter(
          (video) => video._id !== data.data.data
        );

        return {
          ...prev,
          media: { ...prev.media, videos: newPhotoArray },
        };
      });
    },
    onError: (err) => {
      console.log("ERROR", err);
      if (err.status !== 403) return toast.error(err.response.data.error);
    },
  });

  return { removeVideo, isPending };
};

export default useDeleteVideo;
