import { useAppSelector } from '../../../../hooks/redux';
import { User } from '../../../types/user';
import './UserLikedPictures.css'

interface UserLikedPicturesProps {
  user: User | null
}

export const UserLikedPictures = ({ user }: UserLikedPicturesProps) => {
  const language = useAppSelector(state => state.language);
  const pictures = useAppSelector(state => state.pictures.pictures);
  const likedPictures = pictures.filter(pic => user?.likedPicturesIds?.includes(pic.id));

  return (
    <>
      {likedPictures.length > 0 && (
        <div className="profile-liked">
          <h3>{language === 'ru' ? "Понравившиеся картинки" : "Liked pictures"}</h3>
          <div className="profile-liked-grid">
            {likedPictures.map(pic => (
              <img key={pic.id} src={pic.url} alt="liked" />
            ))}
          </div>
        </div>
      )}
    </>
  )
}