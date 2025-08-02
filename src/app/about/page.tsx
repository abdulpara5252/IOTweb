import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/components/common/AnimatedSection";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "https://placehold.co/400x400.png",
    aiHint: "professional portrait"
  },
  {
    name: "John Smith",
    role: "Chief Technology Officer",
    image: "https://placehold.co/400x400.png",
    aiHint: "professional portrait"
  },
  {
    name: "Emily White",
    role: "Head of Product",
    image: "https://placehold.co/400x400.png",
    aiHint: "professional portrait"
  },
];

const values = [
  "Innovation at our core",
  "Unwavering customer focus",
  "Commitment to quality and reliability",
  "Building a sustainable future",
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
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
                src="https://placehold.co/800x600.png"
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
                src="https://placehold.co/800x600.png"
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
              <Card key={member.name} className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={member.aiHint}
                    />
                  </div>
                  <CardTitle className="font-headline">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
