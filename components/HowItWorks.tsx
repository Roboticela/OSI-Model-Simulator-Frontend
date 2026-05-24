'use client';

import { motion } from 'framer-motion';
import { Upload, Sliders, Eye, Download, Check } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Enter Your Message & Settings',
    description: 'Type any message, choose a transmission medium (Ethernet, Wi‑Fi, Fiber, etc.) and protocol (HTTP, HTTPS, SMTP, DNS, FTP). Optionally set source and destination IPs.',
    color: 'text-blue-500'
  },
  {
    icon: Sliders,
    title: 'Run the Simulation',
    description: 'Start the animation and watch as your data is encapsulated layer by layer — from Application (Layer 7) down to Physical (Layer 1). Use auto-advance or step manually.',
    color: 'text-purple-500'
  },
  {
    icon: Eye,
    title: 'Inspect Each Layer',
    description: 'See the headers added at each layer, PDU names (Data, Segment, Packet, Frame, Bits), and optional hex view. Understand encapsulation at every step.',
    color: 'text-orange-500'
  },
  {
    icon: Download,
    title: 'Learn & Repeat',
    description: 'Adjust speed, enable repeat to loop the animation, or explore the "How it works" guide. Built for students and anyone curious about networking.',
    color: 'text-green-500'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Explore the OSI model in 4 simple steps
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-background rounded-full flex items-center justify-center font-bold text-xl z-10">
                {index + 1}
              </div>
              
              {/* Card */}
              <div className="bg-card/40 backdrop-blur-md rounded-xl p-6 pt-8 border border-border/40 h-full">
                <step.icon className={`w-12 h-12 ${step.color} mb-4`} />
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </div>

              {/* Connector Arrow (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                  <svg className="w-8 h-8 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
