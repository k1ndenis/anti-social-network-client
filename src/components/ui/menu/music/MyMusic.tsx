import { useEffect, useState } from "react";
import { SearchingInput } from "./SearchingInput";
import { AudioUploader } from "./AudioUploader";
import { TrackList } from "./TrackList";
import type { Track } from "../../../../types/track";
import "./MyMusic.css"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { deleteTrackFromServer, fetchTracks, sendTrackToServer } from "../../../../app/reducers/tracksSlice";

interface MyMusicProps {
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  currentTrack: Track | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>
}

export const MyMusic = ({ isPlaying, setIsPlaying, currentTrack, setCurrentTrack }: MyMusicProps) => {
  const tracks = useAppSelector(state => state.tracks.tracks);
  const [loading, setLoading] = useState(true);
  const [currentSearchingValue, setCurrentSearchingValue] = useState<string>("");
  const [uploader, setUploader] = useState<boolean>(false);
  const language = useAppSelector(state => state.language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(fetchTracks());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleAddpicture = async (newTrack: Track) => {
    dispatch(sendTrackToServer(newTrack));
  }

  const handleDeleteTrack = (id: string) => {
    dispatch(deleteTrackFromServer(id));
  }

  const getAudioUploader = (
    uploader
      ? (
        <AudioUploader
          setUploader={setUploader}
          onAddTrack={handleAddpicture}
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
      onDeleteTrack={handleDeleteTrack}
    />
    {getAudioUploader}
  </div>
  );
};
