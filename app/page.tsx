"use client";

import { useState, useEffect, useRef } from "react";
import VideoBackground from "./components/ui/VideoBackground";
import PageIndicator from "./components/ui/PageIndicator";
import WeddingPage from "./components/ui/WeddingPage";
import RsvpButton from "./components/rsvp/RsvpButton";
import Navigation from "./components/ui/Navigation";
import LandingPage from "./components/landing/LandingPage";
import { useNavigation } from "./hooks/useNavigation";
import { useAutoSwipe } from "./hooks/useAutoSwipe";
import { TOTAL_PAGES } from "./lib/constants";

export default function Home() {
  // Client-side only code
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Add key for animation reset
  const [currentView, setCurrentView] = useState<'landing' | 'card'>('landing'); // Default to landing page
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
  // Only enable these when in card view
  useNavigation({
    currentPage,
    totalPages: TOTAL_PAGES,
    onPageChange: changePage,
    enabled: currentView === 'card'
  });

  useAutoSwipe({
    currentPage,
    totalPages: TOTAL_PAGES,
    onPageChange: changePage,
    enabled: currentView === 'card'
  });

  // Initialize on client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle view change between landing page and wedding card
  const handleViewChange = (view: 'landing' | 'card') => {
    setCurrentView(view);
    // Reset to first page when switching to card view
    if (view === 'card') {
      setCurrentPage(0);
      setAnimationKey(prev => prev + 1);
    }
  };

  return (
    <div className="container">
      {/* Navigation */}
      <Navigation currentView={currentView} onViewChange={handleViewChange} />

      {/* Conditional rendering based on current view */}
      {currentView === 'landing' ? (
        <LandingPage />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
