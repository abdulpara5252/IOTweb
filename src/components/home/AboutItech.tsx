"use client";

import Image from "next/image";

const AboutItech = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          {/* Left Side - Image */}
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/assets/images/about-section.png"
              alt="iTech Innovations - Industrial Automation Solutions"
              fill
              className="object-cover"
              priority
            />
       </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                About iTech
              </h3>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-headline">
                iTech - Your Innovation Partner
              </h2>
            </div>

            {/* Main Content */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base">
                <strong>iTech Innovations</strong> is a pioneer company in the field of Instrumentation, 
                Automation and SCADA solutions, specialized in providing Wireless/Wired Remote Monitoring 
                and Control solutions for different sectors like Oil & Gas, Cathodic Protection, Water, 
                Power, and Utility etc. We specialize in understanding client applications and providing 
                cost-effective and most suitable systems and solutions.
              </p>

              <p className="text-base">
                iTech Innovations serves different sectors and provides complete end-to-end Wireless/Wired 
                customized Solutions. We are known for Manufacturing, Supplying and Exporting an advanced 
                range of products used for Wireless/Wired Remote Monitoring & Control solutions. We offer 
                a wide range of Smart, Efficient, Reliable products powered with the best and latest 
                technology yet cost-effective products to measure, monitor and control.
              </p>

              {/* <p className="text-base">
                <strong>Contact us</strong> for more information on how iTech Remote Monitoring systems 
                can improve your Networked System, also with any Questions or for a free Proposal. 
                We look forward to the opportunity to work with you!
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutItech;
