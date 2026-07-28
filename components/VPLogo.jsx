'use client';

import { useState } from 'react';

export default function VPLogo({ className = 'h-10 sm:h-12 w-auto object-contain' }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    return (
      <div className="flex items-end text-2xl sm:text-3xl font-black text-slate-950">
        <span>V</span>
        <span className="text-red-600 relative">
          P<span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
        </span>
        <span className="text-slate-300 mx-2 font-light">|</span>
        <span className="text-lg sm:text-xl text-slate-700 tracking-wide">Informatics</span>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="/VPInformatics-logo.png"
      alt="VP Informatics"
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
