import type { Track } from "./types/track"
import "./CurrentTrack.css"
import { AudioTrack } from "./AudioTrack";

interface CurrentTrackProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  language: 'ru' | 'en';
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>
}

export const CurrentTrack = ({
  currentTrack,
  isPlaying,
  setIsPlaying,
  language,
  setCurrentTrack
}: CurrentTrackProps) => {
  
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
        <button
          className="hide-music-player-button"
          onClick={() => setCurrentTrack(null)}
        >
          x
        </button>
      </div>
    </>
  )
}