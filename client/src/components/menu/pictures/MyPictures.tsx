import { useEffect, useState } from "react";
import { get, set } from "idb-keyval"
import { PictureList } from "./PictureList";
import { CurrentPicture } from "./CurrentPicture";
import type { Picture } from "./types/picture";

interface MyPicturesProps {
  language: 'ru' | 'en'
}

export const MyPictures = ({ language }: MyPicturesProps) => {
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [currentPictureInd, setCurrentPictureInd] = useState<number | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadPictures = async (): Promise<void> => {
      try {
        const res = await fetch(`${apiUrl}/api/pictures`);
        const data = await res.json();
        setPictures(data);
        await set("pictures", data);
      } catch (err) {
        console.error("Error loading pictures", err);
        const savedPictures = await get("pictures");
        if (savedPictures) setPictures(savedPictures);
      } finally {
        setLoading(false);
      }
    };
    loadPictures();
  }, [apiUrl]);

  const onAddPicture = async (newPicture: Picture): Promise<void> => {
    try {
      const res = await fetch(`${apiUrl}/api/pictures`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPicture)
      });
      const savedPicture = await res.json();
      setPictures(prev => {
        const updated = [savedPicture, ...prev];
        set("pictures", updated);
        return updated
      })
    } catch (err) {
      console.error("Error adding picture", err);
    }
  }

  const onDeletePicture = async (id: string): Promise<void> => {
    const alertMessage = language === 'ru' ? "Не удалось удалить изображение" : "Failed to delete picture";
    try {
      const res = await fetch(`${apiUrl}/api/pictures/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        const updatedPictures = pictures.filter(picture => picture.id !== id);
        setPictures(updatedPictures);
        await set("pictures", updatedPictures);
      } else {
        alert(alertMessage);
      }
    } catch (err) {
      console.error("Delete error", err);
    }
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
          loading={loading}
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