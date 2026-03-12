import { like } from "../../app/reducers/likesSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface LikeButtonProps {
  language: 'ru' | 'en';
  pictureId: string
}

export const LikeButton = ({ language, pictureId }: LikeButtonProps) => {
  const likes = useAppSelector(state => state.likes[pictureId] || 0);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>❤️ {likes}</p>
      <button onClick={() => dispatch(like(pictureId))}>
        {language === 'ru' ? "Нравится" : "Like"}
      </button>
    </div>
  )
}