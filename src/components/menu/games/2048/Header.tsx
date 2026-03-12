import { ScoreBoard } from "./ScoreBoard"
import './Header.css'

interface HeaderProps {
  currentScore: number;
  bestScore: number;
  startGame: () => void;
  language: 'ru' | 'en'
}

export const Header = ({ currentScore, bestScore, startGame, language }: HeaderProps) => {

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
          language={language}
        />
        <button
          onClick={() => {
            const confirmMessage = language === 'ru' ? "Вы уверенны?" : "Are you sure?";
            const conf: boolean = confirm(confirmMessage);
            if (conf) startGame();
          }}
        >
          {language === 'ru' ? "Новая игра" : "New Game"}
        </button>
      </div>
    </div>
  )
}