import './The2048.css'
import { use2048 } from './bll/use2048'
import { CELLS_STYLES } from './constants/gameStyles'
import { Header } from './Header'

export const The2048 = () => {
  const { grid, startGame, currentScore, bestScore, gameOver } = use2048()

  return (
    <div className='game-2048-container'>
      <Header
        startGame={startGame}
        currentScore={currentScore}
        bestScore={bestScore}
      />
      {gameOver
        ? 
          <div className='game-over-2048'>
            <div>Игра окончена!</div>
            <button
              onClick={startGame}
            >
              Повторить
            </button>
          </div>
        : null
      }
      <div 
        className="grid-container"
        style={gameOver ? {opacity: 0.5} : null}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className='grid-row'>
            {row.map((value, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} className='grid-cell'
                style={CELLS_STYLES[value] || { background: "#3c3a32", color: "#f9f6f2" }}  
              >
                {value !== 0 ? value : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}