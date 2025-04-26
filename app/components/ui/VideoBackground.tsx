/**
 * Video background component for the wedding card
 */
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { BACKGROUND_VIDEO_PATH } from '../../lib/constants';

interface VideoBackgroundProps {
  onPageChange?: () => void;
}

/**
 * Component for displaying a video background with fallback image
 * @param onPageChange Optional callback when page changes to restart video
 */
export default function VideoBackground({ onPageChange }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to restart the video
  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  };

  // Call restart video when page changes
  useEffect(() => {
    if (onPageChange) {
      restartVideo();
    }
  }, [onPageChange]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      id="bg-video"
    >
      <source src={BACKGROUND_VIDEO_PATH} type="video/mp4" />
      <Image src="/images/fallback-image.png" alt="Video not supported" width={414} height={736} />
    </video>
  );
}
