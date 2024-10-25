const LoaderSmall = () => {
  return (
    <div
      className="h-5 w-5 border-[3px] rounded-full animate-spin border-t-transparent mx-auto border-current text-[var(--on-primary)]"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoaderSmall;
