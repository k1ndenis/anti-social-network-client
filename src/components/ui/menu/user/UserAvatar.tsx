import { useAppSelector } from "../../../../hooks/redux"

export const UserAvatar = () => {
  const avatar = useAppSelector(state => state.user.user?.avatar);

  return (
    <>
      <img src={avatar} />
    </>
  )
}