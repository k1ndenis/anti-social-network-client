import { useAppSelector } from "../../../../hooks/redux"
import { UserAvatarUploader } from "./UserAvatarUploader";

export const UserAvatar = () => {
  const avatar = useAppSelector(state => state.user.user?.avatar);

  return (
    <>
      <img src={avatar} />
      <UserAvatarUploader />
    </>
  )
}