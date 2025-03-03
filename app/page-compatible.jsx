"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  // Client-side only code
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const videoRef = useRef(null);
  const autoSwipeTimerRef = useRef(null);

  // Function to restart the video
  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Function to change page with video restart
  const changePage = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      restartVideo();
      
      // Reset the auto-swipe timer whenever page changes manually
      if (autoSwipeTimerRef.current) {
        clearTimeout(autoSwipeTimerRef.current);
      }
      
      // Set a new auto-swipe timer if we're on page 0
      if (newPage === 0) {
        startAutoSwipeTimer();
      }
    }
  };

  // Function to start the auto-swipe timer
  const startAutoSwipeTimer = () => {
    // Clear any existing timer
    if (autoSwipeTimerRef.current) {
      clearTimeout(autoSwipeTimerRef.current);
    }
    
    // Set a new timer for 10 seconds
    autoSwipeTimerRef.current = setTimeout(function() {
      if (currentPage === 0) {
        changePage(1);
      }
    }, 10000); // 10 seconds
  };

  // Initialize on client-side only
  useEffect(function() {
    setIsMounted(true);

    // Touch event handlers
    var touchStartX = 0;
    var touchEndX = 0;
    var minSwipeDistance = 50;

    var handleTouchStart = function(e) {
      touchStartX = e.changedTouches[0].screenX;
    };

    var handleTouchEnd = function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    // Handle swipe logic
    var handleSwipe = function() {
      var distance = touchStartX - touchEndX;
      var isLeftSwipe = distance > minSwipeDistance;
      var isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe && currentPage < 1) {
        // Swipe left to go to next page
        changePage(1);
      } else if (isRightSwipe && currentPage > 0) {
        // Swipe right to go to previous page
        changePage(0);
      }
    };

    // Add event listeners
    var container = document.querySelector('.container');
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
    }

    // Optional: Add keyboard navigation
    var handleKeyDown = function(e) {
      if (e.key === 'ArrowRight' && currentPage < 1) {
        changePage(1);
      } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        changePage(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Start the auto-swipe timer when component mounts
    if (currentPage === 0) {
      startAutoSwipeTimer();
    }

    // Cleanup
    return function() {
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
  var handleDotClick = function(index) {
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
        <div className={"content " + (currentPage === 0 ? 'active' : 'inactive')}>
          <p>The Wedding Of</p>
          <p style={{ paddingTop: 64 }}>Num</p>
          <p>&</p>
          <p>Art</p>
          <p style={{ paddingTop: 64 }}>We Invite You To Celebrate Our Wedding</p>
          <p style={{ paddingTop: 64 }}>Saturday</p>
          <p style={{ paddingTop: 64 }}>15 - March- 2025</p>
        </div>

        {/* Content page 2 */}
        <div className={"content " + (currentPage === 1 ? 'active' : 'inactive')}>
          <p style={{ paddingTop: 64 }}>The Wedding Of</p>
          <p style={{ paddingTop: 64 }}>Num</p>
          <p>&</p>
          <p>Art</p>
          <p style={{ paddingTop: 64 }}>We Invite You To Celebrate Our Wedding</p>
          <p style={{ paddingTop: 64 }}>Saturday</p>
          <p style={{ paddingTop: 64 }}>15 - March- 2025</p>
        </div>
      </div>

      {/* Page indicator dots */}
      {isMounted && (
        <div className="page-indicator">
          <div
            className={"indicator-dot " + (currentPage === 0 ? 'active' : '')}
            onClick={function() { handleDotClick(0); }}
          />
          <div
            className={"indicator-dot " + (currentPage === 1 ? 'active' : '')}
            onClick={function() { handleDotClick(1); }}
          />
        </div>
      )}
    </div>
  );
}
