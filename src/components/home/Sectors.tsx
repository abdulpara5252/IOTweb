"use client";

import Image from "next/image";

const sectors = [
  {
    title: "Oil & Gas Sector",
    description: "Complete end-to-end Wireless/Wired SCADA & Automation solutions for Oil and Gas operations. Our systems provide real-time monitoring, control, and optimization for upstream, midstream, and downstream processes.",
    image: "/assets/images/oil_and_gas1.png",
    features: ["Real-time monitoring", "SCADA integration", "Safety systems", "Process optimization"],
    number: "01"
  },
  {
    title: "Cathodic Protection",
    description: "Complete end-to-end Wireless/Wired Remote Monitoring & Control Solutions for Cathodic Protection systems. Ensure pipeline integrity and prevent corrosion with our advanced monitoring technology.",
    image: "/assets/images/cathedic_protection.png",
    features: ["Pipeline monitoring", "Corrosion prevention", "Remote diagnostics", "Automated alerts"],
    number: "02"
  },
  {
    title: "Water Sector",
    description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for all water applications. From treatment plants to distribution networks, optimize water management operations.",
    image: "/assets/images/water.png",
    features: ["Water quality monitoring", "Flow control", "Treatment automation", "Distribution management"],
    number: "03"
  },
  {
    title: "Power Sector",
    description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for power applications. Enhance grid reliability, monitor generation assets, and optimize power distribution.",
    image: "/assets/images/Energy_and_Power.png",
    features: ["Grid monitoring", "Load management", "Asset protection", "Energy optimization"],
    number: "04"
  },
  {
    title: "Utility Management",
    description: "Complete end-to-end Wireless/Wired Remote Monitoring and Control solutions for Utility management. Streamline operations across multiple utility services with integrated monitoring systems.",
    image: "/assets/images/Utility.png",
    features: ["Multi-utility monitoring", "Resource optimization", "Operational efficiency", "Cost reduction"],
    number: "05"
  },
];

export default function Sectors() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-slate-800">
            Industry Sectors We Serve
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            iTech Innovations serves different sectors and provides complete end-to-end Wireless/Wired customized solutions. 
            We are known for Manufacturing, Supplying, and Exporting an advanced range of products used for 
            Wireless/Wired Remote Monitoring & Control solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {sectors.map((sector, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Section */}
              <div className="lg:w-1/2 relative">
                <div className="relative group">
                  <div className="w-32 h-32 mx-auto mb-4 relative flex items-center justify-center bg-slate-100 rounded-2xl p-6 group-hover:bg-primary/10 transition-colors duration-300">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      width={80}
                      height={80}
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-10">
                    {sector.number}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 relative">
                <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  {/* Folded Corner Effect */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-slate-200 transform rotate-45 translate-x-4 -translate-y-4 rounded-sm shadow-md group-hover:bg-primary/20 transition-colors duration-300"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-white border-l border-b border-slate-300 transform rotate-45 translate-x-3 -translate-y-3"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-headline mb-4 text-slate-800 group-hover:text-primary transition-colors duration-300">
                      {sector.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {sector.description}
                    </p>
                    <ul className="space-y-3">
                      {sector.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-slate-600">
                          <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
