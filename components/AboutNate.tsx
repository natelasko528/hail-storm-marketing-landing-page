
import React from 'react';
import { NATE_IMAGE_URL, NATE_EMAIL, NATE_PHONE } from '../constants';
import { MailIcon, PhoneIcon } from './Icons';

const AboutNate: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/3 flex-shrink-0">
            <img 
              src={NATE_IMAGE_URL} 
              alt="Nate" 
              className="rounded-lg shadow-2xl w-full max-w-sm mx-auto object-cover aspect-square" 
            />
          </div>
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-sky-800 mb-4">Meet Your Advocate, Nate</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              "Hi, I'm Nate. When your home is damaged by a storm, the last thing you need is the stress of dealing with insurance companies. My mission is to be your personal advocate, handling the entire claims process from start to finish. With our offices in <span className="font-semibold">Brookfield & Janesville, WI</span>, we're dedicated to ensuring you get the quality roof and siding you deserve, with minimal hassle for you. Let my team and I put our decades of experience to work for you."
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6">
              <a href={`tel:${NATE_PHONE}`} className="flex items-center gap-3 text-lg font-semibold text-sky-700 hover:text-sky-900 transition-colors">
                <PhoneIcon className="h-6 w-6" />
                <span>{NATE_PHONE}</span>
              </a>
              <a href={`mailto:${NATE_EMAIL}`} className="flex items-center gap-3 text-lg font-semibold text-sky-700 hover:text-sky-900 transition-colors">
                <MailIcon className="h-6 w-6" />
                <span>{NATE_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNate;