"use client";

import Image from "next/image";
import AboutItech from "./AboutItech";

const Sectors = () => {
  const sectors = [
    {
      title: "Oil and Gas",
      description: "Complete end-to-end Wireless/Wired SCADA & Automation solutions for Oil and Gas operations. Our systems provide real-time monitoring, control, and optimization for upstream, midstream, and downstream processes.",
      image: "https://res.cloudinary.com/dshrjyy17/image/upload/v1757829460/oil_gas_gvzwp1.png",
      // number: "01",
      variant: "card"
    },
    {
      title: "Cathodic Protection",
      description: "Complete end-to-end Wireless/Wired Remote Monitoring & Control Solutions for Cathodic Protection systems. Ensure pipeline integrity and prevent corrosion with our advanced monitoring technology.",
      image: "https://res.cloudinary.com/dshrjyy17/image/upload/v1757829466/cathedic_protection_fqctfb.png",
      // number: "02",
      variant: "card"
    },
    {
      title: "Water Sector",
      description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for all water applications. From treatment plants to distribution networks, optimize water management operations.",
      image: "https://res.cloudinary.com/dshrjyy17/image/upload/v1757829472/waterplant_nncbio.png",
      // number: "03",
      variant: "card"
    },
    {
      title: "Energy and Power",
      description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for power applications. Enhance grid reliability, monitor generation assets, and optimize power distribution.",
      image: "https://res.cloudinary.com/dshrjyy17/image/upload/v1757829446/powerplant_mlvklv.png",
      // number: "04",
      variant: "card"
    },
    {
      title: "Utility Management",
      description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for Utility management. Streamline operations across multiple utility services with integrated monitoring systems.",
      image: "https://res.cloudinary.com/dshrjyy17/image/upload/v1757829474/uitility_azigni.png",
      // number: "05",
       variant: "card"
    },
  ];

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            Industry Solutions
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 text-white">
            <span className="neon-text">Transforming Industries</span> with
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Smart IoT Solutions
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Complete end-to-end Wireless/Wired customized solutions across multiple industries. 
            Experience the power of connected intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transition-all duration-500 hover:scale-105 iot-card-glow rounded-xl overflow-hidden h-96 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 data-stream"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
              </div>

             

              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                  
                  <h3 className="text-2xl font-bold font-headline mb-4 text-white group-hover:text-white transition-all duration-300">
                    {sector.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed font-body line-clamp-4 group-hover:text-white/95 transition-all duration-300 mb-4">
                    {sector.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-300 text-sm font-medium group-hover:text-blue-200 transition-colors duration-300">
                    <span>Learn More</span>
                    <div className="w-4 h-4 border-r-2 border-b-2 border-current transform rotate-[-45deg] group-hover:translate-x-1 transition-transform duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
      <AboutItech />
    </section>
  );
};

export default Sectors;