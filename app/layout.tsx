import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://osi-model-simulator.roboticela.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "OSI Model Simulator – Learn Network Protocols Interactively",
  description: "Free interactive simulator that visualizes how messages travel through all seven OSI model layers. Explore TCP/IP, HTTP, HTTPS, SMTP and more with step-by-step animations, real protocols, and hands-on learning. Perfect for students and educators.",
  keywords: "OSI model, networking, education, data encapsulation, TCP/IP, HTTP, HTTPS, network layers, protocol simulation, network education, OSI layers explained",
  authors: [{ name: "Roboticela" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.ico" },
      { url: "/Favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/icon.ico",
    apple: "/icon.ico"
  },
  openGraph: {
    title: "OSI Model Simulator – Learn Network Protocols Interactively",
    description: "Free interactive simulator that visualizes how messages travel through all seven OSI model layers with real protocols and step-by-step animations.",
    type: "website",
    url: "/",
    siteName: "OSI Model Simulator",
  },
  twitter: {
    card: "summary_large_image",
    title: "OSI Model Simulator – Learn Network Protocols Interactively",
    description: "Free interactive simulator for all seven OSI model layers with real protocols and step-by-step animations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OSI Model Simulator",
  url: BASE_URL,
  description:
    "Free interactive simulator for learning OSI model layers and network protocols. Covers TCP/IP, HTTP, HTTPS, SMTP, DNS and more.",
  publisher: {
    "@type": "Organization",
    name: "Roboticela",
    url: "https://roboticela.com",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blogs?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OSI Model Simulator",
  url: BASE_URL,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Windows, macOS, Linux, Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Interactive OSI model simulator that visualizes all seven network protocol layers step-by-step.",
  author: {
    "@type": "Organization",
    name: "Roboticela",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to speed up third-party scripts */}
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8NELPL2FXP"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-8NELPL2FXP');
            `,
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "viwp403njf");
            `,
          }}
        />
      </body>
    </html>
  );
}
