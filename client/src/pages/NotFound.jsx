import PexelifyBanner from "../ui/PexelifyBanner";
import ThemeBtn from "../ui/ThemeBtn";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/svg/arrow-left.svg?react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-[var(--surface)] pt-[20vh]">
      <div className="absolute right-4 top-4 sm:right-10 sm:top-10">
        <ThemeBtn />
      </div>

      <PexelifyBanner />

      <div>
        <h1 className="mb-8 text-4xl text-[var(--on-background)]">
          Page Not Found
        </h1>

        <button
          className="flex h-8 w-fit items-center gap-1 rounded-full bg-[var(--primary)] px-4 text-base text-[var(--on-primary)] 2xl:h-12 2xl:text-2xl"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-auto fill-[var(--on-primary)]" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
