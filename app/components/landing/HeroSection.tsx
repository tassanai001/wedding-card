/**
 * Hero section component with Pinterest-inspired masonry grid
 */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryItemProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

/**
 * Individual gallery item component with hover effect
 */
const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt, width, height, priority = false }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl group">
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center p-4">
        <span className="text-white font-pompiere text-xl mb-2">Explore Gallery</span>
        <button className="bg-primary text-white px-4 py-2 rounded-full font-pompiere text-lg hover:bg-primary-dark transition-colors duration-300">
          View
        </button>
      </div>
    </div>
  );
};

/**
 * Hero section with masonry grid layout
 */
export default function HeroSection() {
  // Using the existing fallback image with different aspect ratios to simulate a masonry grid
  const galleryItems = [
    { src: '/images/fallback-image.png', alt: 'Wedding Photo 1', width: 600, height: 800 },
    { src: '/images/fallback-image.png', alt: 'Wedding Photo 2', width: 600, height: 600 },
    { src: '/images/fallback-image.png', alt: 'Wedding Photo 3', width: 600, height: 900 },
    { src: '/images/fallback-image.png', alt: 'Wedding Photo 4', width: 600, height: 700 },
    { src: '/images/fallback-image.png', alt: 'Wedding Photo 5', width: 600, height: 800 },
    { src: '/images/fallback-image.png', alt: 'Wedding Photo 6', width: 600, height: 600 },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-light/20 to-primary/30 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-corinthia text-primary mb-4">
            Num & Art
          </h1>
          <p className="text-xl md:text-2xl font-pompiere text-secondary mb-2">
            We&apos;re getting married on
          </p>
          <p className="text-2xl md:text-3xl font-pompiere text-primary font-bold">
            March 15, 2025
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl font-pompiere text-secondary max-w-2xl mx-auto">
            Explore our journey together through our photo gallery and join us on our special day
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <div key={`gallery-item-${index}`} className={`${
              // Apply different heights to create masonry effect
              index % 3 === 0 ? 'h-[300px]' : 
              index % 3 === 1 ? 'h-[250px]' : 'h-[350px]'
            }`}>
              <GalleryItem 
                src={item.src} 
                alt={item.alt} 
                width={item.width} 
                height={item.height}
                priority={index < 3} // Load first 3 images with priority
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/gallery" className="inline-block bg-primary hover:bg-primary-dark text-white font-pompiere text-xl px-8 py-3 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg">
            Explore Full Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
