
import React from 'react';
import { RoofIcon, SidingIcon, GutterIcon, InsuranceIcon } from './Icons';

const ServiceCard: React.FC<{icon: React.ReactNode; title: string; description: string}> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2">
    <div className="mx-auto bg-sky-100 text-sky-700 rounded-full h-20 w-20 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Services: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Your Complete Storm Restoration Solution</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We specialize in restoring and upgrading your home's exterior after a storm.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard 
            icon={<RoofIcon className="h-10 w-10" />}
            title="Roofing"
            description="Expert installation of high-quality roofing materials to protect your home for years to come."
          />
          <ServiceCard 
            icon={<SidingIcon className="h-10 w-10" />}
            title="Siding"
            description="Durable and beautiful siding options to enhance curb appeal and shield your home from the elements."
          />
          <ServiceCard 
            icon={<GutterIcon className="h-10 w-10" />}
            title="Gutters"
            description="Seamless gutter systems designed to protect your foundation and landscaping from water damage."
          />
          <ServiceCard 
            icon={<InsuranceIcon className="h-10 w-10" />}
            title="Insurance Claims"
            description="We meet with your adjuster and manage your claim to ensure all storm-related damages are covered."
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
