import { useAppSelector } from "../../../../hooks/redux"
import { User } from "../../../../types/user";

interface UserInfoProps {
  user: User | null
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const language = useAppSelector(state => state.language);
  const isListening = useAppSelector(state => state.user.user?.listening);

  return (
    <div className="profile-info">
      <h2>{user?.username}</h2>
      {isListening && (
        <p className="profile-listening">
          🎧 {language === "ru" ? "Слушает" : "Listening"}:{" "}
          {user?.listening}
        </p>
      )}
    </div>
  )
}