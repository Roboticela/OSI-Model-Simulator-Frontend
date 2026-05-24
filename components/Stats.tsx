'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '7', label: 'OSI Layers' },
  { value: '5', label: 'Protocols (HTTP, HTTPS, SMTP, DNS, FTP)' },
  { value: '5', label: 'Transmission Media' },
  { value: '100%', label: 'Free & Educational' }
];

export default function Stats() {
  return (
    <section className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-foreground/70 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
