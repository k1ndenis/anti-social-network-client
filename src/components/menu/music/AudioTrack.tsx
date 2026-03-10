import { useEffect, useRef, useState } from 'react';
import { Track } from './types/track'
import "./AudioTrack.css"

interface AudioTrackProps {
  track: Track;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export const AudioTrack = ({ track, isPlaying, setIsPlaying }: AudioTrackProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.error("Play error", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime / audio.duration || 0);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime / audioRef.current.duration);
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className='audio-track-container'>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "⏸" : "▶"}
      </button>

      <div className='track-bar' onClick={handleSeek}>
        <div
          className='track-progress'
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={e => setVolume(Number(e.target.value))}
        className='volume-slider'
      />

      <audio ref={audioRef} src={apiUrl + track.url} />
    </div>
  )
}