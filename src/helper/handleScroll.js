export const handleScroll = (callback) => {
  const bottom =
    Math.ceil(window.innerHeight + window.scrollY) >=
    document.documentElement.scrollHeight - 50;

  if (bottom) {
    callback();
  }
};
