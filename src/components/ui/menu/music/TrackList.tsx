import { SortingButtons } from "./SortingButtons";
import { useTrackProcessor } from "./bll/useTrackProcessor";
import type { Track } from "./../../../types/track";
import "./TrackList.css"
import { useAppSelector } from "../../../../hooks/redux";

interface TrackListProps {
  loading: boolean;
  tracks: Track[];
  currentSearchingValue: string;
  currentTrack: Track | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteTrack: (id: string) => void;
}

export const TrackList = ({
  loading,
  tracks,
  currentSearchingValue,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  onDeleteTrack,
}: TrackListProps) => {
  const { processedTracks, sorting, setSorting } = useTrackProcessor(
    tracks,
    currentSearchingValue
  );
  const language = useAppSelector(state => state.language);

  const confirmMessage = language == 'ru' ? "Подтвердите действие" : "Confirm action";

  return (
    <>
      <SortingButtons
        sorting={sorting}
        setSorting={setSorting}
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
                onClick={currentTrack?.id === track.id
                    ? () => {
                      setCurrentTrack(null);
                      setIsPlaying(false);
                    } 
                    : () => {
                      setCurrentTrack(track);
                    }
                  }
              >
                <div className="track-row">
                  <button 
                    className="tracklist-buttons"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentTrack?.id === track.id) {
                        setIsPlaying(!isPlaying);
                      } else {
                        setCurrentTrack(track);
                        setIsPlaying(true);
                      }
                    }}
                  >
                    {isPlaying && currentTrack?.id === track.id ? "⏸" : "▶"}
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