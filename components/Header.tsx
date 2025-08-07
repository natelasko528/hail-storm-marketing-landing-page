import React from 'react';
import { COMPANY_LOGO_URL, CALENDAR_LINK } from '../constants';
import { CalendarIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-black sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <img 
          src={COMPANY_LOGO_URL} 
          alt="C&E Wurzer Construction Logo" 
          className="h-16 w-auto"
        />
        <a 
          href={CALENDAR_LINK}
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 bg-amber-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 glow-on-hover"
        >
          <CalendarIcon className="h-5 w-5" />
          Book Free Inspection
        </a>
      </div>
    </header>
  );
};

export default Header;