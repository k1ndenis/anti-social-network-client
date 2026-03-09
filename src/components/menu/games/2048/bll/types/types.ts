export interface Use2048Return {
  grid: number[][];
  startGame: () => void;
  currentScore: number;
  bestScore: number;
  gameOver: boolean;
  gameWin: boolean;
  setGameWin: React.Dispatch<React.SetStateAction<boolean>>;
}