import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Zap, Wifi, Shield, Thermometer, Droplets, Tractor, Factory } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
      src: "https://placehold.co/800x800.png",
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
      src: "https://placehold.co/800x800.png",
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
      src: "https://placehold.co/800x800.png",
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

const ProductSection = ({ product, reverse = false }: { product: Product, reverse?: boolean }) => (
  <section className="container mx-auto px-4 py-16">
    <div className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-start ${reverse ? 'md:grid-flow-row-dense' : ''}`}>
      <div className={`relative aspect-square w-full rounded-lg overflow-hidden shadow-xl ${reverse ? 'md:col-start-2' : ''}`}>
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          priority
          className="object-cover"
          data-ai-hint={product.image.aiHint}
        />
      </div>

      <div className={`${reverse ? 'md:col-start-1' : ''}`}>
        <span className="text-sm font-semibold text-primary uppercase">{product.id}</span>
        <h2 className="text-4xl md:text-5xl font-bold font-headline mt-2 mb-4">
          {product.name}
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          {product.tagline}
        </p>
        <p className="text-muted-foreground mb-6">
          {product.description}
        </p>

        <div className="mt-8">
          <h3 className="text-xl font-bold font-headline mb-4">Key Features</h3>
          <div className="space-y-4">
            {product.features.map((feature, index) => (
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
                  {product.specs.map((spec, index) => <li key={index}>{spec}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-headline text-lg">Innovative Use Cases</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{product.useCases}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  </section>
);

export default function ProductPage() {
  return (
    <div className="bg-background">
      <div className="divide-y divide-border">
        {products.map((product, index) => (
          <div key={product.id} className={index % 2 === 0 ? 'bg-card' : 'bg-background'}>
            <ProductSection
              product={product}
              reverse={index % 2 !== 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
