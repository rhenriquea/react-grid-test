import React from "react";
import { CellProps } from "../@types/cell.types";
import "./Cell.scss";

const Cell: React.FC<CellProps> = ({
  value,
  highlighted,
  fibonacci,
  onClick,
}) => {
  return (
    <div
      className={`cell ${highlighted ? "highlight" : ""} ${
        fibonacci ? "fibonacci" : ""
      }`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

// React.memo to prevent re-renders if the props don't change
export default React.memo(Cell);
