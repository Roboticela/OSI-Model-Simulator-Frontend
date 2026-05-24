'use client';

import { motion } from 'framer-motion';
import { Monitor, Globe, Smartphone, Cpu, HardDrive, Wifi } from 'lucide-react';

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

const requirements = [
  {
    category: 'Web Application',
    icon: Globe,
    iconColor: 'text-blue-500',
    platforms: [
      {
        name: 'Browser Requirements',
        specs: [
          'Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+',
          'JavaScript enabled',
          'Minimum 2 GB RAM',
          'Stable internet connection',
          'Screen resolution: 1024×768 or higher'
        ]
      }
    ]
  },
  {
    category: 'Windows Desktop',
    icon: Monitor,
    iconColor: 'text-blue-600',
    platforms: [
      {
        name: 'Windows 10/11 (64-bit)',
        specs: [
          'CPU: Intel Core i3 or AMD equivalent (2.0 GHz+)',
          'RAM: 4 GB minimum, 8 GB recommended',
          'Storage: 200 MB available space',
          'Display: 1280×720 or higher'
        ]
      },
      {
        name: 'Windows ARM64',
        specs: [
          'ARM64 processor (Snapdragon 850+)',
          'RAM: 4 GB minimum',
          'Storage: 200 MB available space'
        ]
      }
    ]
  },
  {
    category: 'macOS Desktop',
    icon: Monitor,
    iconColor: 'text-gray-600',
    platforms: [
      {
        name: 'macOS 11 (Big Sur) or later',
        specs: [
          'Apple Silicon (M1, M2, M3) or Intel processor',
          'RAM: 4 GB minimum, 8 GB recommended',
          'Storage: 200 MB available space',
          'Display: 1280×720 or higher'
        ]
      }
    ]
  },
  {
    category: 'Linux Desktop',
    icon: Monitor,
    iconColor: 'text-orange-600',
    platforms: [
      {
        name: 'Ubuntu 20.04+ / Debian 11+ / Fedora 34+',
        specs: [
          'CPU: x86_64 architecture (64-bit)',
          'RAM: 4 GB minimum, 8 GB recommended',
          'Storage: 200 MB available space',
          'Display Server: X11 or Wayland',
          'GTK 3.0+ libraries'
        ]
      }
    ]
  },
  {
    category: 'Android',
    icon: Smartphone,
    iconColor: 'text-green-600',
    platforms: [
      {
        name: 'Android 8.0 (Oreo) or later',
        specs: [
          'ARM64, ARMv7, x86, or x86_64 architecture',
          'RAM: 2 GB minimum, 4 GB recommended',
          'Storage: 100 MB available space',
          'Screen resolution: 720×1280 or higher'
        ]
      }
    ]
  },
  {
    category: 'iOS',
    icon: Smartphone,
    iconColor: 'text-indigo-600',
    platforms: [
      {
        name: 'iOS 13.0 or later',
        specs: [
          'iPhone 6S or newer',
          'iPad (5th generation) or newer',
          'RAM: 2 GB minimum',
          'Storage: 100 MB available space',
          'iOS Simulator: Xcode 13+'
        ]
      }
    ]
  }
];

export default function SystemRequirements() {
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
            System Requirements
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Minimum specifications needed to run the OSI Model Simulator
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {requirements.map((req, index) => (
            <div
              key={index}
              className="bg-card/40 backdrop-blur-md rounded-xl p-6 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
                <req.icon className={`w-8 h-8 ${req.iconColor}`} />
                <h3 className="text-xl font-bold text-foreground">{req.category}</h3>
              </div>

              {/* Platform Requirements */}
              <div className="space-y-4">
                {req.platforms.map((platform, pIndex) => (
                  <div key={pIndex}>
                    <h4 className="font-semibold text-foreground text-sm mb-3">{platform.name}</h4>
                    <ul className="space-y-2">
                      {platform.specs.map((spec, sIndex) => (
                        <li key={sIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1 text-xs">▪</span>
                          <span className="text-foreground/70 text-sm leading-relaxed">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-foreground/60 text-sm max-w-3xl mx-auto">
            <strong>Note:</strong> These are minimum requirements. The web version runs in any modern browser with an internet connection. 
            Desktop builds are available for a native experience.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
