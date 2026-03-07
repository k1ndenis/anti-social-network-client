import "./SearchingInput.css"

interface SearchingInputProps {
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>,
  language: 'ru' | 'en'
}

export const SearchingInput = ({ currentValue, setCurrentValue, language }: SearchingInputProps) => {

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