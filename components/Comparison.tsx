'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const comparisons = [
  {
    feature: 'Visualization',
    osiSimulator: 'Step-by-step animation',
    others: 'Static diagrams only',
    osiSimulatorBetter: true
  },
  {
    feature: 'Protocols',
    osiSimulator: 'HTTP, HTTPS, SMTP, DNS, FTP',
    others: 'Generic or limited',
    osiSimulatorBetter: true
  },
  {
    feature: 'Cost',
    osiSimulator: 'Free & open source',
    others: 'Paid or limited free',
    osiSimulatorBetter: true
  },
  {
    feature: 'Control',
    osiSimulator: 'Your message, speed, repeat',
    others: 'Fixed examples',
    osiSimulatorBetter: true
  },
  {
    feature: 'Platform',
    osiSimulator: 'Web & desktop (Tauri)',
    others: 'Web only',
    osiSimulatorBetter: true
  },
  {
    feature: 'Educational',
    osiSimulator: 'Built for learning',
    others: 'Demo only',
    osiSimulatorBetter: true
  }
];

export default function Comparison() {
  return (
    <section className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            How We Compare
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            See why learners choose the OSI Model Simulator
          </p>
        </motion.div>

        <motion.div
          className="bg-card/40 backdrop-blur-md rounded-xl overflow-hidden border border-border/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 bg-accent/30 border-b border-border/40">
            <div className="font-bold text-foreground">Feature</div>
            <div className="font-bold text-primary text-center">OSI Simulator</div>
            <div className="font-bold text-foreground/70 text-center">Others</div>
          </div>

          {/* Rows */}
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-3 gap-4 p-4 sm:p-6 border-b border-border/20 last:border-b-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="text-foreground font-medium">{item.feature}</div>
              <div className="text-center">
                <span className="text-primary font-semibold">{item.osiSimulator}</span>
              </div>
              <div className="text-center">
                <span className="text-foreground/60">{item.others}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
