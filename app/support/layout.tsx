import type { Metadata } from 'next';

const BASE_URL = 'https://osi-model-simulator.roboticela.com';

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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the OSI Model Simulator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OSI Model Simulator is a free, interactive educational tool that visualizes how data travels through all seven layers of the OSI model. You can choose different protocols and transmission media, then watch the encapsulation and decapsulation process step-by-step.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is OSI Model Simulator available in a web browser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! The full simulator runs directly in your browser at app.osi-model-simulator.roboticela.com — no installation required. A desktop version for Windows, macOS, and Linux is also available.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I download the desktop app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Head to the Downloads section on the homepage and select the installer for your operating system. Windows users can download the .exe installer, macOS users get a .dmg file, and Linux users can use the AppImage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which protocols can I simulate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The simulator currently supports HTTP, HTTPS (TLS), SMTP (email), FTP (file transfer), DNS queries, and more. Each protocol demonstrates different header structures, encryption behaviour, and layer interactions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this for classroom teaching?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. OSI Model Simulator is designed with educators in mind. It is free for personal and educational use, with no login required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is OSI Model Simulator free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — OSI Model Simulator is completely free for both personal and educational use. There are no paywalls, no subscription plans, and no account required.',
      },
    },
  ],
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
