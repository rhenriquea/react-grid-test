export interface CellData {
  value: number;
  highlighted: boolean;
  fibonacci: boolean;
  row?: number;
  col?: number;
}

export interface CellProps extends CellData {
  onClick: () => void;
}
