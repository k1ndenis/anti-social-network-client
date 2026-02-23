import { useEffect, useState } from "react";
import { get, set } from "idb-keyval"
import dataPictures from "../../../data/pictures.json";
import { PictureList } from "./PictureList";
import { CurrentPicture } from "./CurrentPicture";

export const MyPictures = () => {
  const [pictures, setPictures] = useState(dataPictures);
  const [currentPictureInd, setCurrentPictureInd] = useState(null);

  useEffect(() => {
    const loadPictures = async () => {
      const savedPictures = await get("pictures");
      if (savedPictures) {
        setPictures(savedPictures);
      }
    };
    loadPictures()
  }, []);

  const onAddPicture = async (newPicture) => {
    const updatedPictures = [...pictures];
    updatedPictures.unshift(newPicture);
    setPictures(updatedPictures);
    await set("pictures", updatedPictures);
  }

  const onDeletePicture = async (id) => {
    const updatedPictures = pictures.filter(picture => picture.id !== id);
    setPictures(updatedPictures);
    await set("pictures", updatedPictures);
  }

  return (
    <>
      {currentPictureInd !== null ? 
        <CurrentPicture
          pictures={pictures}
          currentPictureInd={currentPictureInd}
          setCurrentPictureInd={setCurrentPictureInd}
        /> : 
        <PictureList
          pictures={pictures}
          onAddPicture={onAddPicture}
          onDeletePicture={onDeletePicture}
          setCurrentPictureInd={setCurrentPictureInd}
        />
      }
    </>
  )
}