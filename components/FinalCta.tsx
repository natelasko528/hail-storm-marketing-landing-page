
import React from 'react';
import { CALENDAR_LINK } from '../constants';

const FinalCta: React.FC = () => {
  return (
    <section className="bg-sky-800 text-white">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Ready to Restore Your Home's Value and Safety?</h2>
        <p className="text-lg text-sky-200 mb-8 max-w-3xl mx-auto">
          Don't wait for small damages to become big problems. Schedule your free, no-pressure inspection with Nate today and get peace of mind.
        </p>
        <a 
          href={CALENDAR_LINK}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-amber-500 text-white text-xl font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 glow-on-hover"
        >
          Book Your Free Inspection
        </a>
      </div>
    </section>
  );
};

export default FinalCta;
