/**
 * RSVP Button component for toggling the RSVP form
 */
import { useState, useEffect } from 'react';
import RsvpForm from './RsvpForm';

/**
 * Component for displaying the RSVP button and form modal
 */
export default function RsvpButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // Register keyboard shortcut (Alt+R) to toggle RSVP form
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'r') {
        e.preventDefault();
        setIsFormOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* RSVP Toggle Button */}
      <button
        onClick={() => setIsFormOpen(prev => !prev)}
        className="fixed bottom-5 right-5 z-50 bg-[#c23a50] text-white border-none rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer shadow-md text-xs font-bold"
        aria-label="Open RSVP form"
      >
        RSVP
      </button>

      {/* RSVP Form Modal */}
      {isFormOpen && (
        <div className="fixed bottom-20 right-5 w-[350px] bg-white rounded-lg shadow-lg z-50 p-5 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="m-0 text-[#634e4e] text-xl">Response to Wedding Invitation</h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="bg-transparent border-none cursor-pointer text-xl text-gray-500"
              aria-label="Close RSVP form"
            >
              ×
            </button>
          </div>
          <div className="mb-2">
            <small className="text-gray-600"></small>
          </div>
          <div className="py-2">
            <RsvpForm />
          </div>
          <div className="mt-4 text-xl text-gray-500">
            Thank you! We look forward to seeing you.
          </div>
        </div>
      )}
    </>
  );
}
