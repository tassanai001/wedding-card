"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import DevToolsRsvp from "./components/DevToolsRsvp";

export default function Home() {
  // Client-side only code
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Add key for animation reset
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoSwipeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to restart the video
  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Function to change page with video restart
  const changePage = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      setAnimationKey(prev => prev + 1); // Increment key to reset animations
      restartVideo();

      // Reset the auto-swipe timer whenever page changes manually
      if (autoSwipeTimerRef.current) {
        clearTimeout(autoSwipeTimerRef.current);
      }

      // Always restart the auto-swipe timer after changing pages
      startAutoSwipeTimer();
    }
  };

  // Function to start the auto-swipe timer
  const startAutoSwipeTimer = () => {
    // Clear any existing timer
    if (autoSwipeTimerRef.current) {
      clearTimeout(autoSwipeTimerRef.current);
    }

    // Set a new timer for 10 seconds
    autoSwipeTimerRef.current = setTimeout(() => {
      // Move to the next page, or back to the first page if we're at the end
      const nextPage = (currentPage + 1) % 2; // Assuming there are 2 pages (0 and 1)
      changePage(nextPage);
    }, 10000); // 10 seconds
  };

  // Initialize on client-side only
  useEffect(() => {
    setIsMounted(true);

    // Touch event handlers
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    // Use Event instead of TouchEvent for better compatibility
    const handleTouchStart = (e: Event) => {
      // Cast to TouchEvent to access specific properties
      const touchEvent = e as TouchEvent;
      touchStartX = touchEvent.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: Event) => {
      // Cast to TouchEvent to access specific properties
      const touchEvent = e as TouchEvent;
      touchEndX = touchEvent.changedTouches[0].screenX;
      handleSwipe();
    };

    // Handle swipe logic
    const handleSwipe = () => {
      const distance = touchStartX - touchEndX;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe && currentPage < 1) {
        // Swipe left to go to next page
        changePage(1);
      } else if (isRightSwipe && currentPage > 0) {
        // Swipe right to go to previous page
        changePage(0);
      }
    };

    // Add event listeners
    const container = document.querySelector('.container');
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
    }

    // Optional: Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentPage < 1) {
        changePage(1);
      } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        changePage(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Start the auto-swipe timer when component mounts
    startAutoSwipeTimer();

    // Cleanup
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('keydown', handleKeyDown);

      // Clear the auto-swipe timer when component unmounts
      if (autoSwipeTimerRef.current) {
        clearTimeout(autoSwipeTimerRef.current);
      }
    };
  }, [currentPage]); // Include currentPage in dependencies

  // Handle dot indicator click
  const handleDotClick = (index: number) => {
    changePage(index);
  };

  return (
    <div className="container">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        id="bg-video"
      >
        <source src="/videos/pink-flower.mp4" type="video/mp4" />
        <Image src="/images/fallback-image.png" alt="Video not supported" width={414} height={736} />
      </video>

      {/* Content pages */}
      <div className="content-container">
        {/* Content page 1 */}
        <div key={`page-0-${animationKey}`} className={`content ${currentPage === 0 ? 'active' : 'inactive'}`}>
          <p style={{ fontSize: 50, color: '#634e4e', textShadow: 'unset' }}>The Wedding Of</p>
          <div className="wreath-container">
            <div className="floral-wreath">
              <Image src="/flower.svg" alt="Flower decoration" width={500} height={500} className="wreath-image" />
              <div className="names-in-wreath">
                <p style={{ textShadow: 'unset' }} className="bride-name">Num</p>
                <p style={{ textShadow: 'unset' }} className="and-symbol">&</p>
                <p style={{ textShadow: 'unset' }} className="groom-name">Art</p>
              </div>
            </div>
          </div>
          <p style={{ textShadow: 'unset', paddingTop: 10, color: '#634e4e' }}>We Invite You To Celebrate Our<br />Wedding</p>
          <p style={{ textShadow: 'unset', paddingTop: 20, paddingBottom: 20, color: '#cb3740' }}>Saturday</p>
          <div className="divider-container">
            <hr className="divider-line" />
          </div>
          <p style={{ textShadow: 'unset', color: '#cb3740', paddingBottom: 5, paddingTop: 5 }}>15 - March- 2025</p>
          <div className="divider-container">
            <hr className="divider-line" />
          </div>
        </div>

        {/* Content page 2 */}
        <div key={`page-1-${animationKey}`} className={`content ${currentPage === 1 ? 'active' : 'inactive'}`}>
          <p style={{ fontSize: 30, color: '#634e4e', textShadow: 'unset' }}>We cordially invite you to<br />honor us with your presence at<br />our wedding ceremony.</p>
          <div className="wreath-container" style={{ maxWidth: '400px', marginTop: 40 }}>
            <div className="floral-wreath" style={{ height: 'unset' }}>
              <div className="names-in-wreath full-names" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <p style={{ fontSize: 30, color: '#634e4e', textShadow: 'unset', margin: 0 }} className="bride-name">Parichat Hongon</p>
                <Image src="/ring.svg" alt="Wedding Rings" width={60} height={60} className="ring-image" />
                <p style={{ fontSize: 30, color: '#634e4e', textShadow: 'unset', margin: 0 }} className="groom-name">Tassanai Yeeton</p>
              </div>
            </div>
          </div>
          <p style={{ paddingTop: 20, textShadow: 'unset', color: '#c23a50' }}>Time 08.29 am.</p>
          <p style={{ paddingTop: 20, textShadow: 'unset', color: '#634e4e' }}>Wat Ratchabophit Sathitmahasimaram Ratchaworawihan</p>
          {/* <div className="divider-container">
            <hr className="divider-line-2" />
          </div> */}
          <p style={{ paddingTop: 50, textShadow: 'unset', color: '#c23a50' }}>Time 10.29 am.</p>
          <p style={{ paddingTop: 20, textShadow: 'unset', color: '#634e4e' }}>Im En Ville</p>
        </div>
      </div>

      {/* Page indicator dots */}
      {isMounted && (
        <div className="page-indicator">
          {[0, 1].map((index) => (
            <div
              key={index}
              className={`indicator-dot ${currentPage === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}

      {/* Dev Tools RSVP Component - only visible in development mode */}
      <DevToolsRsvp />
    </div>
  );
}
