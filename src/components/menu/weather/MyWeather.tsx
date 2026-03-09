import { useState } from "react";
import { GetWeather } from "./GetWeather";
import { WeatherDisplay } from "./WeatherDisplay";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string
  }[];
}

interface MyWeatherProps {
  language: 'ru' | 'en'
}

export const MyWeather = ({ language }: MyWeatherProps) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [city, setCity] = useState<string>(() => {
    return localStorage.getItem("weatherCity") || ""
  });

  return (
    <>
      <WeatherDisplay
        data={data}
        loading={loading}
        error={error}
        language={language}
      />
      <GetWeather
        setData={setData}
        city={city}
        setCity={setCity}
        setLoading={setLoading}
        setError={setError}
        language={language}
      />
    </>
  )
} 