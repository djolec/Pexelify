import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useDeleteVideo = () => {
  const { auth, setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const deleteVideo = (videoId) => {
    return serverAxios.delete("media/videos", { data: { videoId } });
  };

  const { mutate: removeVideo, isPending } = useMutation({
    mutationFn: (videoId) => deleteVideo(videoId),
    onMutate: (videoId) => {
      const previousVideos = auth.media.videos;

      setAuth((prev) => {
        const newVideoArray = auth.media.videos.filter(
          (video) => video._id !== videoId
        );
        return {
          ...prev,
          media: { ...prev.media, videos: newVideoArray },
        };
      });

      return {
        previousVideos,
      };
    },
    onError: (err, _videoId, context) => {
      setAuth((prev) => {
        return {
          ...prev,
          media: { ...prev.media, videos: context.previousVideos },
        };
      });
      console.log("ERROR", err);
      if (err.status !== 403) return toast.error(err.response.data.error);
    },
  });

  return { removeVideo, isPending };
};

export default useDeleteVideo;
