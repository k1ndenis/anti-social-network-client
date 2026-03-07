import type { SetStateAction } from 'react';
import './GaneOverDisplay.css'

interface GameOverDisplayProps {
  gameOver: boolean;
  gameWin: boolean;
  setGameWin: React.Dispatch<SetStateAction<boolean>>;
  startGame: () => void;
  language: 'ru' | 'en'
}

export const GameOverDisplay = ({ gameOver, gameWin, setGameWin, startGame, language }: GameOverDisplayProps) => {

  return (
    <>
      {gameOver || gameWin
          ? 
            <div 
              className='game-over-2048'
            >
              <div>
                {gameOver && <>{language === 'ru' ? "Игра окончена!" : "Game Over"}</>}
                {gameWin && <>{language === 'ru' ? "Победа!" : "Victory!"}</>}
              </div>
              <div className='game-over-buttons'>
                {gameWin && <button onClick={() => setGameWin(false)}>{language === 'ru' ? "Продолжить" : "Continue"}</button>}
                <button
                  onClick={startGame}
                >
                  {language === 'ru' ? "Повторить" : "Restart"}
                </button>
              </div>
            </div>
          : null
        }
    </>
  )
}