"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { enhanceLogoClarity } from '@/ai/flows/enhance-logo-clarity';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

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
  const [logos, setLogos] = useState<Logo[]>(
    initialLogos.map(logo => ({ ...logo, enhancedSrc: null, isEnhancing: false }))
  );
  const [isEnhancingAll, setIsEnhancingAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleEnhanceLogos = async () => {
    setIsEnhancingAll(true);
    setLogos(logos => logos.map(l => ({ ...l, isEnhancing: true })));

    toast({
      title: "Enhancing Logos",
      description: "AI is working its magic. Please wait...",
    });

    let successCount = 0;
    const enhancementPromises = logos.map(async (logo) => {
      try {
        const logoDataUri = await urlToDataUri(logo.originalSrc);
        const result = await enhanceLogoClarity({ logoDataUri });
        setLogos(prevLogos =>
          prevLogos.map(l =>
            l.id === logo.id ? { ...l, enhancedSrc: result.enhancedLogoDataUri, isEnhancing: false } : l
          )
        );
        successCount++;
      } catch (error) {
        console.error(`Failed to enhance logo for ${logo.name}:`, error);
        setLogos(prevLogos =>
          prevLogos.map(l =>
            l.id === logo.id ? { ...l, isEnhancing: false } : l
          )
        );
      }
    });

    await Promise.all(enhancementPromises);
    
    setIsEnhancingAll(false);
    toast({
      title: "Enhancement Complete",
      description: `${successCount} out of ${logos.length} logos were successfully enhanced.`,
      variant: successCount < logos.length ? 'destructive' : 'default'
    });
  };

  const logosToDisplay = useMemo(() => [...logos, ...logos], [logos]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-10 md:py-28 bg-card overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with leading energy and industrial companies to deliver innovative IoT solutions.
          </p>
         
        </div>
        
        <div className="relative group">
          {/* Left Arrow Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-accent hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
            onClick={scrollLeft}
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

          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-hidden overflow-y-hidden max-w-full relative group/scroll"
            style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className={cn(
                "flex gap-8 max-w-full overflow-x-hidden overflow-y-hidden",
                "animate-scroll",
                isEnhancingAll && "paused",
                isHovered && "animate-scroll-slow"
              )}
            >
              {logosToDisplay.map((logo, index) => (
                <div 
                  key={`${logo.id}-${index}`} 
                  className="flex-shrink-0 w-48 h-32 flex items-center justify-center bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group/item"
                >
                  {logo.isEnhancing ? (
                    <Skeleton className="w-full h-full" />
                  ) : imageErrors.has(logo.id) ? (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm group-hover/item:text-gray-700 transition-colors">
                      {logo.name}
                    </div>
                  ) : (
                    <Image
                      src={logo.enhancedSrc || logo.originalSrc}
                      alt={`${logo.name} logo`}
                      width={180}
                      height={100}
                      className="object-contain w-auto h-auto max-h-20 max-w-40 group-hover/item:scale-110 transition-transform duration-300"
                      data-ai-hint="company logo"
                      onError={(e) => {
                        console.error(`Failed to load image: ${logo.originalSrc}`, e);
                        setImageErrors(prev => new Set(prev).add(logo.id));
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded image: ${logo.originalSrc}`);
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
