import type { WeatherData } from "./MyWeather";
import "./WeatherDisplay.css"

interface WeatherDisplayProps {
  error: string | null;
  data: WeatherData | null
}

export const WeatherDisplay = ({ error, data }: WeatherDisplayProps) => {

  if (error) {
    return (
      <div>
        Ошибка: {error}
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        Город не найден
      </div>
    )
  }

  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;

  const weatherInfo = (
    <div className="weather-info">
      <h1>{name}</h1>
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
      />
      <p>Температура: {temperature}</p>
      <p>Описание: {description}</p>
    </div>
  )

  return (
    <>
      {weatherInfo}
    </>
  )
}