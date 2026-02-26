interface StatusDisplayProps {
  turn: 'X' | '0';
  winner: string
}

export const StatusDisplay = ({ turn, winner }: StatusDisplayProps) => {

  return (
    <>
      {winner ? <div>Победил {winner}</div> : <div>Ход: {turn}</div>}
    </>
  )
}