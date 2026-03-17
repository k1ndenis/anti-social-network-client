import { useState } from "react"
import "./Menu.css"
import { MyMusic } from "./music/MyMusic";
import { MyVideos } from "./videos/MyVideos";
import { MyWeather } from "./weather/MyWeather";
import { MyPictures } from "./pictures/MyPictures";
import { MyGames } from "./games/MyGames";
import { Track } from "./music/types/track";
import { CurrentTrack } from "./music/CurrentTrack";
import { UserProfile } from "./user/UserProfile";
import { useAppSelector } from "../../hooks/redux";

interface MenuProps {
  language: 'ru' | 'en';
}

export const Menu = ({ language }: MenuProps) => {
  const [menuItem, setMenuItem] = useState<string>("");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const loggedUser = useAppSelector((state) => state.user.user)

  const menuList = (
    <>
      {loggedUser && 
      <button
        onClick={() => setMenuItem("User")}
      >
        {language === 'ru' ? "Моя страница" : "My profile"}
      </button>}
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
      {/* <button
        onClick={() => setMenuItem("Videos")}
      >
        {language === 'ru' ? "Видео" : "Videos"}
      </button> */}
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
    {currentTrack && (
      <div className="current-track-container">
        <CurrentTrack 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          language={language}
          setCurrentTrack={setCurrentTrack}
        />
      </div>
    )}
    <div className="menu" style={currentTrack ? {paddingTop: "140px"} : {paddingTop: "40px"}}>
      {menuItem ? (
        <>
          <button
            onClick={() => setMenuItem("")}
          >
            {language === 'ru' ? "В меню" : "Back to Menu"}
          </button>
          {menuItem === "Music" && 
            <MyMusic
              language={language}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />}
          {menuItem === "User" && <UserProfile language={language} />}
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
    </>
  )
}  