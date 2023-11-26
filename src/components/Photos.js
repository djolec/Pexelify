import React from "react";

import { Outlet } from "react-router-dom";

const Photos = () => {
  return (
    <div className="flex-grow flex flex-col">
      <Outlet />
    </div>
  );
};

export default Photos;
