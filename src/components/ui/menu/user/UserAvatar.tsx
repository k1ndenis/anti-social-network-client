import { useAppSelector } from "../../../../hooks/redux"
import { UserAvatarUploader } from "./UserAvatarUploader";
import './UserAvatar.css'

export const UserAvatar = () => {
  const avatar = useAppSelector(state => state.user.user?.avatar);

  return (
    <div className="avatar">
      <div className="avatar-wrapper">
        <img 
          src={avatar || 'images/default-avatar.png'} 
          alt="avatar"
          className="avatar-img"
        />
        <div className="avatar-overlay">
          <UserAvatarUploader />
        </div>
      </div>
    </div>
  )
}