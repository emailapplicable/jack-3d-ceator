import React from 'react';

export interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function LiveProjectButton({
  onClick,
  className = '',
  label = 'Live Project',
}: LiveProjectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] ${className}`}
    >
      {label}
    </button>
  );
}
