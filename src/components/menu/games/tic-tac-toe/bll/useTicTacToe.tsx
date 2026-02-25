import { useState } from "react";

const emptyGrid: string[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

interface useTicTacToeReturn {
  grid: string[][];
  handleCellClick: (rowInd: number, colInd: number) => void
}

export const useTicTacToe = (): useTicTacToeReturn => {
  const [grid, setGrid] = useState<string[][]>(emptyGrid);
  const [turn, setTurn] = useState<'X' | '0'>('X');

  const handleCellClick = (rowInd: number, colInd: number) => {
    if (grid[rowInd][colInd]) return;
    const updatedGrid = [...grid];
    updatedGrid[rowInd][colInd] = turn;
    if (turn === 'X') setTurn('0');
    if (turn === '0') setTurn('X');
    setGrid(updatedGrid)
  }

  return {
    grid,
    handleCellClick
  }
}