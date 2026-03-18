import { useAppSelector } from '../../../../hooks/redux';
import './StatusDisplay.css'

interface StatusDisplayProps {
  isStarted: boolean;
  turn: 'X' | '0';
  winner: string;
  isDraw: boolean;
}

export const StatusDisplay = ({ isStarted, turn, winner, isDraw }: StatusDisplayProps) => {
  const language = useAppSelector(state => state.language);

  return (
    <div className="tic-status-display">
      {winner && <div>{language === 'ru' ? "Победил" : "Winner:"} {winner}</div>}
      {isDraw && <div>{language === 'ru' ? "Ничья" : "Draw:"} </div>}
      {isStarted && <div>{language === 'ru' ? "Ход:" : "Turn: "} {turn}</div>}
    </div>
  )
}