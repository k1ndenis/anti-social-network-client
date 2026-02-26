import { useTicTacToe } from "./bll/useTicTacToe";
import { StatusDisplay } from "./StatusDisplay";
import './TicTacToe.css';

export const TicTacToe = () => {
  const { grid, handleCellClick, turn, winner, startGame, isStarted } = useTicTacToe();

  return (
    <>
      <button onClick={startGame}>Новая игра</button>
      <StatusDisplay
        turn={turn}
        winner={winner}
      />
      <div className="grid-tic">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-tic-row">
            {row.map((value, colIndex) => (
              <div
                key={colIndex}
                className="grid-tic-cell"
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}