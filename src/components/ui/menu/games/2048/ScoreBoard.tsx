import { useAppSelector } from '../../../../../hooks/redux';
import './ScoreBoard.css'

interface ScoreBoardProps {
  currentScore: number;
  bestScore: number;
}

export const ScoreBoard = ({ currentScore, bestScore }: ScoreBoardProps) => {
  const language = useAppSelector(state => state.language);

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