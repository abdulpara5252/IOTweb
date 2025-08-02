"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
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
  { id: 1, name: "TechCorp", originalSrc: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Innovate Inc.", originalSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Global Solutions", originalSrc: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80" },
  { id: 4, name: "NextGen", originalSrc: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=300&q=80" },
  { id: 5, name: "Future Systems", originalSrc: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=300&q=80" },
  { id: 6, name: "Quantum Leap", originalSrc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80" },
  { id: 7, name: "Pioneer", originalSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
  { id: 8, name: "Synergy", originalSrc: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80" },
];

const urlToDataUri = async (url: string): Promise<string> => {
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

  return (
    <section className="py-10 md:py-28 bg-card overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with innovative companies to build the future.
          </p>
        </div>
        
        <div className="w-full overflow-x-hidden overflow-y-hidden max-w-full" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"}}>
          <div className={cn("flex gap-8 animate-scroll max-w-full overflow-x-hidden overflow-y-hidden", isEnhancingAll && "paused")}>
            {logosToDisplay.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-background rounded-lg p-4 shadow-sm">
                {logo.isEnhancing ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <Image
                    src={logo.enhancedSrc || logo.originalSrc}
                    alt={`${logo.name} logo`}
                    width={150}
                    height={75}
                    className="object-contain"
                    data-ai-hint="company logo"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" onClick={handleEnhanceLogos} disabled={isEnhancingAll}>
            <Sparkles className="mr-2 h-5 w-5" />
            {isEnhancingAll ? "Enhancing..." : "Enhance Logos with AI"}
          </Button>
          <p className="text-sm mt-2 text-muted-foreground">See our AI improve logo clarity for better display.</p>
        </div>
      </div>
    </section>
  );
}
