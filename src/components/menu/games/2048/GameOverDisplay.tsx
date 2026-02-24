import './GaneOverDisplay.css'

export const GameOverDisplay = (props) => {
  const { gameOver, gameWin, setGameWin, startGame } = props;

  return (
    <>
      {gameOver || gameWin
          ? 
            <div 
              className='game-over-2048'
            >
              <div>
                {gameOver ? "Игра окончена!" : null}
                {gameWin ? "Победа!" : null}
              </div>
              <div className='game-over-buttons'>
                {gameWin ? <button onClick={() => setGameWin(false)}>Продолжить</button> : null}
                <button
                  onClick={startGame}
                >
                  Повторить
                </button>
              </div>
            </div>
          : null
        }
    </>
  )
}