import { SORT_MODES } from "./bll/useTrackProcessor";
import "./SortingButtons.css"

interface SortingButtonsProps {
  sorting: number;
  setSorting: React.Dispatch<React.SetStateAction<number>>;
  language: 'ru' | 'en'
}

const { 
  AUTHOR_ASC,
  AUTHOR_DESC,
  TITLE_ASC,
  TITLE_DESC
} = SORT_MODES;

export const SortingButtons = ({ sorting, setSorting, language }: SortingButtonsProps) => {

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