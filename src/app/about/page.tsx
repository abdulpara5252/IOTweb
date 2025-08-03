import { Metadata } from 'next';
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = generateMetadata({
  title: 'About IOTech - Leading IoT Innovation & Smart Technology Solutions',
  description: 'Learn about IOTech\'s mission to revolutionize IoT technology. Meet our expert team, discover our values, and see how we\'re building the future of connected devices and smart solutions.',
  keywords: ['about IOTech', 'IoT company', 'smart technology team', 'IoT innovation', 'connected devices company', 'IoT leadership'],
  url: '/about',
  type: 'website'
});

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    aiHint: "professional portrait",
    bio: "Visionary leader with 15+ years in IoT and smart technology. Passionate about empowering teams and building innovative solutions."
  },
  {
    name: "John Smith",
    role: "Chief Technology Officer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    aiHint: "professional portrait",
    bio: "Tech enthusiast and architect of scalable IoT platforms. Loves solving complex problems and mentoring future tech leaders."
  },
  {
    name: "Emily White",
    role: "Head of Product",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    aiHint: "professional portrait",
    bio: "Product strategist with a knack for user-centric design. Drives product vision from concept to launch with creativity and focus."
  },
];

const values = [
  "Innovation at our core",
  "Unwavering customer focus",
  "Commitment to quality and reliability",
  "Building a sustainable future",
];

export default function AboutPage() {
  const breadcrumbData = generateStructuredData({
    type: 'BreadcrumbList',
    data: {
      items: [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' }
      ]
    }
  });

  const teamData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IOTech',
    description: 'Pioneers in the Internet of Things, dedicated to creating intelligent, connected solutions that empower businesses and individuals.',
    employee: teamMembers.map(member => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      image: member.image
    }))
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <StructuredData data={breadcrumbData} />
      <StructuredData data={teamData} />
      <AnimatedSection>
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">About IOTech</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We are pioneers in the Internet of Things, dedicated to creating intelligent, connected solutions that empower businesses and individuals.
          </p>
        </header>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80"
                alt="Our team working"
                fill
                className="object-cover"
                data-ai-hint="team collaboration"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, IOTech was born from a vision to simplify the complexity of the digital world. Our founders saw the potential for connected devices to revolutionize industries, but also recognized the need for a platform that was both powerful and accessible. We've been on a mission ever since to build that platform and help our clients unlock the full potential of IoT.
              </p>
              <p className="text-muted-foreground">
                From a small garage startup to a globally recognized leader, our journey has been driven by passion, persistence, and a relentless pursuit of excellence.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mb-16 bg-card p-12 rounded-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">Our Mission & Values</h2>
              <p className="text-muted-foreground mb-6">
                Our mission is to empower our customers with reliable and intuitive IoT solutions that drive efficiency, innovation, and growth. We are guided by our core values in every decision we make.
              </p>
              <ul className="space-y-4">
                {values.map((value, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
               <Image
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                alt="Abstract representation of values"
                fill
                className="object-cover"
                data-ai-hint="abstract technology"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet Our Team</h2>
            <p className="mt-4 text-lg text-muted-foreground">The brilliant minds behind our success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
  <div key={member.name} className="flip-card h-80 w-full">
    <div className="flip-card-inner h-full w-full">
      {/* Front Side */}
      <div className="flip-card-front h-full w-full flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300 bg-card rounded-xl p-6">
        <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
          <Image
            src={member.image}
            alt={`Portrait of ${member.name}`}
            fill
            className="object-cover"
            data-ai-hint={member.aiHint}
          />
        </div>
        <div>
          <h3 className="font-headline text-xl font-bold mb-1">{member.name}</h3>
          <p className="text-primary mb-2">{member.role}</p>
        </div>
      </div>
      {/* Back Side */}
      <div className="flip-card-back h-full w-full flex flex-col items-center justify-center text-center bg-card rounded-xl p-6">
        <h3 className="font-headline text-xl font-bold mb-2">{member.name}</h3>
        <p className="text-muted-foreground mb-4">{member.role}</p>
        <p className="text-sm">{member.bio}</p>
      </div>
    </div>
  </div>
))}
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
