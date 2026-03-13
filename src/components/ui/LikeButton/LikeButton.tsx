import { like } from "../../../app/reducers/likesSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './LikeButton.css'

interface LikeButtonProps {
  language: 'ru' | 'en';
  pictureId: string
}

export const LikeButton = ({ language, pictureId }: LikeButtonProps) => {
  const likes = useAppSelector(state => state.likes[pictureId] || 0);
  const dispatch = useAppDispatch();

  return (
    <div className="like-container">
      
      <button className="like-button" onClick={() => dispatch(like(pictureId))}>
        <span>❤️</span>
        {language === 'ru' ? "Нравится" : "Like"}
      </button>
      <p className="like-count">❤️ {likes}</p>
    </div>
  )
}