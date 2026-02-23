import "./PictureList.css"
import { PictureUploader } from "./PictureUploader"

export const PictureList = (props) => {
  const { pictures, onAddPicture, onDeletePicture, setCurrentPictureInd } = props;

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