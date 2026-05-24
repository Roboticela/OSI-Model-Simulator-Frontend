'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const benefits = [
  {
    title: 'Visual & Interactive',
    description: 'See encapsulation step-by-step instead of reading static diagrams. Pause, repeat, and adjust speed to learn at your own pace.',
    delay: 0
  },
  {
    title: 'Real Protocols & Media',
    description: 'Uses real protocol behavior (HTTP, HTTPS, SMTP, DNS, FTP) and transmission media (Ethernet, Wi‑Fi, Fiber, Coaxial, Radio). Not a toy model.',
    delay: 0
  },
  {
    title: 'Built for Learning',
    description: 'Clear layer names, PDU labels, optional hex view, and a "How it works" guide. Perfect for students and certification prep.',
    delay: 0.1
  },
  {
    title: 'Free & Open Source',
    description: 'Completely free and open source. No account required. Use in the browser or download the desktop app. Educational use encouraged.',
    delay: 0.1
  }
];

export default function WhyChoose() {
  return (
    <section className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose OSI Model Simulator?
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            The smart choice for learning the OSI model
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card/40 backdrop-blur-md rounded-xl p-8 border border-border/40"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Check className="text-primary w-6 h-6" />
                {benefit.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
