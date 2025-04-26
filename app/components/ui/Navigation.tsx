/**
 * Navigation component for switching between landing page and wedding card
 */
import React from 'react';

interface NavigationProps {
  currentView: 'landing' | 'card';
  onViewChange: (view: 'landing' | 'card') => void;
}

/**
 * Navigation component that allows switching between landing page and wedding card views
 * @param currentView Current active view ('landing' or 'card')
 * @param onViewChange Callback function when view is changed
 */
export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
      {/* Logo/Title */}
      <div className="text-white">
        <h1 className="font-corinthia text-2xl md:text-3xl">Num & Art</h1>
      </div>
      
      {/* Navigation Links */}
      <div className="flex gap-4">
        <button 
          onClick={() => onViewChange('landing')}
          className={`px-4 py-1 rounded-full text-white font-pompiere text-lg transition-all duration-300 ${
            currentView === 'landing' 
              ? 'bg-primary' 
              : 'bg-black/30 hover:bg-black/50'
          }`}
        >
          Gallery
        </button>
        <button 
          onClick={() => onViewChange('card')}
          className={`px-4 py-1 rounded-full text-white font-pompiere text-lg transition-all duration-300 ${
            currentView === 'card' 
              ? 'bg-primary' 
              : 'bg-black/30 hover:bg-black/50'
          }`}
        >
          Invitation
        </button>
      </div>
    </div>
  );
}
