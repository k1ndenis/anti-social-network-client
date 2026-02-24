import { useState } from "react"
import "./Menu.css"
import { MyMusic } from "./music/MyMusic";
import { MyVideos } from "./videos/MyVideos";
import { MyWeather } from "./weather/MyWeather";
import { MyPictures } from "./pictures/MyPictures";
import { MyGames } from "./games/MyGames";

interface MenuItemStyle {
  id: number,
  title: string,
  item: React.ReactElement
}

const MENU_DATA: MenuItemStyle[] = [
  {
    id: 1,
    title: "Музыка",
    item: <MyMusic />
  },
  {
    id: 2,
    title: "Картинки",
    item: <MyPictures />
  },
  {
    id: 3,
    title: "Видео",
    item: <MyVideos />
  },
  {
    id: 4,
    title: "Погода",
    item: <MyWeather />
  },
  {
    id: 5,
    title: "Игры",
    item: <MyGames />
  }
]

export const Menu = (props) => {

  const [menuItem, setMenuItem] = useState<number | null>(null);

  const menuList = (
    MENU_DATA.map((item) => 
      <button
        key={item.id}
        onClick={() => setMenuItem(item.id)}
      >
        {item.title}
      </button>
    )
  )

  const currentMenuItem = MENU_DATA.find(item => item.id === menuItem);

  return ( 
    <>
    <div className="menu">
      {menuItem ? (
        <>
          <button
            onClick={() => setMenuItem(null)}
          >
            В меню
          </button>
          {currentMenuItem?.item}
          <button
            onClick={() => setMenuItem(null)}
          >
            В меню
          </button>
        </>
      ) : menuList}
    </div>
    <button
      onClick={props.handleLogout}
    >
      Выйти
    </button>
    </>
  )
}  