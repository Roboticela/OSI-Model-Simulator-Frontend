'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, Layers, Zap, Lock, Monitor, Globe, Grid3x3 } from 'lucide-react';
import Link from 'next/link';

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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={iconAnimation.initial}
            animate={iconAnimation.animate}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="bg-card/40 backdrop-blur-md rounded-full p-6 w-fit mx-auto mb-6 border border-border/40"
          >
            <img src="/Favicon.svg" alt="OSI Model Simulator" className="w-16 h-16 md:w-20 md:h-20" />
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground py-2 mb-4 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            See How Data Travels the Internet
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            An interactive simulator that shows how messages are encapsulated through the seven OSI layers. Choose protocols, media, and watch step-by-step from Application down to Physical.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 w-full sm:w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              href="https://app.osi-model-simulator.roboticela.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-background rounded-xl font-semibold text-base sm:text-lg transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="text-lg sm:text-xl" />
              Open Simulator
            </motion.a>
            <Link href="#downloads" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-card/40 hover:bg-card/60 backdrop-blur-md rounded-xl font-semibold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 text-foreground border border-border/40"
              >
                <Download className="text-lg sm:text-xl" />
                Download
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              className="bg-card/40 backdrop-blur-md rounded-xl p-4 text-center transition-all border border-border/40 hover:bg-card/60"
            >
              <benefit.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-foreground/80 font-medium">{benefit.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
