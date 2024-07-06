import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

// Define interfaces for video quality and subtitle information

interface VideoQuality {
    label: string;
    src: string;
}

interface Subtitle {
    kind: string;
    src: string;
    srcLang: string;
    label: string;
    default?: boolean;
}

interface VideoPlayerProps {
    initialUrl: string;
    videoQualities: VideoQuality[];
    subtitles: Subtitle[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ initialUrl, videoQualities, subtitles }) => {
    const playerRef = useRef<ReactPlayer | null>(null); // Reference to the ReactPlayer instance 

    // State variables to manage the video player's state
    const [currentUrl, setCurrentUrl] = useState(initialUrl);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);
    const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentQuality, setCurrentQuality] = useState(initialUrl);

    // Effect to update the current URL and subtitle when initial values or subtitles change
    useEffect(() => {
        setCurrentUrl(initialUrl);
        setCurrentSubtitle(subtitles[0] || null);
    }, [initialUrl, subtitles]);

    // Effect to seek to the current time when subtitle or quality changes
    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.seekTo(currentTime);
        }
    }, [currentSubtitle, currentQuality]);

    // Toggle play/pause state
    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    // Change the volume
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    // Update played state and current time during video progress
    const handleProgress = (state: { played: number }) => {
        setPlayed(state.played);
        setCurrentTime(playerRef.current?.getCurrentTime() || 0);
    };

    // Seek to a specific time
    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        setPlayed(time / duration);
        playerRef.current?.seekTo(time);
    };

    // Change the video quality
    const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedQuality = e.target.value;
        setPlaying(false); // Pause the video before changing the URL
        setCurrentQuality(selectedQuality);
        setCurrentUrl(selectedQuality);
        setTimeout(() => {
            setPlaying(true); // Resume playing
        }, 100);
    };

    // Change the subtitle track
    const handleSubtitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubtitle = subtitles.find(sub => sub.src === e.target.value);
        setCurrentSubtitle(selectedSubtitle || null);
    };

    // Skip forward by 10 seconds
    const handleForward = () => {
        const currentTime = playerRef.current?.getCurrentTime() || 0;
        playerRef.current?.seekTo(currentTime + 10);
    };

    // Skip backward by 10 seconds
    const handleBackward = () => {
        const currentTime = playerRef.current?.getCurrentTime() || 0;
        playerRef.current?.seekTo(currentTime - 10);
    };

    // Update the duration state
    const handleDuration = (duration: number) => {
        setDuration(duration);
    };

    // Format time in mm:ss
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Map the current subtitle to the expected format for the player
    const mappedSubtitles = currentSubtitle ? [{
        kind: 'subtitles',
        src: currentSubtitle.src,
        srcLang: currentSubtitle.srcLang,
        label: currentSubtitle.label,
        default: true,
    }] : [];

    console.log('Configured subtitles:', mappedSubtitles);

    return (
        <div className="video-player-container mx-auto bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl">
            <ReactPlayer
                key={`${currentUrl}-${currentSubtitle ? currentSubtitle.src : 'no-subtitle'}`}
                ref={playerRef}
                url={currentUrl}
                playing={playing}
                volume={volume}
                controls={false}
                width="100%"
                height="100%"
                onProgress={handleProgress}
                onDuration={handleDuration}
                config={{
                    file: {
                        attributes: {
                            crossOrigin: 'anonymous',
                        },
                        tracks: mappedSubtitles,
                    },
                }}
            />
            <div className="controls flex justify-between items-center mt-4 bg-gray-800 bg-opacity-75 p-4 rounded-lg">
                <button onClick={handlePlayPause} className="control-button bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">
                    {playing ? '||' : '>'}
                </button>
                <button onClick={handleBackward} className="control-button bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">{'<<'}</button>
                <button onClick={handleForward} className="control-button bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">{'>>'}</button>
                <span className="time-display text-white">{formatTime(currentTime)} / {formatTime(duration)}</span>
                <div className="range-wrapper flex items-center">
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        step="any"
                        value={currentTime}
                        onChange={handleSeekChange}
                        className="seek-slider mx-2 bg-gray-700 rounded"
                    />
                </div>
                <div className="range-wrapper flex items-center">
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step="any"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider mx-2 bg-gray-700 rounded"
                    />
                </div>
                <select onChange={handleQualityChange} className="quality-select bg-gray-800 text-white py-2 px-4 rounded mx-2">
                    {videoQualities.map(quality => (
                        <option key={quality.src} value={quality.src}>
                            {quality.label}
                        </option>
                    ))}
                </select>
                <select onChange={handleSubtitleChange} className="subtitle-select bg-gray-800 text-white py-2 px-4 rounded mx-2" value={currentSubtitle?.src || ''}>
                    <option value="">No Subtitle</option>
                    {subtitles.map(subtitle => (
                        <option key={subtitle.src} value={subtitle.src}>
                            {subtitle.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default VideoPlayer;



