import { useState } from "react";
import type { Track } from './types/track'
import "./AudioUploader.css"

interface AudioUploaderProps {
  onAddTrack: (track: Track) => void;
  setUploader: React.Dispatch<React.SetStateAction<boolean>>;
  language: 'ru' | 'en'
}

export const AudioUploader = ({ onAddTrack, setUploader, language }: AudioUploaderProps) => {

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

    if (!file) return (
      language === 'ru' ? alert("Выберите файл") : alert("Choose file")
    )
    
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