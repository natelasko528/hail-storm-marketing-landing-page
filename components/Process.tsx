
import React from 'react';
import { SearchIcon, FileTextIcon, HomeIcon, ThumbsUpIcon } from './Icons';

const ProcessStep: React.FC<{icon: React.ReactNode; number: number; title: string; description: string}> = ({ icon, number, title, description }) => (
  <div className="relative">
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sky-600 text-white flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <div className="flex-grow border-t-2 border-gray-300 ml-4"></div>
    </div>
    <div className="pl-4">
        <div className="text-sky-600 mb-3">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Process: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Our Simple, Stress-Free Process</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We've refined our process over 60 years to make it as easy as possible for you.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <ProcessStep 
            number={1}
            icon={<SearchIcon className="h-10 w-10"/>}
            title="Free Inspection"
            description="Nate provides a thorough, no-obligation inspection to assess all potential storm damage."
          />
          <ProcessStep 
            number={2}
            icon={<FileTextIcon className="h-10 w-10" />}
            title="Claim Handling"
            description="We meet your insurance adjuster on-site and handle all the paperwork for a seamless claim."
          />
          <ProcessStep 
            number={3}
            icon={<HomeIcon className="h-10 w-10" />}
            title="Expert Installation"
            description="Our certified crew replaces your roof, siding, and gutters with top-quality materials."
          />
          <ProcessStep 
            number={4}
            icon={<ThumbsUpIcon className="h-10 w-10" />}
            title="Final Walkthrough"
            description="We ensure you are 100% satisfied with the work and that your property is spotless."
          />
        </div>
      </div>
    </section>
  );
};

export default Process;
