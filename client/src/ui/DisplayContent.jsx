import useScrollRestoration from "../hooks/useScrollRestoration";

const DisplayContent = ({ children, scrollRef, grid = true }) => {
  const restoreScroll = useScrollRestoration(scrollRef);

  return (
    <div
      onScroll={restoreScroll}
      ref={scrollRef}
      className={` bg-[var(--background)] h-screen overflow-y-scroll grow ${
        grid ? "grid grid-rows-[auto_1fr_auto]" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default DisplayContent;
