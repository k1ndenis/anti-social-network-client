import type { SetStateAction } from 'react';
import './GaneOverDisplay.css'
import { useAppSelector } from '../../../../../hooks/redux';

interface GameOverDisplayProps {
  gameOver: boolean;
  gameWin: boolean;
  setGameWin: React.Dispatch<SetStateAction<boolean>>;
  startGame: () => void;
}

export const GameOverDisplay = ({ gameOver, gameWin, setGameWin, startGame }: GameOverDisplayProps) => {
  const language = useAppSelector(state => state.language);

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