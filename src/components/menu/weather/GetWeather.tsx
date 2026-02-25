import type { WeatherData } from "./MyWeather";
import { CityInput } from "./CityInput";

interface GetWeatherProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setData: (json: WeatherData | null) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const GetWeather = ({
  city,
  setCity,
  setData,
  setLoading
}: GetWeatherProps) => {

  const API_KEY = "9fe668fe853fc4dd8a6fe164ff909381";
  const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  API_KEY +
  "&units=metric&lang=ru";

  const fetchData = async (): Promise<void> => {
    if (!city) return;
    setLoading(true);
    localStorage.setItem("weatherCity", city);
    setCity("");
    const url = `${API_URL}&q=${city}`;
    
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok) {
        setData(null);
      } else {
        setData(json);
        setLoading(false);
      }
    } catch (error) {
      console.error("Ошибка при загрузке: ", error);
    }
  };

  return (
    <>
      <CityInput
        fetchData={fetchData}
        city={city}
        setCity={setCity}
      />
    </>
  )
}