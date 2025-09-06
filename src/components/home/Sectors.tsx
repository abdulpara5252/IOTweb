"use client";

import Image from "next/image";
import AboutItech from "./AboutItech";

const Sectors = () => {
  const sectors = [
    {
      title: "Oil and Gas",
      description: "Complete end-to-end Wireless/Wired SCADA & Automation solutions for Oil and Gas operations. Our systems provide real-time monitoring, control, and optimization for upstream, midstream, and downstream processes.",
      image: "/assets/images/oil_and_gas1.png",
      number: "01",
      variant: "card"
    },
    {
      title: "Cathodic Protection",
      description: "Complete end-to-end Wireless/Wired Remote Monitoring & Control Solutions for Cathodic Protection systems. Ensure pipeline integrity and prevent corrosion with our advanced monitoring technology.",
      image: "/assets/images/cathedic_protection.png",
      number: "02",
      variant: "card"
    },
    {
      title: "Water Sector",
      description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for all water applications. From treatment plants to distribution networks, optimize water management operations.",
      image: "/assets/images/water.png",
      number: "03",
      variant: "card"
    },
    {
      title: "Energy and Power",
      description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for power applications. Enhance grid reliability, monitor generation assets, and optimize power distribution.",
      image: "/assets/images/Energy_and_Power.png",
      number: "04",
      variant: "card"
    },
    {
      title: "Utility Management",
      description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for Utility management. Streamline operations across multiple utility services with integrated monitoring systems.",
      image: "/assets/images/Utility.png",
      number: "05",
       variant: "card"
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Industry Sectors We Serve
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-3xl mx-auto">
            Complete end-to-end Wireless/Wired customized solutions across multiple industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg overflow-hidden h-80 ${
                sector.variant === 'primary' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card text-card-foreground border border-border'
              }`}
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm font-headline ${
                  sector.variant === 'primary' 
                    ? 'bg-primary-foreground text-primary' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {sector.number}
                </div>
              </div>

              <div className="p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                    sector.variant === 'primary' 
                      ? 'bg-primary-foreground/20' 
                      : 'bg-secondary'
                  }`}>
                    <div className="w-10 h-10 relative">
                      <Image
                        src={sector.image}
                        alt={sector.title}
                        width={40}
                        height={40}
                        className="object-contain"
                        style={{
                          filter: sector.variant === 'primary' ? 'brightness(0) invert(1)' : 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-headline mb-3 group-hover:text-accent transition-colors duration-300">
                    {sector.title}
                  </h3>
                  <p className={`text-sm leading-relaxed font-body line-clamp-6 ${
                    sector.variant === 'primary' 
                      ? 'text-primary-foreground/90' 
                      : 'text-muted-foreground'
                  }`}>
                    {sector.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AboutItech />
    </section>
  );
};

export default Sectors;