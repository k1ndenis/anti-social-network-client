import type { WeatherData } from "./MyWeather";
import "./WeatherDisplay.css"

interface WeatherDisplayProps {
  data: WeatherData | null;
  loading: boolean;
  error: boolean
}

export const WeatherDisplay = ({ data, loading, error }: WeatherDisplayProps) => {

  if (loading) {
    return (
      <div className="weather-info">
        <img className="loading-gif" src="/images/loading.gif" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-info">
        Произошла ошибка
      </div>
    )
  }

  if (!data) {
    return (
      <div className="weather-info">
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
        className="weather-icon"
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