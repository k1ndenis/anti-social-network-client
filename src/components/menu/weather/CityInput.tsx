import "./CityInpit.css"

interface CityInpitProps {
  fetchData: () => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  language: 'ru' | 'en'
}

export const CityInput = ({ fetchData, city, setCity, language }: CityInpitProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchData();
  }

  return (
    <div className="city-input-container">
      <input
        className="city-input"
        type="text"
        placeholder={language === 'ru' ? "Введите название города..." : "Enter city name..."}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={fetchData}
      >
        {language === 'ru' ? "Узнать погоду" : "Get weather"}
      </button>
    </div>
  )
}