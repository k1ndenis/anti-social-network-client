import './ScoreBoard.css'

interface ScoreBoardProps {
  currentScore: number;
  bestScore: number;
  language: 'ru' | 'en'
}

export const ScoreBoard = ({ currentScore, bestScore, language }: ScoreBoardProps) => {

  return (
    <div className="score-board">
      <div className="score">
        <span className='score-text'>{language === 'ru' ? "Рекорд" : "Score"}</span>
        <span>{currentScore}</span>
      </div>
      <div className="score">
        <span className='score-text'>{language === 'ru' ? "Лучший" : "Best"}</span>
        <span>{bestScore}</span>
      </div>
    </div>
  )
}