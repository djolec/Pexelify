import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const useSaveVideo = () => {
  const { auth, setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const saveVideo = (newVideo) => {
    return serverAxios.post("media/videos", { newVideo });
  };

  const { mutate: addVideo, isPending } = useMutation({
    mutationFn: (newVideo) => saveVideo(newVideo),
    onMutate: (newVideo) => {
      const previousVideos = auth.media.videos;

      setAuth((prev) => {
        return {
          ...prev,
          media: {
            ...prev.media,
            videos: [...prev.media.videos, newVideo],
          },
        };
      });

      return {
        previousVideos,
      };
    },
    onSuccess: (data, newVideo) => {
      setAuth((prev) => {
        return {
          ...prev,
          media: {
            ...prev.media,
            videos: prev.media.videos.map((video) =>
              video.id === newVideo.id ? data.data.data : video
            ),
          },
        };
      });
    },
    onError: (err, _newVideo, context) => {
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

  return { addVideo, isPending };
};

export default useSaveVideo;
