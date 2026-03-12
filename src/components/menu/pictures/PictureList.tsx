import { PictureUploader } from "./PictureUploader"
import type { Picture } from "./types/picture";
import "./PictureList.css"
import { LikeButton } from "../../ui/LikeButton/LikeButton";
import { Comment } from "../../ui/Comment/Comment";

interface PictureListProps {
  loading: boolean;
  pictures: Picture[];
  onAddPicture: (picture: Picture) => void;
  onDeletePicture: (id: string) => void;
  setCurrentPictureInd: React.Dispatch<React.SetStateAction<number | null>>;
  language: 'ru' | 'en'
}

export const PictureList = ({ loading, pictures, onAddPicture, onDeletePicture, setCurrentPictureInd, language }: PictureListProps) => {

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
                <LikeButton language={language} pictureId={picture.id} />
                <Comment language={language} pictureId={picture.id} />
              </div>
            ))}
          </ul>
      }
    </>
  )
}