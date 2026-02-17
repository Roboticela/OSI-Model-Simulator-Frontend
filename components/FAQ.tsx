'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is the OSI model?',
    answer: 'The OSI (Open Systems Interconnection) model describes seven layers through which data passes when traveling over a network: Application, Presentation, Session, Transport, Network, Data Link, and Physical. The simulator shows how your message is encapsulated at each layer.'
  },
  {
    question: 'Which protocols and media are supported?',
    answer: 'Protocols: HTTP, HTTPS, SMTP, DNS, and FTP. Transmission media: Ethernet, Wi‑Fi, Fiber, Coaxial, and Radio. You can optionally set source and destination IP addresses.'
  },
  {
    question: 'Do I need an account?',
    answer: 'No. You can use the web simulator or download the desktop app without creating an account. Everything runs locally where applicable.'
  },
  {
    question: 'Can I control the animation?',
    answer: 'Yes. You can enable auto-advance and set speed (slow, normal, fast), enable repeat to loop the simulation, or click through each layer manually. You can also reset and try a new message or settings.'
  },
  {
    question: 'Is the OSI Model Simulator free?',
    answer: 'Yes. The simulator is free and open source. It is intended for educational use — students, teachers, and anyone learning networking.'
  },
  {
    question: 'Web vs desktop app?',
    answer: 'The web version runs in your browser; no install needed. The desktop app (Windows, macOS, Linux) is available for download if you prefer a native application.'
  },
  {
    question: 'How do I use this for studying?',
    answer: 'Enter a message, pick a protocol and medium, then run the simulation. Use the "How it works" guide in the app to understand each layer. Great for certification prep (e.g. CompTIA, CCNA) or coursework.'
  },
  {
    question: 'Can I contribute to the project?',
    answer: 'Yes! The project is open source. Visit the GitHub repository (Roboticela/osi-model-simulator) to report issues, suggest features, or submit pull requests.'
  }
];

function FAQItem({ question, answer, index }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-card/40 backdrop-blur-md rounded-xl border border-border/40 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent/20 transition-colors"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-foreground/70 transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4"
        >
          <p className="text-foreground/70">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-foreground/70">
            Everything you need to know about the OSI Model Simulator
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
