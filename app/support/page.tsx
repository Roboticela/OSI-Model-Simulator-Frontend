'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Send, User, Mail, FileText, CheckCircle, AlertCircle,
  ChevronDown, HelpCircle, Layers, Download, Monitor, Zap, Globe, Shield
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const faqs = [
  {
    icon: Layers,
    question: 'What is the OSI Model Simulator?',
    answer:
      'OSI Model Simulator is a free, interactive educational tool that visualizes how data travels through all seven layers of the OSI (Open Systems Interconnection) model. You can choose different protocols (HTTP, HTTPS, SMTP, FTP, etc.) and transmission media, then watch the encapsulation and decapsulation process step-by-step — from the Application layer all the way down to the Physical layer and back.',
  },
  {
    icon: Globe,
    question: 'Is OSI Model Simulator available in a web browser?',
    answer:
      'Yes! The full simulator runs directly in your browser at app.osi-model-simulator.roboticela.com — no installation required. You can also download the desktop version for Windows, macOS, or Linux if you prefer an offline experience.',
  },
  {
    icon: Download,
    question: 'How do I download the desktop app?',
    answer:
      'Head to the Downloads section on the homepage and select the installer for your operating system. Windows users can download the .exe installer, macOS users get a .dmg file, and Linux users can use the AppImage. The desktop app is identical to the web version but works fully offline.',
  },
  {
    icon: Monitor,
    question: 'What operating systems are supported?',
    answer:
      'The desktop application supports Windows 10 and above, macOS 11 (Big Sur) and above, and most modern Linux distributions via AppImage. The web application runs on any modern browser (Chrome, Firefox, Safari, Edge) on any operating system including mobile devices.',
  },
  {
    icon: Zap,
    question: 'Which protocols can I simulate?',
    answer:
      'The simulator currently supports HTTP, HTTPS (TLS), SMTP (email), FTP (file transfer), DNS queries, and more. Each protocol demonstrates different header structures, encryption behaviour, and layer interactions. New protocols are added with each update.',
  },
  {
    icon: Shield,
    question: 'Can I use this for classroom teaching?',
    answer:
      'Absolutely. OSI Model Simulator is designed with educators in mind. It is free for personal and educational use, with no login required. Teachers use it to demonstrate encapsulation live during lectures, and students use it for self-study. If you need a specific feature for your curriculum, please contact us and we will do our best to add it.',
  },
  {
    icon: HelpCircle,
    question: 'How do I report a bug or request a feature?',
    answer:
      'Use the contact form on this page to send us a detailed description of the bug (including your browser version and OS) or the feature you would like to see. You can also open an issue on our GitHub repository. We review all submissions and prioritize based on user impact.',
  },
  {
    icon: HelpCircle,
    question: 'Is OSI Model Simulator free to use?',
    answer:
      'Yes — OSI Model Simulator is completely free for both personal and educational use. There are no paywalls, no subscription plans, and no account required. We are committed to keeping the core simulator free forever.',
  },
];

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = faq.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-card/40 backdrop-blur-md border border-border/40 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-card/60 transition-colors"
        aria-expanded={open}
      >
        <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </span>
        <span className="flex-1 font-semibold text-foreground text-base md:text-lg">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-foreground/50 transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-5 md:px-6 pb-5 md:pb-6 text-foreground/70 leading-relaxed text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SupportPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }
    setStatus('sending');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || data.message || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      setFullName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 overflow-x-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-card border border-border/40 mb-6">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              OSI Model Simulator Support Center
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Have a question, found a bug, or want to request a feature? Browse the FAQs below or send us a message and we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Still Need Help? Contact Us
            </h2>
            <p className="text-foreground/70">
              Send us a message and we&apos;ll respond within 1–2 business days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card/40 backdrop-blur-md rounded-2xl border border-border/40 p-6 md:p-8 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-4 w-5 h-5 text-foreground/40" />
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-y min-h-[120px]"
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              {status === 'error' && errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Message sent. We&apos;ll get back to you soon.</span>
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  type="submit"
                  id="support-submit-btn"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-background hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all font-medium"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send message
                    </>
                  )}
                </button>
                <Link
                  href="/"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors text-center sm:text-left"
                >
                  ← Back to home
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
