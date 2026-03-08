import { SortingButtons } from "./SortingButtons";
import { useTrackProcessor } from "./bll/useTrackProcessor";
import type { Track } from "./types/track";
import "./TrackList.css"

interface TrackListProps {
  loading: boolean;
  tracks: Track[];
  currentSearchingValue: string;
  currentTrackId: string | null;
  setCurrentTrackId: React.Dispatch<React.SetStateAction<string | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteTrack: (id: string) => void;
  language: 'ru' | 'en'
}

export const TrackList = ({
  loading,
  tracks,
  currentSearchingValue,
  currentTrackId,
  setCurrentTrackId,
  isPlaying,
  setIsPlaying,
  onDeleteTrack,
  language
}: TrackListProps) => {
  const { processedTracks, sorting, setSorting } = useTrackProcessor(
    tracks,
    currentSearchingValue
  )

  const confirmMessage = language == 'ru' ? "Подтвердите действие" : "Confirm action";

  return (
    <>
      <SortingButtons
        sorting={sorting}
        setSorting={setSorting}
        language={language}
      />
      {loading
        ? <div className="loading-music-container">
            <img className="loading-gif" src="/images/loading.gif" />
          </div>
        : <ul className="tracklist">
            {processedTracks.map((track) => (
              <li 
                className="track-container"
                key={track.id}
                onClick={currentTrackId === track.id
                    ? () => {
                      setCurrentTrackId(null);
                      setIsPlaying(false);
                    } 
                    : () => setCurrentTrackId(track.id)}
              >
                <div className="track-row">
                  <button 
                    className="tracklist-buttons"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentTrackId === track.id) {
                        setIsPlaying(!isPlaying);
                      } else {
                        setCurrentTrackId(track.id);
                        setIsPlaying(true);
                      }
                    }}
                  >
                    {isPlaying && currentTrackId === track.id ? "⏸" : "▶"}
                  </button>
                  <div className="track-info">
                    {track.author} - {track.title}
                  </div>
                  <button 
                    className="tracklist-buttons"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(confirmMessage)) {
                        onDeleteTrack(track.id);
                      }
                    }}
                  >
                    x
                  </button>
                </div>
              </li>
            )
            )}
          </ul>
      }
    </>
  )
}