import "./CityInpit.css"

interface CityInpitProps {
  fetchData: () => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>
}

export const CityInput = ({ fetchData, city, setCity }: CityInpitProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchData();
  }

  return (
    <div className="city-input-container">
      <input
        className="city-input"
        type="text"
        placeholder="Введите название города..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={fetchData}
      >
        Узнать погоду
      </button>
    </div>
  )
}