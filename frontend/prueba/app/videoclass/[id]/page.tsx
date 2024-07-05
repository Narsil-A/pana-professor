'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';

const VideoPlayer = dynamic(() => import('@/app/components/VideoPlayer'), { ssr: false });

interface VideoQuality {
  label: string;
  src: string;
}

const VideoPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [videoQualities, setVideoQualities] = useState<VideoQuality[]>([]);

    useEffect(() => {
        const fetchVideoData = async () => {
            if (id) {
                try {
                    const response = await apiService.get(`/api/classes/${id}/video/`);
                    if (response.video_url) {
                        setVideoUrl(response.video_url);
                        setVideoQualities(response.video_qualities || []);
                    } else {
                        console.error('Video URL not found');
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

    return <VideoPlayer initialUrl={videoUrl} videoQualities={videoQualities} />;
};

export default VideoPage;