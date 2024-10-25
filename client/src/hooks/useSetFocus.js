import { useEffect } from "react";

const useSetFocus = (ref) => {
  useEffect(() => {
    ref.current.focus();
  }, [ref]);
};

export default useSetFocus;
