import React from "react";
import OrientationBtn from "./OrientationBtn";
import SizeBtn from "./SizeBtn";
import ColorPickerBtn from "./ColorPickerBtn";

const Filter = () => {
  return (
    <div className="flex flex-row flex-wrap gap-1 items-start">
      <OrientationBtn />
      <SizeBtn />
      <ColorPickerBtn />
    </div>
  );
};

export default Filter;
