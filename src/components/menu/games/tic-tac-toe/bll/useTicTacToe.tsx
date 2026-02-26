import { useState } from "react";

const emptyGrid: string[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

interface useTicTacToeReturn {
  grid: string[][];
  handleCellClick: (rowInd: number, colInd: number) => void;
  isStarted: boolean;
  turn: 'X' | "0";
  winner: string;
  startGame: () => void;
  isDraw: boolean
}

export const useTicTacToe = (): useTicTacToeReturn => {
  const [grid, setGrid] = useState<string[][]>(emptyGrid);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [turn, setTurn] = useState<'X' | '0'>('X');
  const [winner, setWinner] = useState<string>('');
  const [isDraw, setIsDraw] = useState<boolean>(false);

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
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    checkingCoords.map(coords => {
      const coordsValues = coords.map(i => values[i]);
      if (coordsValues.every(val => val === 'X')) result = 'X';
      if (coordsValues.every(val => val === '0')) result = '0';
    })
    if (result) {
      return result;
    } else {
      if (values.every(val => val !== '')) {
        setIsDraw(true);
      }
    }
  }

  const handleCellClick = (rowInd: number, colInd: number) => {
    if (!isStarted) return;
    if (grid[rowInd][colInd]) return;
    const updatedGrid = grid.map(row => [...row]);
    updatedGrid[rowInd][colInd] = turn;
    if (!winner) {
      if (turn === 'X') setTurn('0');
      if (turn === '0') setTurn('X');
    }
    setGrid(updatedGrid);
    const currentWinner = checkGameOver(updatedGrid);
    if (currentWinner) {
      setWinner(currentWinner);
      setIsStarted(false);
    }
  }

  return {
    grid,
    handleCellClick,
    isStarted,
    turn,
    winner,
    isDraw,
    startGame: (): void => {
      const newGrid = JSON.parse(JSON.stringify(emptyGrid)) as string[][];
      setGrid(newGrid);
      setWinner('');
      setIsDraw(false);
      setIsStarted(true);
    }
  }
}