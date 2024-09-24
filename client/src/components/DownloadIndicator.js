import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const DownloadIndicator = ({ downloadPercent }) => {
  return (
    <div className="h-10 w-10 2xl:h-14 2xl:w-14">
      <CircularProgressbarWithChildren
        value={downloadPercent}
        styles={buildStyles({
          pathColor: "var(--primary)",
          trailColor: "#bcb8b6",
        })}
      >
        <span className="text-xs text-[var(--primary)]">
          {downloadPercent}%
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default DownloadIndicator;
