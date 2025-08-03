import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const defaultSEO = {
  siteName: 'IOTech - Smart IoT Solutions',
  siteUrl: 'https://iotech.com', // Replace with your actual domain
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@iotech', // Replace with your Twitter handle
  author: 'IOTech Team',
  keywords: [
    'IoT',
    'Internet of Things',
    'Smart Devices',
    'IoT Solutions',
    'Smart Hub',
    'Connected Devices',
    'IoT Technology',
    'Smart Home',
    'Industrial IoT',
    'IoT Platform'
  ]
};

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section
  } = config;

  const fullTitle = title.includes(defaultSEO.siteName) 
    ? title 
    : `${title} | ${defaultSEO.siteName}`;

  const ogImage = image || defaultSEO.defaultImage;
  const fullUrl = url ? `${defaultSEO.siteUrl}${url}` : defaultSEO.siteUrl;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [...defaultSEO.keywords, ...keywords].join(', '),
    authors: [{ name: author || defaultSEO.author }],
    creator: defaultSEO.author,
    publisher: defaultSEO.siteName,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
      type: type as any,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: defaultSEO.twitterHandle,
      images: [ogImage],
    },

    // Additional SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification (add your verification codes)
    verification: {
      google: 'your-google-verification-code', // Replace with actual code
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },

    // Alternate languages (if applicable)
    alternates: {
      canonical: fullUrl,
    },
  };

  return metadata;
}

export function generateStructuredData(config: {
  type: 'Organization' | 'Product' | 'WebSite' | 'BreadcrumbList';
  data: any;
}) {
  const baseUrl = defaultSEO.siteUrl;
  
  const commonData = {
    '@context': 'https://schema.org',
    '@type': config.type,
  };

  switch (config.type) {
    case 'Organization':
      return {
        ...commonData,
        name: defaultSEO.siteName,
        url: baseUrl,
        logo: `${baseUrl}/images/logo.png`,
        description: 'Leading provider of innovative IoT solutions and smart device technologies.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-0123', // Replace with actual phone
          contactType: 'customer service',
          availableLanguage: 'English'
        },
        sameAs: [
          'https://twitter.com/iotech', // Replace with actual social links
          'https://linkedin.com/company/iotech',
          'https://facebook.com/iotech'
        ],
        ...config.data
      };

    case 'Product':
      return {
        ...commonData,
        name: config.data.name,
        description: config.data.description,
        brand: {
          '@type': 'Brand',
          name: defaultSEO.siteName
        },
        manufacturer: {
          '@type': 'Organization',
          name: defaultSEO.siteName
        },
        image: config.data.image,
        url: `${baseUrl}${config.data.url}`,
        ...config.data
      };

    case 'WebSite':
      return {
        ...commonData,
        name: defaultSEO.siteName,
        url: baseUrl,
        description: 'Innovative IoT solutions for smart homes, industries, and connected devices.',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        },
        ...config.data
      };

    case 'BreadcrumbList':
      return {
        ...commonData,
        itemListElement: config.data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`
        }))
      };

    default:
      return { ...commonData, ...config.data };
  }
}

export { defaultSEO };
