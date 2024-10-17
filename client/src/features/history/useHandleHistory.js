import { useAuth } from "../../context/AuthContext";
import useUpdateHistory from "./useUpdateHistory";

const useHandleHistory = () => {
  const { auth } = useAuth();
  const { updateHistory } = useUpdateHistory();

  const handleHistory = (value) => {
    if (value) {
      const newHistory = [
        value,
        ...auth.history.filter((item) => item !== value),
      ];
      const truncatedHistory = newHistory.slice(0, 5);

      updateHistory(truncatedHistory);
    }
  };

  return handleHistory;
};

export default useHandleHistory;
