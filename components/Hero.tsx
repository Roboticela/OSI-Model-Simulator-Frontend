'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Gamepad2, Layers, Zap, Lock, Monitor, Globe, Grid3x3 } from 'lucide-react';
import Link from 'next/link';
import { APP_URL, GAMES_URL } from '@/lib/appLinks';

const benefits = [
  { icon: Layers, text: '7 OSI Layers' },
  { icon: Zap, text: 'Step-by-Step' },
  { icon: Lock, text: 'Real Protocols' },
  { icon: Grid3x3, text: 'HTTP, HTTPS, SMTP' },
  { icon: Monitor, text: 'Web & Desktop' },
  { icon: Globe, text: 'Free & Educational' }
];

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const iconAnimation = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0 }
};

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-card/40 backdrop-blur-md rounded-full p-6 w-fit mx-auto mb-6 border border-border/40 flex items-center justify-center transition-transform hover:rotate-[360deg] duration-700" style={{ width: 128, height: 128 }}>
            {/* Explicit width/height prevents CLS; priority preloads for LCP */}
            <Image
              src="/Favicon.svg"
              alt="OSI Model Simulator – Interactive Network Protocol Learning Tool"
              width={80}
              height={80}
              priority
              className="w-16 h-16 md:w-20 md:h-20"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground py-2 mb-4 px-2">
            See How Data Travels the Internet
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto mb-8 px-4">
            An interactive simulator that shows how messages are encapsulated through the seven OSI layers. Choose protocols, media, and watch step-by-step from Application down to Physical.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 w-full sm:w-auto">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-background rounded-xl font-semibold text-base sm:text-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <ExternalLink className="text-lg sm:text-xl" />
              Open Simulator
            </a>
            <a
              href={GAMES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-card/40 hover:bg-card/60 backdrop-blur-md rounded-xl font-semibold text-base sm:text-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-foreground border border-border/40"
            >
              <Gamepad2 className="text-lg sm:text-xl" />
              Play Games
            </a>
            <Link href="#downloads" className="w-full sm:w-auto">
              <div className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-card/40 hover:bg-card/60 backdrop-blur-md rounded-xl font-semibold text-base sm:text-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-foreground border border-border/40">
                <Download className="text-lg sm:text-xl" />
                Download
              </div>
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card/40 backdrop-blur-md rounded-xl p-4 text-center transition-all border border-border/40 hover:bg-card/60"
            >
              <benefit.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-foreground/80 font-medium">{benefit.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
