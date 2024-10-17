import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const useScrollRestoration = (ref) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state?.scrollY) {
      const element = ref.current;
      element.scrollTo(0, location.state.scrollY);
    }
  }, [ref]);

  const restoreScroll = (e) => {
    navigate(`${location.pathname}${location.search}`, {
      state: { scrollY: e.target.scrollTop },
      replace: true,
    });
  };

  return restoreScroll;
};

export default useScrollRestoration;
