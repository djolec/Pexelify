const PexelifyBanner = () => {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="flex w-fit flex-row gap-2">
        <h1 className="text-6xl font-semibold text-[var(--primary)] 2xl:text-8xl">
          Pexelify
        </h1>

        <img
          height="250"
          width="250"
          className="h-16 w-auto 2xl:h-[100px]"
          src="/assets/logos/PexelifyLogo.webp"
          alt="Pexelify logo"
        />
      </div>

      <p className="text-[var(--on-background)] text-base 2xl:text-2xl">
        Easy access to royalty-free photos and videos!
      </p>
    </div>
  );
};

export default PexelifyBanner;
