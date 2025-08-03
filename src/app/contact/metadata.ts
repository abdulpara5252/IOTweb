import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Contact IOTech - Get in Touch for IoT Solutions & Support',
  description: 'Contact IOTech for expert IoT solutions, technical support, and partnership opportunities. Reach out to our team for smart device integration, IoT consulting, and innovative connected technology solutions.',
  keywords: ['contact IOTech', 'IoT support', 'IoT consulting', 'smart device help', 'IoT partnership', 'technical support'],
  url: '/contact',
  type: 'website'
});
