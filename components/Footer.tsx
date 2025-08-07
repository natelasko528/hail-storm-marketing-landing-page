import React from 'react';
import { COMPANY_LOGO_URL, FACEBOOK_LINK, BBB_LINK, GOOGLE_REVIEWS_LINK, WEBSITE_LINK } from '../constants';
import { BbbIcon, FacebookIcon, GoogleIcon } from './Icons';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <img 
              src={COMPANY_LOGO_URL}
              alt="C&E Wurzer Construction Logo" 
              className="h-20 w-auto mx-auto md:mx-0 mb-4"
            />
            <p>&copy; {year} C&E Wurzer Construction Inc.</p>
            <p className="text-sm text-gray-400">Serving Brookfield, Janesville, and surrounding areas.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2"><a href={WEBSITE_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">Main Website</a></li>
              <li className="mb-2"><a href={BBB_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">BBB Reviews</a></li>
              <li className="mb-2"><a href={GOOGLE_REVIEWS_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">Google Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500">
                <FacebookIcon className="h-8 w-8" />
              </a>
              <a href={BBB_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500">
                <BbbIcon className="h-8 w-8" />
              </a>
               <a href={GOOGLE_REVIEWS_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500">
                <GoogleIcon className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;