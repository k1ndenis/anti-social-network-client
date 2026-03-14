import { User } from "../../types/user";

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