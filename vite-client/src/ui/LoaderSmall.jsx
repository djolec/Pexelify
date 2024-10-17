const LoaderSmall = () => {
  return (
    <div
      className="inline-block size-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-[var(--on-primary)]"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoaderSmall;