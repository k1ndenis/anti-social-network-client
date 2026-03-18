import { useAppSelector } from "../../../hooks/redux";
import type { WeatherData } from "./MyWeather";
import "./WeatherDisplay.css"

interface WeatherDisplayProps {
  data: WeatherData | null;
  loading: boolean;
  error: boolean;
}

export const WeatherDisplay = ({ data, loading, error }: WeatherDisplayProps) => {
  const language = useAppSelector(stae => stae.language);

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
        {language === 'ru' ? "Произошла ошибка" : "An error occurred"}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="weather-info">
        {language === 'ru' ? "Город не найден" : "City not found"}
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
      <p>{language === 'ru' ? "Температура" : "Temperature"}: {temperature}</p>
      <p>{language === 'ru' ? "Описание" : "Description"}: {description}</p>
    </div>
  )

  return (
    <>
      {weatherInfo}
    </>
  )
}