import { updateUserAvatar } from "../../../../app/reducers/userSlice";
import { useAppDispatch } from "../../../../hooks/redux";

export const UserAvatarUploader = () => {
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0];
    if (currentFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const updatedAvatar = reader.result as string;
        dispatch(updateUserAvatar(updatedAvatar));
      }
      reader.readAsDataURL(currentFile);
    }
    e.target.value = "";
  } 

  return (
    <>
      <label htmlFor="file-upload">
        <h2>✏️</h2>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </label>
    </>
  )
}