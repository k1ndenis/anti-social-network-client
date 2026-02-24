import type { SetStateAction } from 'react';
import './GaneOverDisplay.css'

interface GameOverDisplayProps {
  gameOver: boolean;
  gameWin: boolean;
  setGameWin: React.Dispatch<SetStateAction<boolean>>;
  startGame: () => void;
}

export const GameOverDisplay = ({ gameOver, gameWin, setGameWin, startGame }: GameOverDisplayProps) => {

  return (
    <>
      {gameOver || gameWin
          ? 
            <div 
              className='game-over-2048'
            >
              <div>
                {gameOver && "Игра окончена!"}
                {gameWin && "Победа!"}
              </div>
              <div className='game-over-buttons'>
                {gameWin && <button onClick={() => setGameWin(false)}>Продолжить</button>}
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