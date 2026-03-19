import { updateUserAvatar } from "../../../../app/reducers/userSlice";
import { useAppDispatch } from "../../../../hooks/redux";

export const UserAvatarUploader = () => {
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0];
    if (currentFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        dispatch(updateUserAvatar(reader.result as string));
      }

      reader.readAsDataURL(currentFile);
    }
    e.target.value = "";
  } 

  return (
    <>
      <label className="avatar-upload">
        ✏️
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </>
  )
}