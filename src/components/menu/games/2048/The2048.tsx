import './The2048.css'
import { use2048 } from './bll/use2048'
import { CELLS_STYLES } from './constants/gameStyles'
import { Header } from './Header'

export const The2048 = () => {
  const { grid, startGame, currentScore, bestScore } = use2048()

  return (
    <div className='game-2048-container'>
      <Header
        startGame={startGame}
        currentScore={currentScore}
        bestScore={bestScore}
      />
      <div className="grid-container">
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