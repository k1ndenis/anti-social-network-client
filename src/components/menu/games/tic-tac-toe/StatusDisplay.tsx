interface StatusDisplayProps {
  turn: 'X' | '0'
}

export const StatusDisplay = ({ turn }: StatusDisplayProps) => {

  return (
    <>
      <div>Ход: {turn}</div>
    </>
  )
}