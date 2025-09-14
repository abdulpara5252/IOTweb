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
    title: "Revolutionary IoT Solutions",
    description:
      "Transform your operations with cutting-edge Wireless/Wired Remote Monitoring & Control systems. Experience the future of industrial automation with iTech Innovations.",
  },
  {
    image: "/assets/images/MainBanner.jpg",
    aiHint: "iot devices",
    title: "Smart Connected World",
    description:
      "Complete end-to-end IoT solutions for Oil & Gas, Water, Power, and Utility sectors. Connect, monitor, and control your assets with unprecedented efficiency.",
  },
  {
    image: "/assets/images/MainBanner.jpg",
    aiHint: "iot devices",
    title: "Innovation Meets Reliability",
    description:
      "Trusted by industry leaders worldwide. Our advanced SCADA & Automation solutions deliver real-time insights and seamless control for critical operations.",
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto px-4 text-center text-white">
                    <div className="max-w-5xl mx-auto">
                      <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-headline mb-6 leading-tight drop-shadow-2xl bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                      {slide.title}
                    </h1>
                      <p className="text-lg md:text-xl lg:text-2xl text-slate-200 mb-10 max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
                      {slide.description}
                    </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                          <Link href="/product">Explore Solutions</Link>
                      </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105">
                          <Link href="/contact">Get Free Consultation</Link>
                      </Button>
                      </div>
                      <div className="flex justify-center items-center gap-8 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span>Real-time Monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span>Smart Analytics</span>
                        </div>
                      </div>
                    </div>
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
