import type { Track } from "./types/track"
import "./CurrentTrack.css"
import { AudioTrack } from "./AudioTrack";

interface CurrentTrackProps {
  tracks: Track[];
  currentTrackId: string | null;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  language: 'ru' | 'en'
}

export const CurrentTrack = ({
  tracks,
  currentTrackId,
  isPlaying,
  setIsPlaying,
  language
}: CurrentTrackProps) => {
  const currentTrack = tracks.find(track => track.id === currentTrackId);
  if (!currentTrackId) {
    return (
      <>
        <div className="current-track">
          <div className="scroll-wrapper-container">
            <span>{language === 'ru' ? "Выберите трек" : "Choose track"}</span>
          </div>
        </div>
      </>
    )
  }

  if (!currentTrack) {
    return (
      <div className="current-track">
        <div className="scroll-wrapper-container">
          <span>{language === 'ru' ? "Трек не найден" : "Track not found"}</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="current-track">
      {isPlaying
        ? (
          <div className="scroll-wrapper-container">
            <div className="scroll-wrapper">
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
              <span>{currentTrack.author} - {currentTrack.title}</span>
            </div>
          </div>
        ) : (
          <div className="scroll-wrapper-container">
            <span>{currentTrack.author} - {currentTrack.title}</span>
          </div>
        )}
        <AudioTrack
          track={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </>
  )
}