'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Target, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Open Source',
    description: 'Built with love for the developer community. Free forever and open to contributions.'
  },
  {
    icon: Users,
    title: 'Developer First',
    description: 'Designed by developers, for developers. We understand your workflow and pain points.'
  },
  {
    icon: Target,
    title: 'Privacy Focused',
    description: 'All processing happens locally. Your images never leave your device.'
  },
  {
    icon: TrendingUp,
    title: 'Continuously Improving',
    description: 'Regular updates with new platforms, features, and improvements based on your feedback.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            About OSI Model Simulator
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            The OSI Model Simulator was created to make networking concepts visible and interactive. 
            Instead of static diagrams, you can see how a message is encapsulated through all seven layers, with real protocols and media.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/40 backdrop-blur-md rounded-xl p-6 border border-border/40"
            >
              <value.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-foreground/70">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-foreground/70 mb-4">
            Built by{' '}
            <a
              href="https://github.com/Roboticela"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              Roboticela
            </a>
          </p>
          <p className="text-foreground/50 text-sm">
            Licensed under AGPL-3.0 • Open Source Forever
          </p>
        </motion.div>
      </div>
    </section>
  );
}
