import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import Sectors from '@/components/home/Sectors';
import ClientLogos from '@/components/home/ClientLogos';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = generateMetadata({
  title: 'IOTech - Revolutionary IoT Solutions for Smart Connected World',
  description: 'Transform your world with IOTech\'s cutting-edge IoT solutions. Smart hubs, connected devices, and innovative technology for homes, industries, and businesses. Experience the future of connectivity today.',
  keywords: ['IoT hub', 'smart home technology', 'connected devices', 'IoT platform', 'smart solutions', 'internet of things'],
  url: '/',
  type: 'website'
});

export default function Home() {
  const breadcrumbData = generateStructuredData({
    type: 'BreadcrumbList',
    data: {
      items: [
        { name: 'Home', url: '/' }
      ]
    }
  });

  return (
    <>
      <StructuredData data={breadcrumbData} />
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection>
        <Sectors />
      </AnimatedSection>
      <AnimatedSection>
        <ClientLogos />
      </AnimatedSection>
    </>
  );
}
