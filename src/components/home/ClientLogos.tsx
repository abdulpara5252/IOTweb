"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import type React from 'react';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface Logo {
  id: number;
  name: string;
  originalSrc: string;
  enhancedSrc: string | null;
  isEnhancing: boolean;
}

const initialLogos: Omit<Logo, 'enhancedSrc' | 'isEnhancing'>[] = [
  { id: 1, name: "Reliance Industries", originalSrc: "/assets/images/Reliance.png" },
  { id: 2, name: "Mahanagar Gas", originalSrc: "/assets/images/Mahanagar.png" },
  { id: 3, name: "Indian Oil", originalSrc: "/assets/images/indian_oil.png" },
  { id: 4, name: "Indraprastha Gas", originalSrc: "/assets/images/Igl.png" },
  { id: 5, name: "Hindustan Petroleum", originalSrc: "/assets/images/HP.png" },
  { id: 6, name: "Gujarat Gas", originalSrc: "/assets/images/gujarat_gas.png" },
  { id: 7, name: "GAIL", originalSrc: "/assets/images/Gail.png" },
  { id: 8, name: "Corrtech International", originalSrc: "/assets/images/corrtech_international.png" },
  { id: 9, name: "Abdulla Fouad", originalSrc: "/assets/images/Abdulla_Fouad.png" },
];

const urlToDataUri = async (url: string): Promise<string> => {
  // For local images, we can return the URL directly as it's already a valid path
  if (url.startsWith('/')) {
    return url;
  }
  
  // For external URLs, convert to data URI
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export default function ClientLogos() {
  const [logos, setLogos] = useState(
    initialLogos.map(logo => ({
      ...logo,
      enhancedSrc: null,
      isEnhancing: false
    }))
  );
  const [isEnhancingAll, setIsEnhancingAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set<number>());
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  // const handleEnhanceLogos = async () => {
  //   setIsEnhancingAll(true);
  //   setLogos(logos => logos.map(l => ({ ...l, isEnhancing: true })));
    
  //   // Simulate enhancement
  //   setTimeout(() => {
  //     setLogos(logos => logos.map(l => ({ 
  //       ...l, 
  //       isEnhancing: false,
  //       enhancedSrc: l.originalSrc // In real app, this would be the enhanced version
  //     })));
  //     setIsEnhancingAll(false);
  //   }, 2000);
  // };

  // Duplicate logos for seamless scrolling
  const logosToDisplay = useMemo(() => [...logos, ...logos, ...logos], [logos]);

  // Auto-scroll effect
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current as HTMLDivElement;

    let lastTime = performance.now();
    const baseSpeed = 30; // pixels per second
    const hoverSpeed = 10; // slower when hovered
    
    const animate = (currentTime: number) => {
      if (isPaused || isDraggingRef.current || isEnhancingAll) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;
      
      const speed = isHovered ? hoverSpeed : baseSpeed;
      const scrollAmount = speed * deltaTime;
      
      // Get the actual scroll width of one set of logos
      const singleSetWidth = container.scrollWidth / 3;
      
      // Update scroll position
      scrollPositionRef.current += scrollAmount;
      
      // Reset scroll position for seamless loop
      if (scrollPositionRef.current >= singleSetWidth) {
        scrollPositionRef.current -= singleSetWidth;
      }
      
      container.scrollLeft = scrollPositionRef.current;
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, isPaused, isEnhancingAll]);

  // Mouse handlers for drag functionality
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current as HTMLDivElement;
    
    isDraggingRef.current = true;
    dragStartXRef.current = e.pageX - container.offsetLeft;
    dragStartScrollRef.current = container.scrollLeft;
    scrollPositionRef.current = container.scrollLeft;
    container.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current as HTMLDivElement;
    
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.5;
    const newScrollLeft = dragStartScrollRef.current - walk;
    container.scrollLeft = newScrollLeft;
    scrollPositionRef.current = newScrollLeft;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current as HTMLDivElement;
    container.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    isDraggingRef.current = false;
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current as HTMLDivElement;
    container.style.cursor = 'grab';
  };

  // Manual scroll functions
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current as HTMLDivElement;
    
    setIsPaused(true);
    const newScrollLeft = Math.max(0, container.scrollLeft - 240);
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    scrollPositionRef.current = newScrollLeft;
    
    setTimeout(() => setIsPaused(false), 1000);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current as HTMLDivElement;
    
    setIsPaused(true);
    const newScrollLeft = container.scrollLeft + 240;
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    scrollPositionRef.current = newScrollLeft;
    
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            Trusted Partners
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 text-white">
            <span className="neon-text">Trusted by</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We partner with leading energy and industrial companies worldwide to deliver innovative IoT solutions 
            that transform operations and drive success.
          </p>
          
          {/* <button
            onClick={handleEnhanceLogos}
            disabled={isEnhancingAll}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            {isEnhancingAll ? 'Enhancing...' : 'Enhance All Logos'}
          </button> */}
        </div>

        <div className="relative group">
          {/* Left Arrow Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-accent hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>

          {/* Right Arrow Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-accent hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
            onClick={scrollRight}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>

          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-hidden cursor-grab select-none"
            style={{
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div className="flex gap-6 py-4">
              {logosToDisplay.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex-shrink-0 w-48 h-32 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 iot-card-glow border border-slate-700/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300 data-stream"
                >
                  {logo.isEnhancing ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
                  ) : imageErrors.has(logo.id) ? (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                      {logo.name}
                    </div>
                  ) : (
                    <img
                      src={logo.enhancedSrc || logo.originalSrc}
                      alt={`${logo.name} logo`}
                      className="object-contain w-auto h-auto max-h-20 max-w-40"
                      onError={() => {
                        setImageErrors(prev => new Set(prev).add(logo.id));
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}