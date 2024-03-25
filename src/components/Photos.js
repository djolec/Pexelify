import React from "react";

import { Outlet } from "react-router-dom";

const Photos = () => {
  return (
    <div className="flex flex-grow flex-col">
      <Outlet />
    </div>
  );
};

export default Photos;
