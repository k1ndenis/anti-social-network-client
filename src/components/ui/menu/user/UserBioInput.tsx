import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { updateUserBio } from "../../../../app/reducers/userSlice";

export const UserBioInport = () => {
  const language = useAppSelector(state => state.language);
  const [currentBio, setCurrentBio] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserBio(currentBio));
  } 

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={language === 'ru' ? "Расскажите о себе..." : "Write about yourself..."}
        value={currentBio}
        onChange={(e) => setCurrentBio(e.target.value)}
      />
      <button type="submit">{language === 'ru' ? "Сохранить" : "Save"}</button>
    </form>
  )
}