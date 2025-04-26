/**
 * Landing page component for the wedding card
 * Implements a Pinterest-inspired hero layout with masonry grid
 */
import React from 'react';
import HeroSection from './HeroSection';
import VideoBackground from '../ui/VideoBackground';
import RsvpButton from '../rsvp/RsvpButton';

/**
 * Landing page component with Pinterest-inspired hero layout
 * Serves as the entry point to the wedding card application
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Video with reduced opacity */}
      <div className="absolute inset-0 z-0 opacity-40">
        <VideoBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
      </div>
      
      {/* RSVP Button */}
      <RsvpButton />
    </div>
  );
}
