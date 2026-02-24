import "./SearchingInput.css"

interface SearchingInputProps {
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchingInput = ({ currentValue, setCurrentValue }: SearchingInputProps) => {

  return (
    <input
      className="searching-input"
      type="text"
      placeholder="Поиск трека"
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  )
} 