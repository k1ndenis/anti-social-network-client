import { useAppSelector } from "../../../../hooks/redux";
import { SORT_MODES } from "./bll/useTrackProcessor";
import "./SortingButtons.css"

interface SortingButtonsProps {
  sorting: number;
  setSorting: React.Dispatch<React.SetStateAction<number>>;
}

const { 
  AUTHOR_ASC,
  AUTHOR_DESC,
  TITLE_ASC,
  TITLE_DESC
} = SORT_MODES;

export const SortingButtons = ({ sorting, setSorting }: SortingButtonsProps) => {
  const language = useAppSelector(state => state.language);

  return (
    <div className="music-sorting-buttons">
      <button
        onClick={() => sorting === AUTHOR_ASC ? setSorting(AUTHOR_DESC) : setSorting(AUTHOR_ASC)}
      >
        {language === 'ru' ? "Автор" : "Author"} {sorting === AUTHOR_ASC ? "↑" : "↓"}
      </button>
      <button
        onClick={() => sorting === TITLE_ASC ? setSorting(TITLE_DESC) : setSorting(TITLE_ASC)}
      >
        {language === 'ru' ? "Название" : "Title"} {sorting === TITLE_ASC ? "↑" : "↓"}
      </button>
    </div>
  )
}