import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Center – Get Help with OSI Model Simulator',
  description: 'Need help with OSI Model Simulator? Visit our support center to send a message, browse FAQs, troubleshoot issues, or learn how to use all features of the interactive network protocol simulator.',
  alternates: {
    canonical: '/support',
  },
  openGraph: {
    title: 'Support Center – Get Help with OSI Model Simulator',
    description: 'Send a message to the OSI Model Simulator team, browse FAQs, or troubleshoot issues with the interactive networking simulation tool.',
    type: 'website',
    url: '/support',
  },
  twitter: {
    card: 'summary',
    title: 'Support Center – Get Help with OSI Model Simulator',
    description: 'Get help, browse FAQs, and contact the OSI Model Simulator support team.',
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
