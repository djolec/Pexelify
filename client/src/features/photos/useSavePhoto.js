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

  const { mutate: addPhoto } = useMutation({
    mutationFn: (newPhoto) => savePhoto(newPhoto),

    onMutate: (newPhoto) => {
      const previousPhotos = auth.media.photos;

      // Apply optimistic update
      const optimisticAuth = {
        ...auth,
        media: {
          ...auth.media,
          photos: [...auth.media.photos, newPhoto],
        },
      };
      setAuth(optimisticAuth);

      // Return the updated auth state for use in onSuccess
      return {
        previousPhotos,
        optimisticAuth,
      };
    },

    onSuccess: (data, newPhoto, context) => {
      setAuth({
        ...context.optimisticAuth,
        media: {
          ...context.optimisticAuth.media,
          photos: context.optimisticAuth.media.photos.map((photo) =>
            photo.id === newPhoto.id ? data.data.data : photo,
          ),
        },
        accessToken: auth.accessToken,
      });
    },

    onError: (err, _newPhoto, context) => {
      if (err.status !== 403) {
        setAuth((prev) => {
          return {
            ...prev,
            media: { ...prev.media, photos: context.previousPhotos },
          };
        });
        return toast.error(err.response.data.error);
      }
    },
  });

  return { addPhoto };
};

export default useSavePhoto;
