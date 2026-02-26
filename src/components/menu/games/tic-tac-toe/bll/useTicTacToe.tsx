import { useState } from "react";

const emptyGrid: string[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

interface useTicTacToeReturn {
  grid: string[][];
  handleCellClick: (rowInd: number, colInd: number) => void;
  turn: 'X' | "0";
  winner: string;
  startGame: () => void;
  isStarted: boolean
}

export const useTicTacToe = (): useTicTacToeReturn => {
  const [grid, setGrid] = useState<string[][]>(emptyGrid);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [turn, setTurn] = useState<'X' | '0'>('X');
  const [winner, setWinner] = useState<string>('');

  const checkGameOver = (grid: string[][]) => {
    let result = '';
    const values: string[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        values.push(grid[r][c]);
      }
    }
    const checkingCoords = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    checkingCoords.map(coords => {
      const coordsValues = coords.map(i => values[i]);
      if (coordsValues.every(val => val === 'X')) result = 'X';
      if (coordsValues.every(val => val === '0')) result = '0';
    })
    return result;
  }

  const handleCellClick = (rowInd: number, colInd: number) => {
    if (!isStarted) return;
    if (grid[rowInd][colInd]) return;
    const updatedGrid = [...grid];
    updatedGrid[rowInd][colInd] = turn;
    if (turn === 'X') setTurn('0');
    if (turn === '0') setTurn('X');
    setGrid(updatedGrid);
    const winner = checkGameOver(grid);
    if (winner) {
      setWinner(winner);
      setIsStarted(false);
    }
  }

  return {
    grid,
    handleCellClick,
    turn,
    winner,
    startGame: (): void => {
      const newGrid = JSON.parse(JSON.stringify(emptyGrid)) as string[][];
      setGrid(newGrid);
      setWinner('');
      setIsStarted(true);
    },
    isStarted
  }
}