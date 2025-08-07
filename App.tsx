
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import AboutNate from './components/AboutNate';
import Services from './components/Services';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-800 antialiased">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <AboutNate />
        <Services />
        <Process />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
