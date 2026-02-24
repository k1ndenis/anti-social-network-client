import { useState } from "react";
import type { Track } from './types/track'
import "./AudioUploader.css"

interface AudioUploaderProps {
  onAddTrack: (track: Track) => void;
  setUploader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AudioUploader = ({ onAddTrack, setUploader }: AudioUploaderProps) => {

  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0]
    if (currentFile) {
      setFile(currentFile)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return alert("Выберите файл");
    
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const newTrack = {
          id: crypto.randomUUID(),
          author: author,
          title: title,
          url: reader.result as string
        }
        onAddTrack(newTrack);
        }
      }
      reader.readAsDataURL(file)
    }
    setAuthor("");
    setTitle("")
    setFile(null);
    setUploader(false);
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
        Загрузить трек
        <input
          type="text"
          placeholder="Имя автора"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Название песни"
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
          Добавить трек
        </button>
      </form>
    </>
  )
}