import React from 'react';

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 select-none ${className}`} aria-hidden="true">
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A246]/50 to-[#C5A246]" />
      <span className="w-1.5 h-1.5 rotate-45 border border-[#C5A246] bg-[#FFFDF9]" />
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A246]/50 to-[#C5A246]" />
    </div>
  );
};

export const GoldFlourish: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-2 select-none text-[#C5A246] ${className}`} aria-hidden="true">
      <svg className="w-16 h-3 text-[#C5A246]" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6H40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="50" cy="6" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="50" cy="6" r="1" fill="currentColor" />
        <path d="M60 6H100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>
    </div>
  );
};

export const GoldHeart: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={`w-5 h-5 text-[#C5A246] inline-block ${className}`} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
};
