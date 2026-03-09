import { User } from "../../auth/types/user";

interface UserProfileProps {
  language: 'ru' | 'en';
  loggedUser: User | null;
}

export const UserProfile = ({ loggedUser }: UserProfileProps) => {

  return (
    <>
      {loggedUser?.username}
    </>
  )
}