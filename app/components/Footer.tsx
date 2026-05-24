'use client';

import { Github, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-card/30 border-t border-border/40 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/Favicon.svg" alt="OSI Model Simulator" className="w-6 h-6 shrink-0" />
              <span className="text-lg font-semibold text-foreground">
                OSI Model Simulator
              </span>
            </Link>
            <p className="text-sm text-foreground/60 mb-4">
              Interactive educational app that visualizes how messages travel through the seven OSI layers. Free and open source.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/Roboticela/osi-model-simulator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:support@roboticela.com" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#features" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href="#downloads" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Download
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <a href="#about" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Roboticela/osi-model-simulator" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://app.osi-model-simulator.roboticela.com/privacy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://app.osi-model-simulator.roboticela.com/terms" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60 text-center md:text-left">
            ©{new Date().getFullYear()} Roboticela. All rights reserved.
          </p>
          <p className="text-sm text-foreground/60 text-center md:text-right">
            Licensed under AGPL-3.0 • Made with ❤️ for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
