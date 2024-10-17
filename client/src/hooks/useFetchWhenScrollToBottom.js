import { useEffect } from "react";

const useFetchWhenScrollToBottom = (ref, cb, isFetching) => {
  useEffect(() => {
    const element = ref.current;
    const handleScroll = () => {
      if (
        element.scrollHeight - (element.scrollTop + window.innerHeight) <= 90 &&
        !isFetching
      ) {
        cb();
      }
    };

    element.addEventListener("scroll", handleScroll);

    return () => element.removeEventListener("scroll", handleScroll);
  }, [ref, cb, isFetching]);
};

export default useFetchWhenScrollToBottom;
