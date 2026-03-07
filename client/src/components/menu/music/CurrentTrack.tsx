import type { Track } from "./types/track"
import "./CurrentTrack.css"

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

  const currentTrack = tracks.find(track => track.id === currentTrackId);

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
        <audio src={currentTrack.url} 
          controls 
          autoPlay 
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </>
  )
}