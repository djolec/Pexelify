import React from "react";
import NavBar from "./NavBar";

const MobNavigation = () => {
  return (
    <nav className="absolute top-0 left-0 w-2/3">
      <div>
        <button onClick={() => setPageSelected("Homepage")}>
          <h1 className="text-[var(--primary)] text-4xl font-semibold">
            Pexelify
          </h1>
        </button>
      </div>
      <NavBar />
    </nav>
  );
};

export default MobNavigation;
