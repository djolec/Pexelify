import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useDeletePhoto = () => {
  const { setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const deletePhoto = (photoId) => {
    return serverAxios.delete("media/photos", { data: { photoId } });
  };

  const { mutate: removePhoto, isPending } = useMutation({
    mutationFn: (photoId) => deletePhoto(photoId),
    onSuccess: (data) => {
      setAuth((prev) => {
        const newPhotoArray = prev.media.photos.filter(
          (photo) => photo._id !== data.data.data
        );

        return {
          ...prev,
          media: { ...prev.media, photos: newPhotoArray },
        };
      });
    },
    onError: (err) => {
      console.log("ERROR", err);
      if (err.status !== 403) return toast.error(err.response.data.error);
    },
  });

  return { removePhoto, isPending };
};

export default useDeletePhoto;
