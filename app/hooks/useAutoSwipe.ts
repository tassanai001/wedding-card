/**
 * Custom hook for auto-swiping functionality
 */
import { useEffect, useRef, useCallback } from 'react';
import { PAGE_TRANSITION_DURATION } from '../lib/constants';

interface AutoSwipeProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  enabled?: boolean;
}

/**
 * Hook for handling automatic page transitions
 * @param currentPage Current active page
 * @param totalPages Total number of pages
 * @param onPageChange Callback for page change
 * @param enabled Whether auto-swiping is enabled (default: true)
 */
export const useAutoSwipe = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  enabled = true 
}: AutoSwipeProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the auto-swipe timer
  const startAutoSwipeTimer = useCallback(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Only set timer if enabled
    if (!enabled) return;

    // Set a new timer for the transition duration
    timerRef.current = setTimeout(() => {
      // Move to the next page, or back to the first page if we're at the end
      const nextPage = (currentPage + 1) % totalPages;
      onPageChange(nextPage);
    }, PAGE_TRANSITION_DURATION);
  }, [currentPage, enabled, totalPages, onPageChange]);

  // Reset timer when page changes or component mounts
  useEffect(() => {
    startAutoSwipeTimer();

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentPage, enabled, totalPages, startAutoSwipeTimer]); // Include startAutoSwipeTimer in dependencies

  // Return function to manually restart timer
  return { restartAutoSwipeTimer: startAutoSwipeTimer };
};
