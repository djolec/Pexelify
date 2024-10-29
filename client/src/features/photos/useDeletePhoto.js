import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useDeletePhoto = () => {
  const { auth, setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const deletePhoto = (photoId) => {
    return serverAxios.delete("media/photos", { data: { photoId } });
  };

  const { mutate: removePhoto } = useMutation({
    mutationFn: (photoId) => deletePhoto(photoId),

    onMutate: (photoId) => {
      const previousPhotos = auth.media.photos;

      // Apply optimistic update
      const optimisticAuth = {
        ...auth,
        media: {
          ...auth.media,
          photos: auth.media.photos.filter((photo) => photo._id !== photoId),
        },
      };
      setAuth(optimisticAuth);

      return {
        previousPhotos,
        optimisticAuth,
      };
    },

    onSuccess: (_data, _photo, context) => {
      setAuth({ ...context.optimisticAuth, accessToken: auth.accessToken });
    },

    onError: (err, _photoId, context) => {
      setAuth((prev) => {
        return {
          ...prev,
          media: { ...prev.media, photos: context.previousPhotos },
        };
      });
      if (err.status !== 403) return toast.error(err.response.data.error);
    },
  });

  return { removePhoto };
};

export default useDeletePhoto;
