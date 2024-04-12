import React from "react";
import OrientationBtn from "./OrientationBtn";
import SizeBtn from "./SizeBtn";
import ColorPicker from "./ColorPicker";
import { useLocation } from "react-router-dom";

const Filter = ({ searchObj, setSearchObj }) => {
  const location = useLocation();

  return (
    <div className="flex flex-row gap-1">
      <OrientationBtn searchObj={searchObj} setSearchObj={setSearchObj} />
      <SizeBtn searchObj={searchObj} setSearchObj={setSearchObj} />
      {!location.pathname.includes("videos") && (
        <ColorPicker searchObj={searchObj} setSearchObj={setSearchObj} />
      )}
    </div>
  );
};

export default Filter;
