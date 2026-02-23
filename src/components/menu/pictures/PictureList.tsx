import "./PictureList.css"
import { PictureUploader } from "./PictureUploader"

export const PictureList = (props) => {
  const { pictures, onAddPicture, onDeletePicture, setCurrentPictureId } = props;

  const pictureList = (
      <ul>
        <li>
          <div className="add-button-container">
            <PictureUploader
              onAddPicture={onAddPicture}
            />
          </div>
        </li>
      {pictures.map((picture) => (
        <li key={picture.id}>
          <div className="card">
            <img src={picture.url} onClick={() => setCurrentPictureId(picture.id)} />
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