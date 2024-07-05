import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

interface VideoQuality {
  label: string;
  src: string;
}

interface VideoPlayerProps {
  initialUrl: string;
  videoQualities?: VideoQuality[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ initialUrl, videoQualities = [] }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playerRef.current?.seekTo(parseFloat(e.target.value));
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUrl(e.target.value);
    setPlaying(false);
    setTimeout(() => setPlaying(true), 100);
  };

  return (
    <div className="video-player-container">
      <ReactPlayer
        ref={playerRef}
        url={currentUrl}
        playing={playing}
        volume={volume}
        controls={false} // Set controls to false
        className="react-player"
        width="100%"
        height="360px"
        onProgress={handleProgress}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
          },
        }}
      />
      <div className="controls">
        <button onClick={handlePlayPause} className="control-button">
          {playing ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
          className="seek-slider"
        />
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <select onChange={handleQualityChange} className="quality-select">
          {videoQualities.map((quality) => (
            <option key={quality.src} value={quality.src}>
              {quality.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;