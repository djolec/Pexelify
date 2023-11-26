import React from "react";
import { useNavigate } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { useContext } from "react";
import { AppContext } from "../App";

const BackBtn = () => {
  const navigate = useNavigate();
  const { pageSelected } = useContext(AppContext);

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex flex-row items-center gap-2 justify-self-start ${
        pageSelected === "Details" ? "flex" : "hidden"
      }`}
    >
      <ImArrowLeft2 className="h-6 w-auto text-[var(--on-background)]" />
      <h1 className="text-[var(--primary)] text-2xl font-semibold">Pexelify</h1>
    </button>
  );
};

export default BackBtn;
