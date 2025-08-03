import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'IoT Products - Smart Hubs & Connected Devices | IOTech',
  description: 'Discover IOTech\'s comprehensive range of IoT products including smart hubs, sensors, and connected devices. Advanced IoT solutions for agriculture, industry, and smart homes with cutting-edge technology.',
  keywords: ['IoT products', 'smart hub', 'IoT sensors', 'connected devices', 'IoT solutions', 'smart agriculture', 'industrial IoT', 'IoT technology'],
  url: '/product',
  type: 'website'
});
