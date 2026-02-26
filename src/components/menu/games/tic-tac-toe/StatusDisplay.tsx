interface StatusDisplayProps {
  isStarted: boolean;
  turn: 'X' | '0';
  winner: string;
  isDraw: boolean
}

export const StatusDisplay = ({ isStarted, turn, winner, isDraw }: StatusDisplayProps) => {

  return (
    <>
      {winner && <div>Победил {winner}</div>}
      {isDraw && <div>Ничья</div>}
      {isStarted && <div>Ход: {turn}</div>}
    </>
  )
}