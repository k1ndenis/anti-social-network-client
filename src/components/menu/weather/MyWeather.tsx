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

export const MyWeather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>(() => {
    return localStorage.getItem("weatherCity") || ""
  });
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <WeatherDisplay
        data={data}
        error={error}
      />
      <GetWeather
        setData={setData}
        city={city}
        setCity={setCity}
        setError={setError}
      />
    </>
  )
} 