import type { Picture } from "./types/picture"

interface PictureUploaderProps {
  onAddPicture: (picture: Picture) => void
}

export const PictureUploader = ({ onAddPicture }: PictureUploaderProps) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0];
    if (currentFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const newPicture = {
          id: crypto.randomUUID(),
          url: reader.result as string
        }
        onAddPicture(newPicture);
      }
      reader.readAsDataURL(currentFile);
    }
    e.target.value = "";
  }

  return (
    <>
      <label htmlFor="file-upload">
        <img
          src="/images/add-button.png"
          className="add-button"
        />
      </label>
      <input
        id="file-upload"
        className="picture-add-picture-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
    </>
  )
}