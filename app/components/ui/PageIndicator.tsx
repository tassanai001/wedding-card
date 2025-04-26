/**
 * Page indicator component for navigation dots
 */
import React from 'react';

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Component for displaying navigation dots and handling page changes
 * @param currentPage Current active page
 * @param totalPages Total number of pages
 * @param onPageChange Callback for page change
 */
export default function PageIndicator({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PageIndicatorProps) {
  return (
    <div className="page-indicator">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`indicator-dot ${currentPage === index ? 'active' : ''}`}
          onClick={() => onPageChange(index)}
          role="button"
          aria-label={`Go to page ${index + 1}`}
          tabIndex={0}
        />
      ))}
    </div>
  );
}
