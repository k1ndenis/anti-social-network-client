import { ScoreBoard } from "./ScoreBoard"
import './Header.css'

interface HeaderProps {
  currentScore: number;
  bestScore: number;
  startGame: () => void;
}

export const Header = ({ currentScore, bestScore, startGame }: HeaderProps) => {

  return (
    <div className="header-2048">
      <div>
        <span className="header-2048-text">
          2048
        </span>
      </div>
      <div className="header-right-2048">
        <ScoreBoard
          currentScore={currentScore}
          bestScore={bestScore}
        />
        <button
          onClick={startGame}
        >
          Новая игра
        </button>
      </div>
    </div>
  )
}