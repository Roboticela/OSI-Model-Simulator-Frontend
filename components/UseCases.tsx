'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Users, Briefcase, Rocket, Heart } from 'lucide-react';

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

const useCases = [
  {
    icon: Code2,
    title: 'Students & Learners',
    description: 'Understand the OSI model visually. See how data is encapsulated and what happens at each layer.',
    color: 'text-blue-500'
  },
  {
    icon: Palette,
    title: 'Teachers & Instructors',
    description: 'Demonstrate networking concepts in class with an interactive, step-by-step simulator.',
    color: 'text-purple-500'
  },
  {
    icon: Users,
    title: 'Network Administrators',
    description: 'Refresh or explain protocol behavior and layer roles to colleagues and trainees.',
    color: 'text-green-500'
  },
  {
    icon: Briefcase,
    title: 'Developers Learning Networking',
    description: 'Connect application-level protocols (HTTP, HTTPS) to the full stack from Layer 7 to Layer 1.',
    color: 'text-orange-500'
  },
  {
    icon: Rocket,
    title: 'Certification Prep',
    description: 'Study for networking certifications (e.g. CompTIA, CCNA) with a hands-on encapsulation view.',
    color: 'text-pink-500'
  },
  {
    icon: Heart,
    title: 'Curious Minds',
    description: 'Anyone who wants to see how a message becomes bits on the wire. No prior networking knowledge required.',
    color: 'text-red-500'
  }
];

export default function UseCases() {
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
            Perfect For Everyone
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Whether you're a student, teacher, or professional, the OSI Model Simulator fits your learning style
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              whileHover={{ scale: 1.02 }}
              className="bg-card/40 backdrop-blur-md rounded-xl p-6 border border-border/40 hover:border-primary/40 transition-all duration-300 h-full"
            >
              <useCase.icon className={`w-12 h-12 mb-4 ${useCase.color}`} />
              <h3 className="text-xl font-semibold text-foreground mb-2">{useCase.title}</h3>
              <p className="text-foreground/70">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
