

"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Zap, Wifi, Shield, Thermometer, Droplets, Tractor, Factory } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: {
    src: string;
    alt: string;
    aiHint: string;
  };
  features: ProductFeature[];
  specs: string[];
  useCases: string;
}

const products: Product[] = [
  {
    id: "iot-hub-001",
    name: "IOTech Smart Hub",
    tagline: "The Central Nervous System for Your IoT Ecosystem",
    description: "The IOTech Smart Hub provides robust connectivity, powerful local processing, and seamless cloud integration for all your devices. It's the reliable backbone for any smart project.",
    image: {
      src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      alt: "IOTech Smart Hub",
      aiHint: "iot hub",
    },
    features: [
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
    ],
    specs: [
      "Processor: Quad-core ARM Cortex-A53 @ 1.8GHz",
      "Memory: 2GB LPDDR4 RAM",
      "Storage: 16GB eMMC Flash",
      "Connectivity: Dual-band 802.11ac Wi-Fi, Bluetooth 5.0, Gigabit Ethernet",
      "Operating Temperature: -20°C to 60°C",
    ],
    useCases:
      "Our Smart Hub is designed for versatility. It can be integrated into smart home automation for controlling lights and security, in industrial settings for monitoring machinery, or in agricultural applications to track environmental conditions.",
  },
  {
    id: "agri-sensor-002",
    name: "Smart Agriculture Sensor",
    tagline: "Data-Driven Farming for Higher Yields",
    description: "Optimize your crop management with real-time data on soil health, environmental conditions, and plant vitality. Our durable sensors are built to withstand harsh agricultural environments.",
    image: {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
      alt: "Smart Agriculture Sensor",
      aiHint: "smart agriculture",
    },
    features: [
      {
        icon: Droplets,
        title: "Soil Moisture & Nutrient Analysis",
        description: "Precise measurements to optimize irrigation and fertilization.",
      },
      {
        icon: Thermometer,
        title: "Environmental Monitoring",
        description: "Tracks ambient temperature, humidity, and light exposure.",
      },
      {
        icon: Tractor,
        title: "Rugged & Weatherproof",
        description: "Designed to operate reliably in all weather conditions, year after year.",
      },
    ],
    specs: [
        "Sensor Types: NPK, pH, EC, Temperature, Moisture",
        "Connectivity: LoRaWAN",
        "Battery Life: 5+ years",
        "Ingress Protection: IP67",
        "Casing: UV-resistant polymer",
    ],
    useCases:
      "Ideal for vineyards, large-scale farms, and specialty crop producers. Use data to increase yield, reduce water consumption, and implement precision agriculture techniques.",
  },
  {
    id: "industrial-gateway-003",
    name: "Industrial IoT Gateway",
    tagline: "Connecting Your Factory to the Future",
    description: "Bridge the gap between your operational technology (OT) and IT infrastructure. Our Industrial Gateway securely collects data from legacy and modern machinery, enabling predictive maintenance and process optimization.",
    image: {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      alt: "Industrial IoT Gateway",
      aiHint: "industrial iot",
    },
    features: [
      {
        icon: Factory,
        title: "Legacy Machine Integration",
        description: "Connects to PLCs and other industrial equipment via Modbus, OPC-UA.",
      },
      {
        icon: Shield,
        title: "Secure Data Transmission",
        description: "Features a hardware security module for trusted data collection.",
      },
      {
        icon: Zap,
        title: "Edge Computing Power",
        description: "Pre-process data locally to reduce latency and cloud costs.",
      },
    ],
    specs: [
      "Industrial Protocols: Modbus RTU/TCP, OPC-UA, CAN bus",
      "Cloud Connectivity: MQTT, HTTP/S",
      "Processor: Dual-core ARM Cortex-A72",
      "Mounting: DIN Rail Mountable",
      "Power: 24V DC Input",
    ],
    useCases:
      "Perfect for manufacturing plants, energy facilities, and logistics centers. Enable predictive maintenance, monitor production lines, and improve overall equipment effectiveness (OEE).",
  },
];

const ProductSection = ({ product, reverse = false }: { product: Product, reverse?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className={cn("container mx-auto px-4 py-24 transition-opacity duration-1000 ease-in", isVisible ? "opacity-100" : "opacity-0")}>
      <div className={`grid md:grid-cols-12 gap-12 items-center ${reverse ? 'md:grid-flow-row-dense' : ''}`}>
        <div className={`md:col-span-7 relative ${reverse ? 'md:col-start-6' : ''}`}>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority
              className="object-cover"
              data-ai-hint={product.image.aiHint}
            />
          </div>
        </div>

        <div className={`md:col-span-5 ${reverse ? 'md:col-start-1 md:row-start-1' : ''}`}>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{product.id}</span>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-2 mb-4">
            {product.name}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {product.tagline}
          </p>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <div>
           <h3 className="text-2xl font-bold font-headline mb-6">Key Features</h3>
            <div className="space-y-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
        <div>
          <Card className="p-6 bg-card">
             <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="font-headline text-xl pt-0">Technical Specifications</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    {product.specs.map((spec, index) => <li key={index}>{spec}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-0">
                <AccordionTrigger className="font-headline text-xl">Innovative Use Cases</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{product.useCases}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="font-headline text-xl">About This Product</AccordionTrigger>
                <AccordionContent>
                   <p className="text-muted-foreground">{product.description}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default function ProductPage() {
  const breadcrumbData = generateStructuredData({
    type: 'BreadcrumbList',
    data: {
      items: [
        { name: 'Home', url: '/' },
        { name: 'Products', url: '/product' }
      ]
    }
  });

  const productListData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'IOTech IoT Products',
    description: 'Complete range of IoT products and solutions',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'Product',
      position: index + 1,
      name: product.name,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: 'IOTech'
      },
      category: 'IoT Devices',
      url: `/product#${product.id}`
    }))
  };

  return (
    <div className="bg-background">
      <StructuredData data={breadcrumbData} />
      <StructuredData data={productListData} />
      <header className="bg-card py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">Our Products</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our suite of IoT solutions, engineered for performance, reliability, and seamless integration.
          </p>
        </div>
      </header>
      <div className="divide-y divide-border">
        {products.map((product, index) => (
          <ProductSection
            key={product.id}
            product={product}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}
