import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";
import { CurrentTrack } from "./CurrentTrack";
import { SearchingInput } from "./SearchingInput";
import { AudioUploader } from "./AudioUploader";
import { TrackList } from "./TrackList";
import type { Track } from "./types/track";
import "./MyMusic.css"

interface MyMusicProps {
  language: 'ru' | 'en'
}

export const MyMusic = ({ language }: MyMusicProps) => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [currentSearchingValue, setCurrentSearchingValue] = useState<string>("");
  const [uploader, setUploader] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadTracks = async () => {
      const savedTracks = await get("tracks");
      if (savedTracks) {
        setTracks(savedTracks);
      }
    };
    loadTracks();
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/music`)
      .then(res => res.json())
      .then(data => {
        setTracks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading tracks", err);
      });
  }, [apiUrl]);

  const onAddTrack = (newTrack: Track) => {
    setTracks((prev) => [newTrack, ...prev]);
    set("tracks", [newTrack, ...tracks]);
  }

  const onDeleteTrack = async (id: string): Promise<void> => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/music/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        const updatedTracks = tracks.filter(track => track.id !== id);
        setTracks(updatedTracks);
        await set("tracks", updatedTracks);
      } else {
        alert("Не удалось удалить трек");
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
          language={language}
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
    <div className="current-track-container">
      <CurrentTrack 
        currentTrackId={currentTrackId}
        tracks={tracks}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        language={language}
      />
    </div>
    <SearchingInput
      currentValue={currentSearchingValue}
      setCurrentValue={setCurrentSearchingValue}
      language={language}
    />
    <TrackList
      loading={loading}
      tracks={tracks}
      currentSearchingValue={currentSearchingValue}
      currentTrackId={currentTrackId}
      setCurrentTrackId={setCurrentTrackId}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      onDeleteTrack={onDeleteTrack}
      language={language}
    />
    {getAudioUploader}
  </div>
  );
};
