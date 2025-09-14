"use client";

import Image from "next/image";

const AboutItech = () => {
  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/5 via-transparent to-cyan-900/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Image */}
          <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden iot-card-glow">
            <Image
              src="/assets/images/about-section.png"
              alt="iTech Innovations - Industrial Automation Solutions"
              fill
              className="object-cover transition-all duration-500 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                About iTech
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-headline">
                <span className="neon-text">iTech</span> - Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Innovation Partner
                </span>
              </h2>
            </div>

            {/* Main Content */}
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                <strong className="text-white">iTech Innovations</strong> is a pioneer company in the field of Instrumentation, 
                Automation and SCADA solutions, specialized in providing Wireless/Wired Remote Monitoring 
                and Control solutions for different sectors like Oil & Gas, Cathodic Protection, Water, 
                Power, and Utility etc. We specialize in understanding client applications and providing 
                cost-effective and most suitable systems and solutions.
              </p>

              <p className="text-lg">
                iTech Innovations serves different sectors and provides complete end-to-end Wireless/Wired 
                customized Solutions. We are known for Manufacturing, Supplying and Exporting an advanced 
                range of products used for Wireless/Wired Remote Monitoring & Control solutions. We offer 
                a wide range of Smart, Efficient, Reliable products powered with the best and latest 
                technology yet cost-effective products to measure, monitor and control.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-sm font-medium">Global Presence</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutItech;
