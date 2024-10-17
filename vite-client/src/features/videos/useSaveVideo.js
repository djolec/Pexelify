import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const useSaveVideo = () => {
  const { setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const saveVideo = (newVideo) => {
    return serverAxios.post("media/videos", { newVideo });
  };

  const { mutate: addVideo, isPending } = useMutation({
    mutationFn: (newVideo) => saveVideo(newVideo),
    onSuccess: (data) => {
      setAuth((prev) => {
        return {
          ...prev,
          media: {
            ...prev.media,
            videos: [...prev.media.videos, data.data.data],
          },
        };
      });
    },
    onError: (err) => {
      console.log("ERROR", err);
      if (err.status !== 403) return toast.error(err.response.data.error);
    },
  });

  return { addVideo, isPending };
};

export default useSaveVideo;
