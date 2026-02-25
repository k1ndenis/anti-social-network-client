import { PictureUploader } from "./PictureUploader"
import type { Picture } from "./types/picture";
import "./PictureList.css"

interface PictureListProps {
  pictures: Picture[];
  onAddPicture: (picture: Picture) => void;
  onDeletePicture: (id: string) => void;
  setCurrentPictureInd: React.Dispatch<React.SetStateAction<number | null>>;
  language: 'ru' | 'en'
}

export const PictureList = ({ pictures, onAddPicture, onDeletePicture, setCurrentPictureInd, language }: PictureListProps) => {

  const confirmMessage = language == 'ru' ? "Подтвердите действие" : "Confirm action";

  const pictureList = (
      <ul className="picture-list-ul">
        <li>
          <div className="picture-add-button-container">
            <PictureUploader
              onAddPicture={onAddPicture}
            />
          </div>
        </li>
      {pictures.map((picture, index) => (
        <li key={picture.id}>
          <div className="picture-card">
            <img src={picture.url} onClick={() => setCurrentPictureInd(index)} />
            <button
              onClick={() => {
                if (confirm(confirmMessage)) {
                  onDeletePicture(picture.id)}
                }
              }
            >
              x
            </button>
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {pictureList}
    </>
  )
}