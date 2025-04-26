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
          <p style={{ fontSize: 50, color: '#634e4e', textShadow: 'unset', fontWeight: 'normal' }}>The Wedding Of</p>
          <div className="wreath-container">
            <div className="floral-wreath">
              <Image src="/flower.svg" alt="Flower decoration" width={500} height={500} className="wreath-image" />
              <div className="names-in-wreath">
                <p style={{ textShadow: 'unset', fontFamily: "'Corinthia', cursive", fontSize: '4em' }} className="bride-name">Num</p>
                <p style={{ textShadow: 'unset', fontFamily: "'Corinthia', cursive", fontSize: '3em', margin: -35 }} className="and-symbol">&</p>
                <p style={{ textShadow: 'unset', fontFamily: "'Corinthia', cursive", fontSize: '4em' }} className="groom-name">Art</p>
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
          <p style={{ paddingTop: 25, textShadow: 'unset', color: '#c23a50', fontSize: 25 }}>08.29 am.</p>
          <div
            style={{
              paddingTop: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: 'pointer'
            }}
            onClick={() => window.open('https://www.google.com/maps/place/Wat+Ratchabophit+Sathitmahasimaram+Ratchaworawihan/@13.7492388,100.4951842,17z/data=!4m12!1m5!3m4!2zMTPCsDQ0JzU3LjMiTiAxMDDCsDI5JzUxLjkiRQ!8m2!3d13.7492388!4d100.4977591!3m5!1s0x30e2991039598b6b:0xeaf539e28e042574!8m2!3d13.7491085!4d100.497346!16s%2Fm%2F0czbx1x?entry=ttu&g_ep=EgoyMDI1MDMwMy4wIKXMDSoASAFQAw%3D%3D', '_blank')}
          >

            <p style={{ display: 'flex', textShadow: 'unset', color: '#634e4e', fontSize: 25, margin: 0 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#c23a50"
                style={{
                  marginRight: '5px',
                  animation: 'bounce 1.5s infinite'
                }}
              >
                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
              </svg>              Wat Ratchabophit Sathitmahasimaram<br /> Ratchaworawihan
            </p>
          </div>

          <div style={{ paddingTop: 25, display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <p style={{ textShadow: 'unset', color: '#634e4e', margin: 0, fontSize: 25 }}> <span style={{ textShadow: 'unset', margin: 0, fontSize: 25, color: '#c23a50' }}>10:19 am.</span><br />Ring ceremony</p>
            <p style={{ textShadow: 'unset', color: '#634e4e', margin: 0, fontSize: 25 }}><span style={{ textShadow: 'unset', margin: 0, fontSize: 25, color: '#c23a50' }}>11:00 am.</span><br />Meal/Dining</p>
          </div>
          <div
            style={{
              paddingTop: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: 'pointer'
            }}
            onClick={() => window.open('https://www.google.com/maps?sca_esv=c01db97a3680db60&output=search&q=Im+En+Ville+Restaurant&source=lnms&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBq9_MDeSwocf8-rceDq6x_7NGDnggjwWSPxogjVTDBxgDN1PA_BcNa_Vr-u013PwbF80s5SF0SK-mdfjluGcYGgi_TP3dDiwczzfW4jorqyam5OjeervCJvJ_NQaBy0VIm5iWp6VDKIg81HteTb204L8EEGiNGVNSvLV02M_7FPfvv2ISw&entry=mc&ved=1t:200715&ictx=111', '_blank')}
          >
            <p style={{ display: 'flex', textShadow: 'unset', color: '#634e4e', fontSize: 25, margin: 0 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#c23a50"
                style={{
                  marginRight: '5px',
                  animation: 'bounce 1.5s infinite'
                }}
              >
                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
              </svg>Im En Ville Restaurant
            </p>
          </div>
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