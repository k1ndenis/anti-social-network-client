import type { Track } from "./types/track"
import "./CurrentTrack.css"

interface CurrentTrackProps {
  tracks: Track[];
  currentTrackId: number | null;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export const CurrentTrack = ({
  tracks,
  currentTrackId,
  isPlaying,
  setIsPlaying
}: CurrentTrackProps) => {

  if (!currentTrackId) {
    return (
      <>
        <div className="current-track">
          <div className="scroll-wrapper-container">
            <span>Выберите трек</span>
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
          <span>Трек не найден</span>
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