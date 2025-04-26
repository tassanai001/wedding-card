/**
 * Wedding page component for displaying wedding information
 */
import React from 'react';
import Image from 'next/image';
import {
  BRIDE_NAME,
  GROOM_NAME,
  BRIDE_FULL_NAME,
  GROOM_FULL_NAME,
  WEDDING_DATE,
  CEREMONY_TIME,
  CEREMONY_LOCATION,
  CEREMONY_LOCATION_URL,
  RING_CEREMONY_TIME,
  DINING_TIME,
  RECEPTION_LOCATION,
  RECEPTION_LOCATION_URL,
  FLOWER_SVG_PATH,
  RING_SVG_PATH
} from '../../lib/constants';

interface WeddingPageProps {
  pageIndex: number;
  currentPage: number;
  animationKey: number;
}

/**
 * Component for displaying wedding information pages
 * @param pageIndex Index of this page
 * @param currentPage Current active page
 * @param animationKey Key for animation reset
 */
export default function WeddingPage({ pageIndex, currentPage, animationKey }: WeddingPageProps) {
  const isActive = pageIndex === currentPage;

  // First page content - Wedding announcement
  if (pageIndex === 0) {
    return (
      <div 
        key={`page-${pageIndex}-${animationKey}`} 
        className={`content ${isActive ? 'active' : 'inactive'}`}
      >
        <p className="text-5xl text-secondary font-normal">The Wedding Of</p>
        <div className="wreath-container">
          <div className="floral-wreath">
            <Image src={FLOWER_SVG_PATH} alt="Flower decoration" width={500} height={500} className="wreath-image" />
            <div className="names-in-wreath">
              <p className="bride-name font-corinthia text-4xl" style={{ textShadow: 'unset' }}>{BRIDE_NAME}</p>
              <p className="and-symbol font-corinthia text-3xl -m-9" style={{ textShadow: 'unset' }}>&</p>
              <p className="groom-name font-corinthia text-4xl" style={{ textShadow: 'unset' }}>{GROOM_NAME}</p>
            </div>
          </div>
        </div>
        <p className="pt-2 text-secondary" style={{ textShadow: 'unset' }}>
          We Invite You To Celebrate Our<br />Wedding
        </p>
        <p className="pt-5 pb-5 text-primary" style={{ textShadow: 'unset' }}>Saturday</p>
        <div className="divider-container">
          <hr className="divider-line" />
        </div>
        <p className="py-1 text-primary" style={{ textShadow: 'unset' }}>{WEDDING_DATE}</p>
        <div className="divider-container">
          <hr className="divider-line" />
        </div>
      </div>
    );
  }

  // Second page content - Venue and schedule details
  return (
    <div 
      key={`page-${pageIndex}-${animationKey}`} 
      className={`content ${isActive ? 'active' : 'inactive'}`}
    >
      <p className="text-3xl text-secondary" style={{ textShadow: 'unset' }}>
        We cordially invite you to<br />honor us with your presence at<br />our wedding ceremony.
      </p>
      <div className="wreath-container max-w-[400px] mt-10">
        <div className="floral-wreath h-auto">
          <div className="names-in-wreath full-names flex flex-row items-center justify-center gap-2">
            <p className="bride-name text-3xl text-secondary m-0" style={{ textShadow: 'unset' }}>{BRIDE_FULL_NAME}</p>
            <Image src={RING_SVG_PATH} alt="Wedding Rings" width={60} height={60} className="ring-image" />
            <p className="groom-name text-3xl text-secondary m-0" style={{ textShadow: 'unset' }}>{GROOM_FULL_NAME}</p>
          </div>
        </div>
      </div>
      <p className="pt-6 text-primary text-2xl" style={{ textShadow: 'unset' }}>{CEREMONY_TIME}</p>
      <div
        className="pt-6 flex items-center justify-center gap-1 cursor-pointer"
        onClick={() => window.open(CEREMONY_LOCATION_URL, '_blank')}
      >
        <p className="flex text-secondary text-2xl m-0" style={{ textShadow: 'unset' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#c23a50"
            className="mr-1 animate-bounce"
          >
            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
          </svg>
          {CEREMONY_LOCATION}
        </p>
      </div>

      <div className="pt-6 flex justify-center gap-5">
        <p className="text-secondary m-0 text-2xl" style={{ textShadow: 'unset' }}>
          <span className="text-primary text-2xl" style={{ textShadow: 'unset' }}>{RING_CEREMONY_TIME}</span><br />Ring ceremony
        </p>
        <p className="text-secondary m-0 text-2xl" style={{ textShadow: 'unset' }}>
          <span className="text-primary text-2xl" style={{ textShadow: 'unset' }}>{DINING_TIME}</span><br />Meal/Dining
        </p>
      </div>
      <div
        className="pt-6 flex items-center justify-center gap-1 cursor-pointer"
        onClick={() => window.open(RECEPTION_LOCATION_URL, '_blank')}
      >
        <p className="flex text-secondary text-2xl m-0" style={{ textShadow: 'unset' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#c23a50"
            className="mr-1 animate-bounce"
          >
            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
          </svg>
          {RECEPTION_LOCATION}
        </p>
      </div>
    </div>
  );
}
