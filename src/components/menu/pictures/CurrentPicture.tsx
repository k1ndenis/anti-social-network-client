import './CurrentPicture.css'

export const CurrentPicture = (props) => {
  const { pictures, currentPictureId, setCurrentPictureId } = props;

  const currentPicture = pictures.find(picture => picture.id === currentPictureId);

  return (
    <div className="current-picture">
      <img src={currentPicture.url} />
      <button onClick={() => setCurrentPictureId(null)}>x</button>
    </div>
  )
}