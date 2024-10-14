// src/App.tsx
import React, { useEffect, useState } from "react";

import "./App.scss";
import { useGrid } from "./hooks/useGrid";
import Cell from "./components/Cell";
import { GridState } from "./@types/grid.types";

const App: React.FC = () => {
  const [gridSize] = useState(50); // State for dynamic grid size

  const { gridState, handleCellClick, resetGrid, resetHighlights } = useGrid();

  useEffect(() => {
    resetGrid();
  }, [resetGrid]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      resetHighlights();
    }, 500);

    return () => clearTimeout(timeout);
  }, [gridState, resetHighlights]);

  // Maybe an alternative for design, but here we need to chose betwwen a good looking website and performance
  /* useEffect(() => {
    // Dynamically change grid size based on screen width
    const updateGridSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setGridSize(50); // Desktop
      } else if (width >= 768) {
        setGridSize(25); // Tablet
      } else {
        setGridSize(15); // Phone
      }
    };

    updateGridSize();    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []); */

  return (
    <div className="container">
      <header>
        <h1>Interactive Fibonacci Grid</h1>
        <p>
          Click any cell to increment its row and column. Find 5 consecutive
          Fibonacci numbers in a row or column!
        </p>
        {/* Reset Button */}
        <button onClick={resetGrid} className="reset-button">
          Reset Grid
        </button>
      </header>

      {/* Scrollable Grid with Dynamic Size */}
      <div
        className="scrollable-grid"
        style={{ "--grid-size": gridSize } as React.CSSProperties}
      >
        <div className="grid">
          {(gridState as GridState)
            .slice(0, gridSize)
            .map((row, rowIndex) =>
              row
                .slice(0, gridSize)
                .map((cell, colIndex) => (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    value={cell.value}
                    highlighted={cell.highlighted}
                    fibonacci={cell.fibonacci}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  />
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default App;
