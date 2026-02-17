'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, User, Mail, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

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

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 overflow-x-hidden">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-card border border-border/40 mb-6">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Support
            </h1>
            <p className="text-lg text-foreground/70">
              Have a question or feedback? Send us a message and we&apos;ll get back to you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
