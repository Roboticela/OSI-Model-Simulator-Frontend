'use client';

import { motion } from 'framer-motion';
import { Smartphone, Monitor, Globe, Layers, Tv, Watch, Gamepad2, Coffee } from 'lucide-react';

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
};

const platforms = [
  { icon: Globe, name: 'HTTP', color: 'text-blue-500' },
  { icon: Globe, name: 'HTTPS', color: 'text-green-500' },
  { icon: Layers, name: 'SMTP', color: 'text-cyan-500' },
  { icon: Layers, name: 'DNS', color: 'text-purple-500' },
  { icon: Layers, name: 'FTP', color: 'text-orange-500' },
  { icon: Monitor, name: 'Ethernet', color: 'text-gray-500' },
  { icon: Smartphone, name: 'Wi‑Fi', color: 'text-blue-400' },
  { icon: Tv, name: 'Fiber', color: 'text-red-500' },
  { icon: Watch, name: 'Coaxial', color: 'text-green-400' },
  { icon: Gamepad2, name: 'Radio', color: 'text-yellow-500' },
  { icon: Coffee, name: 'Application', color: 'text-blue-600' },
  { icon: Coffee, name: 'Presentation', color: 'text-teal-500' },
  { icon: Coffee, name: 'Session', color: 'text-purple-600' },
  { icon: Coffee, name: 'Transport', color: 'text-gray-600' },
  { icon: Coffee, name: 'Network', color: 'text-green-600' },
  { icon: Coffee, name: 'Data Link', color: 'text-blue-500' },
  { icon: Coffee, name: 'Physical', color: 'text-green-500' },
];

export default function Platforms() {
  return (
    <section id="platforms" className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Protocols & Media Supported
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Real protocols and transmission media in the simulator
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              whileHover={{ scale: 1.02 }}
              className="bg-card/40 backdrop-blur-md rounded-xl p-4 text-center border border-border/40 hover:border-primary/40 transition-all duration-300"
            >
              <platform.icon className={`w-8 h-8 mx-auto mb-2 ${platform.color}`} />
              <p className="text-sm text-foreground/80 font-medium">{platform.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
