import ColorPickerBtn from "./ColorPickerBtn";
import FilterBtn from "./FilterBtn";
import { useLocation } from "react-router-dom";

const Filter = () => {
  const location = useLocation();

  const filterData = [
    {
      Orientation: ["Portrait", "Landscape", "Square"],
    },
    {
      Size: ["Small", "Medium", "Large"],
    },
  ];

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
      {filterData.map((fieldData, index) => (
        <FilterBtn key={index} fieldData={fieldData} />
      ))}
      {!location.pathname.includes("videos") && <ColorPickerBtn />}
    </div>
  );
};

export default Filter;
