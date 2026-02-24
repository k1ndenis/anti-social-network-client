import { SortingButtons } from "./SortingButtons";
import { useTrackProcessor } from "./bll/useTrackProcessor";
import type { Track } from "./types/track";
import "./TrackList.css"

interface TrackListProps {
  tracks: Track[];
  currentSearchingValue: string;
  currentTrackId: string | null;
  setCurrentTrackId: React.Dispatch<React.SetStateAction<string | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  onDeleteTrack: (id: string) => void
}

export const TrackList = ({
  tracks,
  currentSearchingValue,
  currentTrackId,
  setCurrentTrackId,
  isPlaying,
  setIsPlaying,
  onDeleteTrack
}: TrackListProps) => {
  const { processedTracks, sorting, setSorting } = useTrackProcessor(
    tracks,
    currentSearchingValue
  )

  if (tracks.length === 0) return (
    <ul className="tracklist">
      <li>Список треков пуст</li>
    </ul>
  )

  return (
    <>
      <SortingButtons
        sorting={sorting}
        setSorting={setSorting}
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
                  if (confirm("Подтвердите действие")) {
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