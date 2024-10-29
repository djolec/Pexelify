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

  const { mutate: addVideo } = useMutation({
    mutationFn: (newVideo) => saveVideo(newVideo),
    onMutate: (newVideo) => {
      const previousVideos = auth.media.videos;

      // Apply optimistic update
      const optimisticAuth = {
        ...auth,
        media: {
          ...auth.media,
          videos: [...auth.media.videos, newVideo],
        },
      };
      setAuth(optimisticAuth);

      // Return the updated auth state for use in onSuccess
      return {
        previousVideos,
        optimisticAuth,
      };
    },

    onSuccess: (data, newVideo, context) => {
      setAuth({
        ...context.optimisticAuth,
        media: {
          ...context.optimisticAuth.media,
          videos: context.optimisticAuth.media.videos.map((video) =>
            video.id === newVideo.id ? data.data.data : video
          ),
        },
        accessToken: auth.accessToken,
      });
    },

    onError: (err, _newVideo, context) => {
      if (err.status !== 403) {
        setAuth((prev) => {
          return {
            ...prev,
            media: { ...prev.media, videos: context.previousVideos },
          };
        });
        return toast.error(err.response.data.error);
      }
    },
  });

  return { addVideo };
};

export default useSaveVideo;
