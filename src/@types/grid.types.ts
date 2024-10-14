import { CellData } from "./cell.types";

export type GridState = CellData[][];

export type GridAction =
  | { type: "INCREMENT_CELL"; row: number; col: number }
  | { type: "RESET_HIGHLIGHTS" }
  | { type: "RESET_GRID" };
