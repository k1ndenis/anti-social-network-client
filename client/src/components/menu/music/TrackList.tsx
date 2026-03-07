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

  if (loading) return (
    <ul className="tracklist">
      <li>{language == 'ru' ? "Загрузка..." : "Loading..."}</li>
    </ul>
  )

  if (tracks.length === 0) return (
    <ul className="tracklist">
      <li>{language == 'ru' ? "Список треков пуст" : "Track list is empty"}</li>
    </ul>
  )

  const confirmMessage = language == 'ru' ? "Подтвердите действие" : "Confirm action";

  return (
    <>
      <SortingButtons
        sorting={sorting}
        setSorting={setSorting}
        language={language}
      />
      <ul className="tracklist">
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
              <button className="tracklist-buttons">
                {isPlaying && currentTrackId === track.id ? "⏸" : "▶"}
              </button>
              <li>
                {track.author} - {track.title}
              </li>
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
    </>
  )
}