import { useState } from "react";
import "./AudioUploader.css"
import { Track } from "../../../../types/track";
import { useAppSelector } from "../../../../hooks/redux";

interface AudioUploaderProps {
  setUploader: React.Dispatch<React.SetStateAction<boolean>>;
  onAddTrack: (newTrack: Track) => void;
}

export const AudioUploader = ({ setUploader, onAddTrack }: AudioUploaderProps) => {

  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const language = useAppSelector(state => state.language);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0]
    if (currentFile) {
      setFile(currentFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return (
      language === 'ru' ? alert("Выберите файл") : alert("Choose file")
    )
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const newTrack = {
        id: crypto.randomUUID(),
        author,
        title,
        url: reader.result as string
      };
      try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await fetch(`${apiUrl}/api/music`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTrack)
        })

        if (response.ok) {
          onAddTrack(newTrack);
          setAuthor("");
          setTitle("")
          setFile(null);
          setUploader(false);
        } else {
          console.log("Failed to upload track")
        }
      } catch (err) {
        console.error("Upload error", err);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <form 
        className="track-upload-form"
        onSubmit={handleSubmit}
      >
        <button 
          className="hide-upload-form-button"
          onClick={() => setUploader(false)}
        >
          x
        </button>
        {language === 'ru' ? "Загрузить трек" : "Upload track"}
        <input
          type="text"
          placeholder={language === 'ru' ? "Имя автора" : "Author name"}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={language === 'ru' ? "Название песни" : "Track title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          required
        />
        <button
          type="submit"
        >
          {language === 'ru' ? "Добавить трек" : "Add track"}
        </button>
      </form>
    </>
  )
}