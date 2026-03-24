import { useState } from "react";
import { useAppSelector } from "../../../../hooks/redux"
import { UserBioEditingForm } from "./UserBioEditingForm";
import './UserBio.css'

export const UserBio = () => {
  const bio = useAppSelector(state => state.user.user?.bio);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const language = useAppSelector(state => state.language);

  return (
    <div className="user-bio">
      <div className="user-bio-header">
        <span>{language === 'ru' ? "О себе" : "About me"}</span>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            {bio
              ? (language === 'ru' ? "Редактировать" : "Edit")
              : (language === 'ru' ? "Добавить" : "Add")}
          </button>
        )}
      </div>
        {!isEditing ? (
          <p className="user-bio-text">
            {bio || (
              language === 'ru' 
                ? "Вы ещё ничего не рассказали о себе"
                : "You haven't written anything about yourself yet"
              )}
          </p>
        ) : (
          <UserBioEditingForm
            initialValue={bio || ""}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        )}
    </div>
  )
}