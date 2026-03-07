import { useState } from "react";
import './MyGames.css';
import { Crossword } from "./crossword/Crossword";
import { The2048 } from "./2048/The2048";
import { TicTacToe } from "./tic-tac-toe/TicTacToe";

interface MyGamesProps {
  language: 'ru' | 'en'
}

export const MyGames = ({ language }: MyGamesProps) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <>
      <button
        onClick={() => setActiveGame("Crossword")}
      >
        {language === 'ru' ? "Кроссворд" : "Crossword"}
      </button>
      <button
        onClick={() => setActiveGame("2048")}
      >
        2048
      </button>
      <button
        onClick={() => setActiveGame("tictactoe")}
      >
        {language === 'ru' ? "Крестики-нолики" : "Tic-Tac-Toe"}
      </button>
      <div className="game-container">
        {activeGame === "Crossword" && <Crossword />}
        {activeGame === "2048" && <The2048 language={language} />}
        {activeGame === "tictactoe" && <TicTacToe language={language} />}
        {activeGame && (
          <button 
            onClick={() => setActiveGame(null)}
            className="exit-button"
          >
            {language === 'ru' ? "Выйти из игры" : "Quit Game"}
          </button>
        )}
      </div>
    </>
  )
}