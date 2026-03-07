import { useEffect, useState } from "react";
import { get, set } from "idb-keyval"
import dataPictures from "../../../data/pictures.json";
import { PictureList } from "./PictureList";
import { CurrentPicture } from "./CurrentPicture";
import type { Picture } from "./types/picture";

interface MyPicturesProps {
  language: 'ru' | 'en'
}

export const MyPictures = ({ language }: MyPicturesProps) => {
  const [pictures, setPictures] = useState<Picture[]>(dataPictures);
  const [currentPictureInd, setCurrentPictureInd] = useState<number | null>(null);

  useEffect(() => {
    const loadPictures = async (): Promise<void> => {
      const savedPictures = await get("pictures");
      if (savedPictures) {
        setPictures(savedPictures);
      }
    };
    loadPictures()
  }, []);

  const onAddPicture = async (newPicture: Picture): Promise<void> => {
    const updatedPictures = [...pictures];
    updatedPictures.unshift(newPicture);
    setPictures(updatedPictures);
    await set("pictures", updatedPictures);
  }

  const onDeletePicture = async (id: string): Promise<void> => {
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
          language={language}
        />
      }
    </>
  )
}