import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

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
    const playerRef = useRef<ReactPlayer | null>(null);
    const [currentUrl, setCurrentUrl] = useState(initialUrl);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);
    const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);

    useEffect(() => {
        setCurrentUrl(initialUrl);
    }, [initialUrl]);

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

    const handleSubtitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubtitle = subtitles.find(sub => sub.src === e.target.value);
        console.log('Selected subtitle:', selectedSubtitle);
        setCurrentSubtitle(selectedSubtitle || null);
    };

    // Map the subtitle response to the expected format
    const mappedSubtitles = currentSubtitle ? [{
        kind: 'subtitles',
        src: currentSubtitle.src,
        srcLang: currentSubtitle.srcLang,  // Ensure srcLang is used here
        label: currentSubtitle.label,
        default: true,  // Set the selected subtitle as default
    }] : [];

    console.log('Configured subtitles:', mappedSubtitles);

    return (
        <div className="video-player-container">
            <ReactPlayer
                key={currentSubtitle ? currentSubtitle.src : 'no-subtitle'}
                ref={playerRef}
                url={currentUrl}
                playing={playing}
                volume={volume}
                controls={false}
                width="100%"
                height="100%"
                onProgress={handleProgress}
                config={{
                    file: {
                        attributes: {
                            crossOrigin: 'anonymous',
                        },
                        tracks: mappedSubtitles,
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
                    {videoQualities.map(quality => (
                        <option key={quality.src} value={quality.src}>
                            {quality.label}
                        </option>
                    ))}
                </select>
                <select onChange={handleSubtitleChange} className="subtitle-select" value={currentSubtitle?.src || ''}>
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