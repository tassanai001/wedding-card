/**
 * Custom hook for handling touch and keyboard navigation
 */
import { useEffect, useCallback } from 'react';
import { MIN_SWIPE_DISTANCE } from '../lib/constants';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

/**
 * Hook for handling touch and keyboard navigation
 * @param currentPage Current active page
 * @param totalPages Total number of pages
 * @param onPageChange Callback for page change
 */
export const useNavigation = ({ currentPage, totalPages, onPageChange }: NavigationProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    } else if (e.key === 'ArrowLeft' && currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handleSwipe = useCallback((touchStartX: number, touchEndX: number) => {
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      // Swipe left to go to next page
      onPageChange(currentPage + 1);
    } else if (isRightSwipe && currentPage > 0) {
      // Swipe right to go to previous page
      onPageChange(currentPage - 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  useEffect(() => {
    // Touch event handlers
    let touchStartX = 0;
    let touchEndX = 0;

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
      handleSwipe(touchStartX, touchEndX);
    };

    // Add event listeners
    const container = document.querySelector('.container');
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
    }

    // Add keyboard navigation
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleSwipe]);
};
