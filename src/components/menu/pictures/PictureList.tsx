import { PictureUploader } from "./PictureUploader"
import type { Picture } from "./types/picture";
import "./PictureList.css"

interface PictureListProps {
  pictures: Picture[];
  onAddPicture: (picture: Picture) => void;
  onDeletePicture: (id: string) => void;
  setCurrentPictureInd: React.Dispatch<React.SetStateAction<number | null>>
}

export const PictureList = ({ pictures, onAddPicture, onDeletePicture, setCurrentPictureInd }: PictureListProps) => {

  const pictureList = (
      <ul>
        <li>
          <div className="add-button-container">
            <PictureUploader
              onAddPicture={onAddPicture}
            />
          </div>
        </li>
      {pictures.map((picture, index) => (
        <li key={picture.id}>
          <div className="card">
            <img src={picture.url} onClick={() => setCurrentPictureInd(index)} />
            <button
              onClick={() => {
                if (confirm("Подтвердите действие")) {
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