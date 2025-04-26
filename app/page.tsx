"use client";

import { useState, useEffect, useRef } from "react";
import VideoBackground from "./components/ui/VideoBackground";
import PageIndicator from "./components/ui/PageIndicator";
import WeddingPage from "./components/ui/WeddingPage";
import RsvpButton from "./components/rsvp/RsvpButton";
import { useNavigation } from "./hooks/useNavigation";
import { useAutoSwipe } from "./hooks/useAutoSwipe";
import { TOTAL_PAGES } from "./lib/constants";

export default function Home() {
  // Client-side only code
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Add key for animation reset
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to change page with video restart
  const changePage = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      setAnimationKey(prev => prev + 1); // Increment key to reset animations
      
      // Restart video when page changes
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }
    }
  };

  // Use custom hooks for navigation and auto-swiping
  useNavigation({
    currentPage,
    totalPages: TOTAL_PAGES,
    onPageChange: changePage
  });

  useAutoSwipe({
    currentPage,
    totalPages: TOTAL_PAGES,
    onPageChange: changePage
  });

  // Initialize on client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container">
      <VideoBackground />

      {/* Content pages */}
      <div className="content-container">
        {/* Map through pages */}
        {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
          <WeddingPage
            key={`wedding-page-${index}`}
            pageIndex={index}
            currentPage={currentPage}
            animationKey={animationKey}
          />
        ))}
      </div>

      {/* Page indicator dots */}
      {isMounted && (
        <PageIndicator
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={changePage}
        />
      )}

      {/* RSVP Component */}
      <RsvpButton />
    </div>
  );
}
