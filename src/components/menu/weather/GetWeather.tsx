import { useEffect } from "react";
import { CityInput } from "./CityInput";

export const GetWeather = (props) => {

  const API_KEY = "9fe668fe853fc4dd8a6fe164ff909381";
  const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  API_KEY +
  "&units=metric&lang=ru";

  const fetchData = async () => {
    if (!props.city) return;

    props.setLoading(true);
    props.setError(null);
    localStorage.setItem("weatherCity", props.city);
    props.setCity("");

    const url = `${API_URL}&q=${props.city}`;
    
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok) {
        props.setError(json.message || "Ошибка загрузки");
        props.setData(null);
      } else {
        props.setData(json);
      }
    } catch (error) {
      props.setError("Сетевая ошибка");
      console.error("Ошибка при загрузке: ", error);
    } finally {
      props.setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <CityInput
        fetchData={fetchData}
        city={props.city}
        setCity={props.setCity}
      />
    </>
  )
}