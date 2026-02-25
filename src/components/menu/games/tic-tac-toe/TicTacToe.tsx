import { useTicTacToe } from "./bll/useTicTacToe";
import './TicTacToe.css';

export const TicTacToe = () => {
  const { grid } = useTicTacToe();


  return (
    <>
      <div className="grid-tic">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-tic-row">
            {row.map((value, colIndex) => (
              <div
                key={colIndex}
                className="grid-tic-cell"
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