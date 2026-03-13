
import type { Picture } from './types/picture';
import './CurrentPicture.css'
import { LikeButton } from '../../ui/LikeButton/LikeButton';
import { Comment } from '../../ui/Comment/Comment';

interface CurrentPictureProps {
  language: 'ru' | 'en';
  pictures: Picture[];
  currentPictureInd: number | null;
  setCurrentPictureInd: React.Dispatch<React.SetStateAction<number | null>>
}

export const CurrentPicture = ({ language, pictures, currentPictureInd, setCurrentPictureInd }: CurrentPictureProps) => {
  let currentPictureId: string = "";
  if (currentPictureInd !== null) currentPictureId = pictures[currentPictureInd].id;

  const togglePicture = (direction: string) => {
    if (direction === "past" && currentPictureInd !== null) {
      const pastInd = currentPictureInd - 1;
      if (pastInd >= 0) setCurrentPictureInd(pastInd);
    }
    if (direction === "next" && currentPictureInd !== null) {
      const nextInd = currentPictureInd + 1;
      if (nextInd < pictures.length) setCurrentPictureInd(nextInd);
    }
  }

  return (
    <div className='current-picture-container'>
      <div className="current-picture">
        {currentPictureInd !== null && <img src={pictures[currentPictureInd].url} />}
        <button
          className="hide-current-picture-button"
          onClick={() => setCurrentPictureInd(null)}
        >
          x
        </button>
        <button
          className="past-picture-button"
          onClick={() => togglePicture("past")}
        >
          ←
        </button>
        <button
          className="next-picture-button"
          onClick={() => togglePicture("next")}
        >
          →
        </button>
      </div>
      <LikeButton language={language} pictureId={currentPictureId} />
      <Comment language={language} pictureId={currentPictureId} />
    </div>
  )
}