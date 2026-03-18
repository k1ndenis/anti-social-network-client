import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchLikesForUser } from "../../../app/reducers/likesSlice";

export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.user);
  const isListening = useAppSelector(state => state.user.user?.listening);
  const likes = useAppSelector(state => state.likes);
  const pictures = useAppSelector(state => state.pictures.pictures)
  const likedPictures = pictures.filter(pic => likes[pic.id]?.find(like => like.userId === currentUser?.id));
  const language = useAppSelector(state => state.language);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchLikesForUser(currentUser.id));
    }
  }, [currentUser, dispatch])

  return (
    <div>
      <div>{language === 'ru' ? "Пользователь" : "User"}: {currentUser?.username}</div>
      {isListening && <div>{language === 'ru' ? "Слушает" : "Listening"}: {currentUser?.listening}</div>}
      {likedPictures.length > 0 && (
        <div>
          <p>{language === 'ru' ? "Понравившиеся картинки" : "Liked pictures"}</p>
          {likedPictures.map(pic => (
            <img key={pic.id} src={pic.url} alt="liked" width={100} height={100} />
          ))}
        </div>
      )}
    </div>
  )
}