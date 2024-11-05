import PexelifyBanner from "../ui/PexelifyBanner";
import ThemeBtn from "../ui/ThemeBtn";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/svg/arrow-left.svg?react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-[var(--surface)] pt-[20vh]">
      <div className="absolute sm:right-10 sm:top-10 right-4 top-4">
        <ThemeBtn />
      </div>

      <PexelifyBanner />

      <div>
        <h1 className="text-[var(--on-background)] text-4xl mb-8">
          Page Not Found
        </h1>

        <button
          className="rounded-full bg-[var(--primary)] px-4 text-[var(--on-primary)] h-8 2xl:h-12 2xl:text-2xl text-base flex items-center gap-1 w-fit"
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
