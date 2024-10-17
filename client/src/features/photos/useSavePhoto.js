import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useSavePhoto = () => {
  const { setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const savePhoto = (newPhoto) => {
    return serverAxios.post("media/photos", { newPhoto });
  };

  const { mutate: addPhoto, isPending } = useMutation({
    mutationFn: (newPhoto) => savePhoto(newPhoto),
    onSuccess: (data) => {
      setAuth((prev) => {
        return {
          ...prev,
          media: {
            ...prev.media,
            photos: [...prev.media.photos, data.data.data],
          },
        };
      });
    },
    onError: (err) => {
      console.log("ERROR", err);
      if (err.status !== 403) return toast.error(err.response.data.error);
    },
  });

  return { addPhoto, isPending };
};

export default useSavePhoto;
