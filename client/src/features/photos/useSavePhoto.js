import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useSavePhoto = () => {
  const { auth, setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const savePhoto = (newPhoto) => {
    return serverAxios.post("media/photos", { newPhoto });
  };

  const { mutate: addPhoto, isPending } = useMutation({
    mutationFn: (newPhoto) => savePhoto(newPhoto),
    onMutate: (newPhoto) => {
      const previousPhotos = auth.media.photos;

      setAuth((prev) => {
        return {
          ...prev,
          media: {
            ...prev.media,
            photos: [...prev.media.photos, newPhoto],
          },
        };
      });

      return {
        previousPhotos,
      };
    },
    onSuccess: (data, newPhoto) => {
      setAuth((prev) => {
        return {
          ...prev,
          media: {
            ...prev.media,
            photos: prev.media.photos.map((photo) =>
              photo.id === newPhoto.id ? data.data.data : photo
            ),
          },
        };
      });
    },

    onError: (err, _newPhoto, context) => {
      setAuth((prev) => {
        return {
          ...prev,
          media: { ...prev.media, photos: context.previousPhotos },
        };
      });
      console.log("ERROR", err);
      if (err.status !== 403) return toast.error(err.response.data.error);
    },
  });

  return { addPhoto, isPending };
};

export default useSavePhoto;
