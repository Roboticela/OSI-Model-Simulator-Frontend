'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { BlogFaq } from '@/data/types';

function FaqItem({ question, answer }: BlogFaq) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/40 rounded-xl overflow-hidden bg-background/40">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-accent/20 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-foreground/70 transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-4">
          <p className="text-foreground/70 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function BlogFaqAccordion({ items }: { items: BlogFaq[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <FaqItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
