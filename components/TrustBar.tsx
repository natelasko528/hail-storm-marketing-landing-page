import React from 'react';
import { BBB_LINK, GOOGLE_REVIEWS_LINK } from '../constants';
import { BbbIcon, GoogleIcon, StarIcon, ShieldCheckIcon } from './Icons';

const TrustItem: React.FC<{icon: React.ReactNode; text: string; subtext?: string; link?: string}> = ({ icon, text, subtext, link }) => {
  const content = (
    <div className="flex flex-col items-center sm:flex-row gap-4 text-center sm:text-left">
      <div className="text-sky-600">{icon}</div>
      <div>
        <p className="font-bold text-lg text-gray-900">{text}</p>
        {subtext && <p className="text-sm text-gray-500">{subtext}</p>}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-105">
        {content}
      </a>
    );
  }

  return content;
};

const TrustBar: React.FC = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <TrustItem 
            icon={<ShieldCheckIcon className="h-12 w-12" />}
            text="Since 1958"
            subtext="Family Owned"
          />
          <TrustItem 
            icon={<BbbIcon className="h-12 w-12" />}
            text="A+ BBB Rating"
            subtext="Click to see reviews"
            link={BBB_LINK}
          />
          <TrustItem 
            icon={<GoogleIcon className="h-12 w-12" />}
            text="5-Star Reviews"
            subtext="Click to see reviews"
            link={GOOGLE_REVIEWS_LINK}
          />
           <TrustItem 
            icon={<StarIcon className="h-12 w-12 text-amber-500" />}
            text="Insurance Experts"
            subtext="We handle the hassle"
          />
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
