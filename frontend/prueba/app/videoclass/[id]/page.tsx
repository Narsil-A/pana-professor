'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';

const VideoPlayer = dynamic(() => import('@/app/components/VideoPlayer'), { ssr: false });

interface Subtitle {
    kind: string;
    src: string;
    srcLang: string;
    label: string;
    default?: boolean;
}

interface VideoQuality {
    label: string;
    src: string;
}

const VideoPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [videoQualities, setVideoQualities] = useState<VideoQuality[]>([]);
    const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

    useEffect(() => {
        const fetchVideoData = async () => {
            if (id) {
                try {
                    const response = await apiService.get(`/api/classes/${id}/video/`);
                    const responseData = response;

                    console.log('API response:', responseData);

                    if (responseData) {
                        const { video_url, video_qualities, subtitles } = responseData;
                        console.log('Parsed response data:', { video_url, video_qualities, subtitles });

                        if (video_url && video_qualities && subtitles) {
                            setVideoUrl(video_url);
                            console.log('video url response: ', video_url);

                            setVideoQualities(video_qualities || []);
                            console.log('video quality response: ', video_qualities);

                            setSubtitles(subtitles || []);
                            console.log('video subtitle response: ', subtitles);
                        } else {
                            console.error('Video data not found in response.data');
                        }
                    } else {
                        console.error('Response data is undefined');
                    }
                } catch (error) {
                    console.error('Failed to fetch video data:', error);
                }
            }
        };

        fetchVideoData();
    }, [id]);

    if (!videoUrl) {
        return <p>Loading...</p>;
    }

    return (
        <VideoPlayer
            initialUrl={videoUrl}
            videoQualities={videoQualities}
            subtitles={subtitles}
        />
    );
};

export default VideoPage;