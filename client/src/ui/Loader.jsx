const Loader = ({ position }) => {
  return (
    <div
      className={`flex w-full flex-row justify-center ${position} top-20  gap-4 pb-20`}
    >
      <div className="z-30 h-7 w-7 animate-jump1 rounded-full bg-[var(--on-background)]" />
      <div className="z-30 h-7 w-7 animate-jump2 rounded-full bg-[var(--on-background)]" />
      <div className="z-30 h-7 w-7 animate-jump3 rounded-full bg-[var(--on-background)]" />
    </div>
  );
};

export default Loader;
