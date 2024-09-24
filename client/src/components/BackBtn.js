import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftIcon } from "../svg/arrow-left.svg";

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      aria-label="go back"
      onClick={() => navigate(-1)}
      className="flex flex-row items-center gap-1 justify-self-start"
    >
      <LeftIcon className="h-8 w-auto fill-[var(--on-background)] 2xl:h-12" />
      <h1 className="text-3xl font-semibold text-[var(--primary)] 2xl:text-6xl">
        Pexelify
      </h1>
    </button>
  );
};

export default BackBtn;
