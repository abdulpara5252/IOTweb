import HeroSection from '@/components/home/HeroSection';
import ProductCarousel from '@/components/home/ProductCarousel';
import ClientLogos from '@/components/home/ClientLogos';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export default function Home() {
  return (
    <>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection>
        <ProductCarousel />
      </AnimatedSection>
      <AnimatedSection>
        <ClientLogos />
      </AnimatedSection>
    </>
  );
}
