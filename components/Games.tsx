'use client';

import { motion } from 'framer-motion';
import {
  ExternalLink,
  Gamepad2,
  HelpCircle,
  ToggleLeft,
  MousePointerClick,
  TextCursorInput,
  Hash,
  CircleOff,
  Link2,
  Layers,
  Package,
  Globe,
  Network,
  Server,
  Shield,
  Cable,
  Trophy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GAMES_URL } from '@/lib/appLinks';

const gameModes: { icon: LucideIcon; name: string; description: string; color: string }[] = [
  {
    icon: HelpCircle,
    name: 'Classic Quiz',
    description: 'Multiple choice — pick the best answer on networking topics.',
    color: 'text-blue-500',
  },
  {
    icon: ToggleLeft,
    name: 'True or False',
    description: 'Quick yes/no rounds on OSI layers, TCP/IP, and protocol facts.',
    color: 'text-green-500',
  },
  {
    icon: MousePointerClick,
    name: 'Layer Spotlight',
    description: 'Read a clue and tap the OSI layer that fits.',
    color: 'text-cyan-500',
  },
  {
    icon: TextCursorInput,
    name: 'Fill the Blank',
    description: 'Complete sentences with the correct networking term.',
    color: 'text-purple-500',
  },
  {
    icon: Hash,
    name: 'Port Picker',
    description: 'Match protocols like HTTP, DNS, and FTP to their port numbers.',
    color: 'text-orange-500',
  },
  {
    icon: CircleOff,
    name: 'Odd One Out',
    description: 'Spot the term that does not belong in the group.',
    color: 'text-pink-500',
  },
  {
    icon: Link2,
    name: 'Protocol Match',
    description: 'Pair terms with their definitions or protocol partners.',
    color: 'text-teal-500',
  },
  {
    icon: Layers,
    name: 'Stack the Layers',
    description: 'Put all seven OSI layers in the correct top-to-bottom order.',
    color: 'text-indigo-500',
  },
  {
    icon: Package,
    name: 'Encapsulation Rush',
    description: 'Order the steps data takes as it moves down the stack.',
    color: 'text-amber-500',
  },
];

const topics = [
  { icon: Layers, name: 'OSI Model' },
  { icon: Network, name: 'TCP/IP' },
  { icon: Globe, name: 'General Networking' },
  { icon: Server, name: 'Protocols & Ports' },
  { icon: Shield, name: 'Network Security' },
  { icon: Cable, name: 'Hardware & Cabling' },
];

function GameCard({ icon: Icon, name, description, color }: (typeof gameModes)[number]) {
  return (
    <div className="bg-card/40 backdrop-blur-md rounded-xl p-5 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`${color} mb-3`}>
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1.5">{name}</h3>
      <p className="text-sm text-foreground/70 leading-relaxed">{description}</p>
    </div>
  );
}

export default function Games() {
  return (
    <section id="games" className="py-16 md:py-24 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-4">
            <Gamepad2 className="w-4 h-4" />
            Built into the app
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Networking Games
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
            Test what you learned with nine interactive game modes. Earn streak bonuses, track your high score, and pick from six topic categories.
          </p>
          <motion.a
            href={GAMES_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-background rounded-xl font-semibold text-lg transition-colors"
          >
            <Gamepad2 className="text-xl" />
            Play Games
            <ExternalLink className="text-lg opacity-80" />
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {topics.map((topic) => (
            <span
              key={topic.name}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/40 bg-card/40 backdrop-blur-md text-sm font-medium text-foreground/80"
            >
              <topic.icon className="w-4 h-4 text-primary" />
              {topic.name}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {gameModes.map((game) => (
            <GameCard key={game.name} {...game} />
          ))}
        </motion.div>

        <motion.div
          className="bg-card/40 backdrop-blur-md rounded-xl p-6 md:p-8 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start gap-4 text-center md:text-left">
            <div className="hidden sm:flex w-12 h-12 rounded-xl border border-primary/20 bg-primary/10 items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Score points and build streaks</h3>
              <p className="text-foreground/70 max-w-xl">
                Each correct answer earns 100 points with a streak multiplier. Your best score and longest streak are saved locally — no account needed.
              </p>
            </div>
          </div>
          <a
            href={GAMES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto shrink-0 px-6 py-3 bg-card/60 hover:bg-card/80 border border-border/40 hover:border-primary/40 rounded-xl font-semibold text-foreground transition-all flex items-center justify-center gap-2"
          >
            <Gamepad2 className="w-5 h-5 text-primary" />
            Start playing
          </a>
        </motion.div>
      </div>
    </section>
  );
}
