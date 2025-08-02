import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary mb-4 leading-tight">
              Connect Your World with IOTech
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Experience seamless integration and intelligent automation. Our
              cutting-edge IoT solutions are designed for reliability,
              scalability, and a smarter tomorrow.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Button asChild size="lg">
                <Link href="/product">Discover Our Product</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Request a Demo</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-full w-full">
            <Image
              src="https://placehold.co/800x600.png"
              alt="IoT devices connected"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
              data-ai-hint="iot devices"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
