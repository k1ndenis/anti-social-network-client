import { useState } from "react";
import './MyGames.css';
import { Scanword } from "./scanword/Scanword";
import { The2048 } from "./2048/The2048";
import { TicTacToe } from "./tic-tac-toe/TicTacToe";

export const MyGames = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <>
      <button
        onClick={() => setActiveGame("scanword")}
      >
        Сканворд
      </button>
      <button
        onClick={() => setActiveGame("2048")}
      >
        2048
      </button>
      <button
        onClick={() => setActiveGame("tictactoe")}
      >
        Крестики-нолики
      </button>
      <div className="game-container">
        {activeGame === "scanword" && <Scanword />}
        {activeGame === "2048" && <The2048 />}
        {activeGame === "tictactoe" && <TicTacToe />}
        {activeGame && (
          <button 
            onClick={() => setActiveGame(null)}
            className="exit-button"
          >
            Выйти из игры
          </button>
        )}
      </div>
    </>
  )
}