import { useState } from "react"
import "./Menu.css"
import { MyMusic } from "./music/MyMusic";
import { MyVideos } from "./videos/MyVideos";
import { MyWeather } from "./weather/MyWeather";
import { MyPictures } from "./pictures/MyPictures";
import { MyGames } from "./games/MyGames";

interface MenuProps {
  handleLogout: () => void
  language: 'ru' | 'en'
}

export const Menu = ({ handleLogout, language }: MenuProps) => {
  const [menuItem, setMenuItem] = useState<string>("");

  const menuList = (
    <>
      <button
        onClick={() => setMenuItem("Music")}
      >
        {language === 'ru' ? "Музыка" : "Music"}
      </button>
      <button
        onClick={() => setMenuItem("Pictures")}
      >
        {language === 'ru' ? "Картинки" : "Pictures"}
      </button>
      <button
        onClick={() => setMenuItem("Videos")}
      >
        {language === 'ru' ? "Видео" : "Videos"}
      </button>
      <button
        onClick={() => setMenuItem("Weather")}
      >
        {language === 'ru' ? "Погода" : "Weather"}
      </button>
      <button
        onClick={() => setMenuItem("Games")}
      >
        {language === 'ru' ? "Игры" : "Games"}
      </button>
    </>
  )
  

  return ( 
    <>
    <div className="menu">
      {menuItem ? (
        <>
          <button
            onClick={() => setMenuItem("")}
          >
            {language === 'ru' ? "В меню" : "Back to Menu"}
          </button>
          {menuItem === "Music" && <MyMusic language={language} />}
          {menuItem === "Pictures" && <MyPictures language={language} />}
          {menuItem === "Videos" && <MyVideos />}
          {menuItem === "Weather" && <MyWeather language={language} />}
          {menuItem === "Games" && <MyGames language={language} />}
          <button
            onClick={() => setMenuItem("")}
          >
            {language === 'ru' ? "В меню" : "Back to Menu"}
          </button>
        </>
      ) : menuList}
    </div>
    <button
      onClick={handleLogout}
    >
      {language === 'ru' ? "Выйти" : "Log Out"}
    </button>
    </>
  )
}  