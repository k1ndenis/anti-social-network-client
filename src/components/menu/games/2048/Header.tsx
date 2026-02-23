import { ScoreBoard } from "./ScoreBoard"
import { StartGameBtn } from "./StartGameBtn";
import './Header.css'

export const Header = (props) => {
  const { currentScore, bestScore, startGame } = props;

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
        <StartGameBtn
          startGame={startGame}
        />
      </div>
    </div>
  )
}