import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { updateUserBio } from "../../../../app/reducers/userSlice";

interface UserBioEditingFormProps {
  initialValue: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const UserBioEditingForm = ({ initialValue, onCancel, onSuccess }: UserBioEditingFormProps) => {
  const language = useAppSelector(state => state.language);
  const [currentBio, setCurrentBio] = useState<string>(initialValue);
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserBio(currentBio));
    onSuccess();
  } 

  return (
    <form className="user-bio-form" onSubmit={onSubmit}>
      <textarea
        placeholder={language === 'ru' ? "Расскажите о себе..." : "Write about yourself..."}
        value={currentBio}
        onChange={(e) => setCurrentBio(e.target.value)}
        rows={4}
      />
      <div className="user-bio-actions">
        <button type="submit">
          {language === 'ru' ? "Сохранить" : "Save"}
        </button>
        <button type="button" onClick={onCancel}>
          {language === 'ru' ? "Отмена" : "Cancel"}
        </button>
      </div>
    </form>
  )
}