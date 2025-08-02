import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedSection } from '@/components/common/AnimatedSection';

export const metadata: Metadata = {
  title: 'IOT Product Website',
  description: 'Welcome to the future of IOT.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          <AnimatedSection>
            <Footer />
          </AnimatedSection>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
