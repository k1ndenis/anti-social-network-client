import { useState } from "react"
import { Scanword } from "./scanword/Scanword"
import { The2048 } from "./2048/The2048";
import './MyGames.css'

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
      <div className="game-container">
        {activeGame === "scanword" && <Scanword />}
        {activeGame === "2048" && <The2048 />}
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