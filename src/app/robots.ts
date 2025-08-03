import { MetadataRoute } from 'next';
import { defaultSEO } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = defaultSEO.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
