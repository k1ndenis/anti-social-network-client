import { useState } from "react";
import { useAppSelector } from "../../../../hooks/redux"
import { UserBioInport } from "./UserBioInput";

export const UserBio = () => {
  const bio = useAppSelector(state => state.user.user?.bio);
  const [showinput, setShowInput] = useState<boolean>(false);

  return (
    <>
      О себе: {bio ? bio : (
        <div>
          <button onClick={() => setShowInput(true)}>Изменить</button>
        </div>
        )}
      {showinput && <UserBioInport /> }
    </>
  )
}