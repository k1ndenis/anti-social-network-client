import { useEffect } from "react";
import { fetchLikes, sendLikeToServer } from "../../../app/reducers/likesSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './LikeButton.css'

interface LikeButtonProps {
  language: 'ru' | 'en';
  pictureId: string
}

export const LikeButton = ({ language, pictureId }: LikeButtonProps) => {
  const likes = useAppSelector(state => state.likes[pictureId] || []);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.user);

  useEffect(() => {
    dispatch(fetchLikes());
  },[dispatch]);

  const handleLike = () => {

    if (!currentUser) return;
    dispatch(sendLikeToServer({
      pictureId,
      id: crypto.randomUUID(),
      userId: currentUser.id,
      authorName: currentUser.username
    }));
  }

  return (
    <div className="like-container">
      
      <button className="like-button" onClick={handleLike}>
        <span>❤️</span>
        {language === 'ru' ? "Нравится" : "Like"}
      </button>
      <p className="like-count">❤️ {likes.length}</p>
    </div>
  )
}