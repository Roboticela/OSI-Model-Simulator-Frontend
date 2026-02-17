import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - OSI Model Simulator',
  description: 'Contact OSI Model Simulator support. Send us a message and we\'ll get back to you.',
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
