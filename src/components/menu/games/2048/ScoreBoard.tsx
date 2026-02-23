import './ScoreBoard.css'

export const ScoreBoard = (props) => {
  const { currentScore, bestScore } = props;


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