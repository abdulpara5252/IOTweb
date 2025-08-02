import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Zap, Wifi, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Low Power Consumption",
    description: "Optimized for long battery life, perfect for remote deployments.",
  },
  {
    icon: Wifi,
    title: "Multi-Protocol Support",
    description: "Connects via Wi-Fi, Bluetooth, LoRaWAN, and Cellular networks.",
  },
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "Your data is secured from the sensor to the cloud with AES-256.",
  },
];

export default function ProductPage() {
  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl mb-4">
              <Image
                src="https://placehold.co/800x800.png"
                alt="Main product image of IOTech Hub"
                fill
                priority
                className="object-cover"
                data-ai-hint="iot hub"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer">
                  <Image
                    src={`https://placehold.co/200x200.png`}
                    alt={`Product thumbnail ${i}`}
                    fill
                    className="object-cover"
                    data-ai-hint="product detail"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-primary uppercase">IOT-H-001</span>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mt-2 mb-4">
              IOTech Smart Hub
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              The IOTech Smart Hub is the central nervous system for your IoT ecosystem. It provides robust connectivity, powerful local processing, and seamless cloud integration for all your devices. Discover how our innovative technology can be applied.
            </p>

            <div className="mt-12">
              <h3 className="text-xl font-bold font-headline mb-4">Key Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-lg">
                    <feature.icon className="h-8 w-8 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-headline text-lg">Technical Specifications</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                      <li>Processor: Quad-core ARM Cortex-A53 @ 1.8GHz</li>
                      <li>Memory: 2GB LPDDR4 RAM</li>
                      <li>Storage: 16GB eMMC Flash</li>
                      <li>Connectivity: Dual-band 802.11ac Wi-Fi, Bluetooth 5.0, Gigabit Ethernet</li>
                      <li>Operating Temperature: -20°C to 60°C</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-headline text-lg">What's in the box?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                      <li>IOTech Smart Hub</li>
                      <li>12V/2A Power Adapter</li>
                      <li>Ethernet Cable (1m)</li>
                      <li>Quick Start Guide</li>
                      <li>Wall Mounting Kit</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                  <AccordionTrigger className="font-headline text-lg">Innovative Use Cases</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Our Smart Hub is designed for versatility. It can be integrated into smart home automation for controlling lights and security, in industrial settings for monitoring machinery, or in agricultural applications to track environmental conditions. Its powerful processing and multi-protocol support make it the ideal backbone for any innovative IoT project.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
