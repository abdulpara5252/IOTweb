"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "/assets/images/MainBanner.jpg",
    aiHint: "iot devices",
    title: "",
    description:
      "",
  },
  {
    image: "/assets/images/MainBanner.jpg",
    aiHint: "iot devices",
    title: "",
    description:
      "",
  },
  {
    image: "/assets/images/MainBanner.jpg",
    aiHint: "iot devices",
    title: "",
    description:
      "",
  },
];


export default function HeroCarousel() {
  return (
    <section className="relative w-full overflow-x-hidden max-w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        className="w-full max-w-full overflow-x-hidden"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover relative z-10"
                  data-ai-hint={slide.aiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-3xl mx-auto drop-shadow-md">
                      {slide.description}
                    </p>
                    {/* <div className="flex justify-center gap-4">
                      <Button asChild size="lg">
                        <Link href="/product">Discover Our Product</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                        <Link href="/contact">Request a Demo</Link>
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex" />
      </Carousel>
    </section>
  );
}
