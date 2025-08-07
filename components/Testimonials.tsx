
import React from 'react';
import { StarIcon, BbbIcon, GoogleIcon } from './Icons';
import { testimonials } from '../constants';

const TestimonialCard: React.FC<{ quote: string; author: string; source: string; }> = ({ quote, author, source }) => {
  const isGoogle = source.toLowerCase().includes('google');
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="h-5 w-5 text-amber-400" />
        ))}
      </div>
      <p className="text-gray-600 italic flex-grow">"{quote}"</p>
      <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
        <p className="font-bold text-gray-900">{author}</p>
        {isGoogle ? <GoogleIcon className="h-6 w-6 text-gray-400" /> : <BbbIcon className="h-6 w-6 text-gray-400" />}
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section 
      className="bg-cover bg-center py-16 sm:py-24"
      style={{backgroundImage: "linear-gradient(rgba(249, 250, 251, 0.95), rgba(249, 250, 251, 0.95)), url('https://images.unsplash.com/photo-1594013426294-425301a89669?q=80&w=1974&auto=format&fit=crop')"}}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Real reviews from homeowners we've helped in your community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;