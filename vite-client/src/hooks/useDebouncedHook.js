import { useState, useEffect } from "react";

const useDebouncedCallback = (callback, delay) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    if (!debouncedValue) return;

    const handler = setTimeout(() => callback(debouncedValue), delay);

    return () => clearTimeout(handler);
  }, [debouncedValue, delay]);

  return setDebouncedValue;
};

export default useDebouncedCallback;
