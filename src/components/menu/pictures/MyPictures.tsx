import { useEffect, useState } from "react";
import { PictureList } from "./PictureList";
import { CurrentPicture } from "./CurrentPicture";
import type { Picture } from "./types/picture";
import { addPicture, deletePicture, loadPictures } from "./bll/picturesService";

interface MyPicturesProps {
  language: 'ru' | 'en'
}

export const MyPictures = ({ language }: MyPicturesProps) => {
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [currentPictureInd, setCurrentPictureInd] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const loadedPictures = await loadPictures();
      setPictures(loadedPictures);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddPicture = async (newPicture: Picture) => {
    const saved = await addPicture(newPicture);
    if (saved) setPictures([saved, ...pictures]);
  };

  const handleDeletePicture = async (id: string) => {
    const success = await deletePicture(id);
    if (success) {
      setPictures(prev => prev.filter(pic => pic.id !== id));
    } else {
      const alertMessage = language === 'ru' ? "Не удалось удалить изображение" : "Failed to delete picture";
      alert(alertMessage);
    }
  }

  return (
    <>
      {currentPictureInd !== null ? 
        <CurrentPicture
          language={language}
          pictures={pictures}
          currentPictureInd={currentPictureInd}
          setCurrentPictureInd={setCurrentPictureInd}
        /> : 
        <PictureList
          loading={loading}
          pictures={pictures}
          onAddPicture={handleAddPicture}
          onDeletePicture={handleDeletePicture}
          setCurrentPictureInd={setCurrentPictureInd}
          language={language}
        />
      }
    </>
  )
}