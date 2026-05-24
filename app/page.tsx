'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

const Stats = dynamic(() => import('@/components/Stats'));
const Features = dynamic(() => import('@/components/Features'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const Demo = dynamic(() => import('@/components/Demo'));
const UseCases = dynamic(() => import('@/components/UseCases'));
const Downloads = dynamic(() => import('@/components/Downloads'));
const WhyChoose = dynamic(() => import('@/components/WhyChoose'));
const TechnologyStack = dynamic(() => import('@/components/TechnologyStack'));
const Comparison = dynamic(() => import('@/components/Comparison'));
const SystemRequirements = dynamic(() => import('@/components/SystemRequirements'));
const About = dynamic(() => import('@/components/About'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      {/* Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <Stats />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Demo Section */}
        <Demo />

        {/* Use Cases Section */}
        <UseCases />

        {/* Downloads Section */}
        <Downloads />

        {/* Why Choose Section */}
        <WhyChoose />

        {/* Technology Stack */}
        <TechnologyStack />

        {/* Comparison Section */}
        <Comparison />

        {/* System Requirements */}
        <SystemRequirements />

        {/* About Section */}
        <About />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
