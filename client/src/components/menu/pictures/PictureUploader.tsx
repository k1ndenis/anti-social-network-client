import type { Picture } from "./types/picture"

interface PictureUploaderProps {
  onAddPicture: (picture: Picture) => void
}

export const PictureUploader = ({ onAddPicture }: PictureUploaderProps) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0];
    if (currentFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const newPicture = {
          id: crypto.randomUUID(),
          url: reader.result as string
        }
        try {
          const apiUrl = import.meta.env.VITE_API_URL;

          const response = await fetch(`${apiUrl}/api/pictures`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPicture)
          })

          if (response.ok) {
            onAddPicture(newPicture);
          } else {
            console.error("Failed to upload picture");
          }
        } catch (err) {
          console.error("Upload error", err);
        }
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