"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    title: "Smart Home Hub",
    description: "Unify all your smart devices with our central hub. Control lighting, temperature, and security with a single tap.",
    image: "https://placehold.co/600x400.png",
    aiHint: "smart home"
  },
  {
    title: "Industrial Sensors",
    description: "Monitor your operations in real-time with our durable and precise industrial IoT sensors. Prevent downtime and optimize efficiency.",
    image: "https://placehold.co/600x400.png",
    aiHint: "industrial sensors"
  },
  {
    title: "Connected Agriculture",
    description: "Transform your farming with data-driven insights. Our sensors monitor soil moisture, crop health, and weather conditions.",
    image: "https://placehold.co/600x400.png",
    aiHint: "smart agriculture"
  },
  {
    title: "Wearable Tech",
    description: "Stay connected on the go. Our wearables track fitness, manage notifications, and integrate seamlessly with your digital life.",
    image: "https://placehold.co/600x400.png",
    aiHint: "wearable technology"
  },
];

export default function ProductCarousel() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Applications Across Industries
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our IoT platform is versatile, powerful, and ready to adapt to your unique needs.
          </p>
        </div>
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
          className="w-full"
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                       <div className="aspect-video relative mb-4">
                         <Image
                           src={feature.image}
                           alt={feature.title}
                           fill
                           className="rounded-t-lg object-cover"
                           data-ai-hint={feature.aiHint}
                         />
                       </div>
                      <CardTitle className="font-headline">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
