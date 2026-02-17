'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Demo from '@/components/Demo';
import UseCases from '@/components/UseCases';
import Downloads from '@/components/Downloads';
import WhyChoose from '@/components/WhyChoose';
import Platforms from '@/components/Platforms';
import TechnologyStack from '@/components/TechnologyStack';
import Comparison from '@/components/Comparison';
import SystemRequirements from '@/components/SystemRequirements';
import FAQ from '@/components/FAQ';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      {/* Navigation */}
      <Navbar />

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

      {/* Platforms Section */}
      <Platforms />

      {/* Technology Stack */}
      <TechnologyStack />

      {/* Comparison Section */}
      <Comparison />

      {/* System Requirements */}
      <SystemRequirements />

      {/* FAQ Section */}
      <FAQ />

      {/* About Section */}
      <About />

      {/* Footer */}
      <Footer />
    </div>
  );
}
