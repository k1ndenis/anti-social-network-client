import { PictureUploader } from "./PictureUploader"
import type { Picture } from "../../../../types/picture";
import "./PictureList.css"
import { useAppSelector } from "../../../../hooks/redux";

interface PictureListProps {
  loading: boolean;
  pictures: Picture[];
  onAddPicture: (picture: Picture) => void;
  onDeletePicture: (id: string) => void;
  setCurrentPictureInd: React.Dispatch<React.SetStateAction<number | null>>;
}

export const PictureList = ({ loading, pictures, onAddPicture, onDeletePicture, setCurrentPictureInd }: PictureListProps) => {
  const language = useAppSelector(state => state.language);

  const confirmMessage = language == 'ru' ? "Подтвердите действие" : "Confirm action";
  
  if (!pictures) return;

  return (
    <>
      {loading
        ? <div className="loading-pictures-container">
            <img className="loading-gif" src="/images/loading.gif" />
          </div>
        : <ul className="picture-list-ul">
            <li>
              <div className="picture-add-button-container">
                <PictureUploader
                  onAddPicture={onAddPicture}
                />
              </div>
            </li>
            {pictures.map((picture, index) => (
              <div>
                <li key={picture.id}>
                  <div className="picture-card">
                    <img src={picture.url} onClick={() => setCurrentPictureInd(index)} />
                    <button
                      onClick={() => {
                        if (confirm(confirmMessage)) {
                          onDeletePicture(picture.id)}
                        }
                      }
                    >
                      x
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
      }
    </>
  )
}