import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col items-center gap-8 bg-[var(--surface)] pt-[20vh]">
      <div className="absolute right-10 top-10">
        <ThemeBtn />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex w-fit flex-row gap-2">
          <h1 className="text-6xl font-semibold text-[var(--primary)] 2xl:text-6xl">
            Pexelify
          </h1>

          <img
            height="250"
            width="250"
            className="h-16 w-auto 2xl:h-[100px]"
            src="/assets/images/logos/PexelifyLogo.webp"
            alt=""
          />
        </div>

        <p className="text-[var(--on-background)]">
          Easy access to royalty free photos and videos!
        </p>
      </div>

      <div className="flex w-72 flex-col gap-4">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="w-full rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)]"
        >
          Sign in
        </button>

        <button
          onClick={() => {
            navigate("/register");
          }}
          className="w-full rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)]"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
