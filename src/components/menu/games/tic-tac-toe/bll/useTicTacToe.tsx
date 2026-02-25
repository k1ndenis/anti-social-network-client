import { useState } from "react";

const emptyGrid: string[][] = [
  ["", "", ""],
  ["s", "", "s"],
  ["", "", ""],
]

interface useTicTacToeReturn {
  grid: string[][];
}


export const useTicTacToe = (): useTicTacToeReturn => {
  const [grid, setGrid] = useState<string[][]>(emptyGrid);
  const [turn, setTurn] = useState<'X' | '0'>('X');


  return {
    grid,
  }
}