import { useMutation } from "@tanstack/react-query";
import useServerAxios from "../authentication/useServerAxios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useUpdateHistory = () => {
  const { setAuth } = useAuth();
  const serverAxios = useServerAxios();

  const patchHistory = (history) => {
    return serverAxios.put("history", { history });
  };

  const { mutate: updateHistory } = useMutation({
    mutationFn: (history) => patchHistory(history),
    onSuccess: (data) => {
      setAuth((prev) => {
        return { ...prev, history: [...data.data.history] };
      });
    },
    onError: (err) => {
      // console.log("ERROR", err);
      if (err.status !== 403) return toast.error(err.response.data.error);
    },
  });

  return { updateHistory };
};

export default useUpdateHistory;
