"use client";

import { useState, useEffect } from 'react';
import RsvpForm from './RsvpForm';

export default function DevToolsRsvp() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  // Only show in development environment
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Register keyboard shortcut (Alt+R) to toggle dev tools
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'r') {
        e.preventDefault();
        setIsDevToolsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isDev) return null;

  return (
    <>
      {/* Dev Tools Toggle Button */}
      <button
        onClick={() => setIsDevToolsOpen(prev => !prev)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: '#c23a50',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        RSVP
      </button>

      {/* Dev Tools Panel */}
      {isDevToolsOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            zIndex: 9999,
            padding: '20px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ margin: 0, color: '#634e4e', fontSize: '20px' }}>Response to Wedding Invitation</h2>
            <button
              onClick={() => setIsDevToolsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#888'
              }}
            >
              ×
            </button>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <small style={{ color: '#666' }}>

            </small>
          </div>
          <div style={{ padding: '10px 0' }}>
            <RsvpForm />
          </div>
          <div style={{ marginTop: '15px', fontSize: '20px', color: '#888' }}>
            Thank you! We look forward to seeing you.
          </div>
        </div>
      )}
    </>
  );
}
