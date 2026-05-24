import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://osi-model-simulator.roboticela.com"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
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
