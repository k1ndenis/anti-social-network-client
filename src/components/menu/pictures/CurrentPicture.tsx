import './CurrentPicture.css'

export const CurrentPicture = (props) => {
  const { pictures, currentPictureInd, setCurrentPictureInd } = props;

  const togglePicture = (direction) => {
    if (direction === "past") {
      const pastInd = currentPictureInd - 1;
      if (pastInd >= 0) setCurrentPictureInd(pastInd);
    }
    if (direction === "next") {
      const nextInd = currentPictureInd + 1;
      if (nextInd < pictures.length) setCurrentPictureInd(nextInd);
    }
  }

  return (
    <div className="current-picture">
      <img src={pictures[currentPictureInd].url} />
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
  )
}