import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { generateMetadata, generateStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = generateMetadata({
  title: 'IOTech - Smart IoT Solutions & Connected Devices',
  description: 'Discover innovative IoT solutions with IOTech. Smart hubs, connected devices, and cutting-edge IoT technology for homes, industries, and businesses. Transform your world with intelligent connectivity.',
  keywords: ['IoT platform', 'smart devices', 'connected technology', 'IoT solutions', 'smart home', 'industrial IoT'],
  url: '/',
  type: 'website'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = generateStructuredData({
    type: 'Organization',
    data: {
      foundingDate: '2020',
      numberOfEmployees: '50-100',
      industry: 'Technology',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Tech Street',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        postalCode: '94105',
        addressCountry: 'US'
      }
    }
  });

  const websiteData = generateStructuredData({
    type: 'WebSite',
    data: {}
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        <StructuredData data={organizationData} />
        <StructuredData data={websiteData} />
        <div className="relative flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <AnimatedSection>
            <Footer />
          </AnimatedSection>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
