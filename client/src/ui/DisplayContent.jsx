import useScrollRestoration from "../hooks/useScrollRestoration";

const DisplayContent = ({ children, scrollRef, grid = true }) => {
  const restoreScroll = useScrollRestoration(scrollRef);

  return (
    <div
      onScroll={restoreScroll}
      ref={scrollRef}
      className={`h-screen grow overflow-y-scroll bg-[var(--background)] ${
        grid ? "grid grid-rows-[auto_1fr_auto]" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default DisplayContent;
