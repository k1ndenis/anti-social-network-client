import { useAppSelector } from "../../../hooks/redux";

interface UserProfileProps {
  language: 'ru' | 'en'
}

export const UserProfile = ({ language }: UserProfileProps) => {
  const currentUser = useAppSelector(state => state.user.user);
  const isListening = useAppSelector(state => state.user.user?.listening);
  const likedPicturesIds = useAppSelector(state => state.user.user?.likedPictures);

  return (
    <div>
      <div>{language === 'ru' ? "Пользователь" : "User"}: {currentUser?.username}</div>
      {isListening && <div>{language === 'ru' ? "Слушает" : "Listening"}: {currentUser?.listening}</div>}
      {likedPicturesIds && (
        <div>
          {currentUser?.likedPictures.join("")}
        </div>
        )}
    </div>
  )
}