import { useEffect } from "react";
import { fetchAllLikes, sendLikeToServer } from "../../../app/reducers/likesSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import './LikeButton.css'
import { updateLikedPictures } from "../../../app/reducers/userSlice";

interface LikeButtonProps {
  pictureId: string
}

export const LikeButton = ({ pictureId }: LikeButtonProps) => {
  const likes = useAppSelector(state => state.likes[pictureId] || []);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.user);
  const userLiked = likes.find((like) => like.userId === currentUser?.id);
  const language = useAppSelector(state => state.language);

  useEffect(() => {
    dispatch(fetchAllLikes());
  },[dispatch]);

  const handleLike = () => {
    if (!currentUser) return;
    dispatch(sendLikeToServer({
      pictureId,
      id: crypto.randomUUID(),
      userId: currentUser.id,
      authorName: currentUser.username
    }));
    dispatch(updateLikedPictures(pictureId));
  }

  return (
    <div className="like-container">
      
      <button className="like-button" onClick={handleLike}>
        <span>{userLiked ? "❤️" : "🤍"}</span>
        {language === 'ru' ? "Нравится" : "Like"}
      </button>
      <p className="like-count">❤️ {likes.length}</p>
    </div>
  )
}