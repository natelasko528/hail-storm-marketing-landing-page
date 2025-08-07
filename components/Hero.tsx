
import React from 'react';
import { CALENDAR_LINK } from '../constants';

const Hero: React.FC = () => {
  return (
    <section 
      className="bg-cover bg-center py-20 md:py-32 text-white" 
      style={{backgroundImage: "linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop')"}}
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Recent Storm Damage in Your Area?
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          We are your local, trusted experts with 60+ years of experience helping homeowners navigate insurance claims for roofing, siding, and gutters.
        </p>
        <a 
          href={CALENDAR_LINK}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-amber-500 text-white text-xl font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 glow-on-hover"
        >
          Get Your FREE Inspection Now
        </a>
        <p className="mt-4 text-sm text-gray-300">No-Obligation & 100% Free</p>
      </div>
    </section>
  );
};

export default Hero;