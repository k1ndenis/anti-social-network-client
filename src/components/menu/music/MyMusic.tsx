import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";
import { SearchingInput } from "./SearchingInput";
import { AudioUploader } from "./AudioUploader";
import { TrackList } from "./TrackList";
import type { Track } from "./types/track";
import "./MyMusic.css"
import { useAppSelector } from "../../../hooks/redux";

interface MyMusicProps {
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  currentTrack: Track | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>
}

export const MyMusic = ({ isPlaying, setIsPlaying, currentTrack, setCurrentTrack }: MyMusicProps) => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentSearchingValue, setCurrentSearchingValue] = useState<string>("");
  const [uploader, setUploader] = useState<boolean>(false);
  const language = useAppSelector(state => state.language);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/music`);
        const data = await res.json();
        setTracks(data);
        await set("tracks", data);
      } catch (err) {
        console.error("Error loading tracks", err);
        const savedTracks = await get("tracks");
        if (savedTracks) setTracks(savedTracks);
      } finally {
        setLoading(false);
      }
    };
    loadTracks();
  }, [apiUrl]);

  const onAddTrack = async (newTrack: Track) => {
    try {
      const res = await fetch(`${apiUrl}/api/music`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrack)
      });
      const savedTrack = await res.json();
      setTracks(prev => {
        const updated = [savedTrack, ...prev];
        set("tracks", updated);
        return updated
      })
    } catch (err) {
      console.error("Error adding track", err);
    }
  }

  const onDeleteTrack = async (id: string): Promise<void> => {
    const alertMessage = language === 'ru' ? "Не удалось удалить трек" : "Failed to delete track";
    try {
      const res = await fetch(`${apiUrl}/api/music/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        const updatedTracks = tracks.filter(track => track.id !== id);
        setTracks(updatedTracks);
        await set("tracks", updatedTracks);
      } else {
        alert(alertMessage);
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  }

  const getAudioUploader = (
    uploader
      ? (
        <AudioUploader
          setUploader={setUploader}
          onAddTrack={onAddTrack}
        />
      ) : (
        <button
          onClick={() => setUploader(true)}
        >
          {language == 'ru' ? "Загрузить свой трек" : "Upload your track"}
        </button>
      )
    )

  return (
  <div className="music-container">
    <SearchingInput
      currentValue={currentSearchingValue}
      setCurrentValue={setCurrentSearchingValue}
    />
    <TrackList
      loading={loading}
      tracks={tracks}
      currentSearchingValue={currentSearchingValue}
      currentTrack={currentTrack}
      setCurrentTrack={setCurrentTrack}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      onDeleteTrack={onDeleteTrack}
    />
    {getAudioUploader}
  </div>
  );
};
