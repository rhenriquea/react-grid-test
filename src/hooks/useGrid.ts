import { useReducer, useCallback } from "react";
import { GridAction, GridState } from "../@types/grid.types";
import { CellData } from "../@types/cell.types";

const gridSize = 50;

const initialGridState = (size: number = gridSize): GridState => {
  const initialCells: CellData[][] = [];
  for (let i = 0; i < size; i++) {
    initialCells[i] = [];
    for (let j = 0; j < size; j++) {
      initialCells[i][j] = {
        value: 0,
        row: i,
        col: j,
        highlighted: false,
        fibonacci: false,
      };
    }
  }
  return initialCells;
};

const gridReducer = (state: GridState, action: GridAction): GridState => {
  switch (action.type) {
    case "INCREMENT_CELL": {
      const { row, col } = action;
      const newState = state.map((rowCells) =>
        rowCells.map((cell) => ({ ...cell }))
      );

      for (let i = 0; i < gridSize; i++) {
        if (i !== col) newState[row][i] = incrementCell(newState[row][i]);
        if (i !== row) newState[i][col] = incrementCell(newState[i][col]);
      }

      newState[row][col] = incrementCell(newState[row][col]);

      // Check for Fibonacci sequences after the update
      return checkForFibonacci(newState);
    }

    case "RESET_HIGHLIGHTS": {
      return state.map((rowCells) =>
        rowCells.map((cell) => ({
          ...cell,
          highlighted: false,
          fibonacci: false,
        }))
      );
    }

    case "RESET_GRID": {
      return initialGridState();
    }

    default:
      return state;
  }
};

const incrementCell = (cell: CellData) => {
  const newValue = cell.value + 1;
  return { ...cell, value: newValue, highlighted: true };
};

// Check for Fibonacci sequences in rows and columns
const checkForFibonacci = (newCells: CellData[][]): CellData[][] => {
  // Check rows and columns for Fibonacci sequence
  for (let i = 0; i < newCells.length; i++) {
    // Check for Fibonacci sequences in rows
    newCells = checkFibonacciInArray(newCells[i], newCells);
    // Check for Fibonacci sequences in columns
    newCells = checkFibonacciInArray(
      newCells.map((row) => row[i]),
      newCells
    );
  }

  return newCells;
};

const getFibonacciSequence = (limit: number): number[] => {
  const sequence: number[] = [];
  let a = 1,
    b = 0,
    temp;

  while (b <= limit) {
    sequence.push(b); // Add the current Fibonacci number to the array
    temp = a;
    a = a + b;
    b = temp;
  }

  return sequence;
};

// This could have better for performance, because this code is recalculating the slice repeatedly
// maybe a slide through the array window would be better. Then I probably could do only a shallow clone of
// the array, only mutating what is necessary to change, but since I'm using React.Memo this may be an overkill
const checkFibonacciInArray = (
  arr: CellData[],
  newCells: CellData[][]
): CellData[][] => {
  const fibSequence = getFibonacciSequence(34); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
  const values = arr.map((cell) => cell.value);

  // Loop over the array and check for any sequence that matches 5 consecutive Fibonacci numbers
  for (let i = 0; i <= values.length - 5; i++) {
    const slice = values.slice(i, i + 5);
    if (isFibonacciSlice(slice, fibSequence)) {
      for (let j = 0; j < 5; j++) {
        const cell = arr[i + j];
        const { row, col } = cell;

        if (typeof row === "number" && typeof col === "number") {
          newCells[row][col].fibonacci = true; // Mark the Fibonacci sequence
          newCells[row][col].value = 0; // Reset the value to 0
        }
      }
    }
  }

  return newCells;
};

const isFibonacciSlice = (slice: number[], fibSequence: number[]) => {
  for (let i = 0; i <= fibSequence.length - 5; i++) {
    if (slice.join() === fibSequence.slice(i, i + 5).join()) {
      return true;
    }
  }
  return false;
};

export const useGrid = () => {
  const [gridState, dispatch] = useReducer(gridReducer, initialGridState());

  const handleCellClick = useCallback((row: number, col: number) => {
    dispatch({ type: "INCREMENT_CELL", row, col });
  }, []);

  const resetGrid = useCallback(() => {
    dispatch({ type: "RESET_GRID" });
  }, []);

  const resetHighlights = useCallback(() => {
    dispatch({ type: "RESET_HIGHLIGHTS" });
  }, []);

  return {
    gridState,
    handleCellClick,
    resetGrid,
    resetHighlights,
  };
};
