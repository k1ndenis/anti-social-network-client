import { useTicTacToe } from "./bll/useTicTacToe";
import { StatusDisplay } from "./StatusDisplay";
import './TicTacToe.css';

interface TicTacToeProps {
  language: 'ru' | 'en'
}

export const TicTacToe = ({ language }: TicTacToeProps) => {
  const { grid, handleCellClick, isStarted, turn, winner, startGame, isDraw } = useTicTacToe();

  return (
    <>
      <div className="tic-header">
        <button className="tic-new-game-button" onClick={startGame}>{language === 'ru' ? "Новая игра" : "New Game"}</button>
        <StatusDisplay
          isStarted={isStarted}
          turn={turn}
          winner={winner}
          isDraw={isDraw}
          language={language}
        />
      </div>
      <div className="grid-tic">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-tic-row">
            {row.map((value, colIndex) => (
              <div
                key={colIndex}
                className="grid-tic-cell"
                onClick={() => handleCellClick(rowIndex, colIndex)}
                data-text={value}
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