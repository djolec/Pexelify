export const closeButton = (ref, setState) => {
  return (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setState(false);
    }
  };
};
