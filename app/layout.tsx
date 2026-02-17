import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OSI Model Simulator – Learn How Data Travels the Internet",
  description: "Interactive educational app that visualizes how messages travel through the seven layers of the OSI model. See encapsulation step-by-step with real protocols and media.",
  keywords: "OSI model, networking, education, data encapsulation, TCP/IP, HTTP, HTTPS, network layers, protocol simulation",
  authors: [{ name: "Roboticela" }],
  icons: {
    icon: [
      { url: "/icon.ico" },
      { url: "/Favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/icon.ico",
    apple: "/icon.ico"
  },
  openGraph: {
    title: "OSI Model Simulator – Learn How Data Travels the Internet",
    description: "Interactive educational app that visualizes how messages travel through the seven layers of the OSI model.",
    type: "website",
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
