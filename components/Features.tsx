'use client';

import { motion } from 'framer-motion';
import { Image, Sliders, Download, Eye, Smartphone, Monitor, Palette, Grid3x3, FileCheck } from 'lucide-react';

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

const features = [
  {
    icon: Image,
    title: 'All 7 OSI Layers',
    description: 'Step-by-step visualization from Application (Layer 7) down to Physical (Layer 1). See encapsulation with clear labels and PDU names.',
    color: 'text-blue-500'
  },
  {
    icon: Grid3x3,
    title: 'Custom Message & Settings',
    description: 'Enter any message and choose transmission medium (Ethernet, Wi‑Fi, Fiber, Coaxial, Radio) and protocol (HTTP, HTTPS, SMTP, DNS, FTP).',
    color: 'text-green-500'
  },
  {
    icon: FileCheck,
    title: 'Real Protocol Behavior',
    description: 'Headers and encapsulation reflect real protocol behavior. Optional source and destination IP addresses for addressing at the Network layer.',
    color: 'text-cyan-500'
  },
  {
    icon: Sliders,
    title: 'Animation Control',
    description: 'Adjust speed (slow, normal, fast), enable auto-advance and repeat. Or click through each layer manually at your own pace.',
    color: 'text-purple-500'
  },
  {
    icon: Eye,
    title: 'Live Layer View',
    description: 'See headers added at each layer, payload from upper layer, and optional hex view. Understand what happens at every step.',
    color: 'text-orange-500'
  },
  {
    icon: Palette,
    title: 'Multiple Themes',
    description: 'Choose from 8 themes: Navy, Dark, Light, Sunset, Ocean, Forest, Purple Dream, and Midnight for a comfortable viewing experience.',
    color: 'text-pink-500'
  },
  {
    icon: Download,
    title: 'Web & Desktop',
    description: 'Use the simulator in your browser or download the desktop app. No account required. Free and educational.',
    color: 'text-teal-500'
  }
];

function FeatureCard({ icon: Icon, title, description, color }: any) {
  return (
    <div className="bg-card/40 backdrop-blur-md rounded-xl p-6 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`${color} mb-4`}>
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Everything you need to explore the OSI model interactively
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
