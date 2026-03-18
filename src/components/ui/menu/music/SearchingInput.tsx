import { useAppSelector } from "../../../../hooks/redux";
import "./SearchingInput.css"

interface SearchingInputProps {
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>,
}

export const SearchingInput = ({ currentValue, setCurrentValue }: SearchingInputProps) => {
  const language = useAppSelector(state => state.language);

  return (
    <input
      className="searching-input"
      type="text"
      placeholder={language === 'ru' ? "Поиск трека" : "Search track"}
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  )
} 