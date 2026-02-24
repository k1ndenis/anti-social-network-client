import './ScoreBoard.css'

interface ScoreBoardProps {
  currentScore: number;
  bestScore: number;
}

export const ScoreBoard = ({ currentScore, bestScore }: ScoreBoardProps) => {

  return (
    <div className="score-board">
      <div className="score">
        <span className='score-text'>Рекорд</span>
        <span>{currentScore}</span>
      </div>
      <div className="score">
        <span className='score-text'>Лучший</span>
        <span>{bestScore}</span>
      </div>
    </div>
  )
}