import { useEffect, useState } from "react";
import { PictureList } from "./PictureList";
import { CurrentPicture } from "./CurrentPicture";
import type { Picture } from "./../../../types/picture";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { deletePictureFromServer, fetchPictures, sendPictureToServer } from "../../../../app/reducers/picturesSlice";

export const MyPictures = () => {
  const [loading, setLoading] = useState(true);
  const [currentPictureInd, setCurrentPictureInd] = useState<number | null>(null);
  const pictures = useAppSelector(state => state.pictures.pictures)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(fetchPictures())
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleAddPicture = async (newPicture: Picture) => {
    dispatch(sendPictureToServer(newPicture));
  };

  const handleDeletePicture = async (id: string) => {
    dispatch(deletePictureFromServer(id));
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
          onAddPicture={handleAddPicture}
          onDeletePicture={handleDeletePicture}
          setCurrentPictureInd={setCurrentPictureInd}
        />
      }
    </>
  )
}