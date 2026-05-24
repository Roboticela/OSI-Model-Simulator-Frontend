import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://osi-model-simulator.roboticela.com/sitemap.xml',
    host: 'https://osi-model-simulator.roboticela.com',
  };
}
