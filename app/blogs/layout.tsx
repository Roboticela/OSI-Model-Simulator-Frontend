import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Networking Blog – OSI Model Articles & Protocol Tutorials',
  description: 'Browse expert articles, tutorials, and in-depth guides on OSI Model layers, TCP/IP networking, DNS resolution, HTTP/HTTPS security, WiFi technology, and computer network fundamentals. Regularly updated content for students, educators, and networking professionals.',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Networking Blog – OSI Model Articles & Protocol Tutorials',
    description: 'Expert articles and tutorials on OSI Model layers, TCP/IP, DNS, HTTP/HTTPS security, and networking fundamentals. Updated regularly.',
    type: 'website',
    url: '/blogs',
  },
  twitter: {
    card: 'summary',
    title: 'Networking Blog – OSI Model Articles & Protocol Tutorials',
    description: 'Expert articles and tutorials on OSI Model layers, TCP/IP, DNS, HTTP/HTTPS, and networking fundamentals.',
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
