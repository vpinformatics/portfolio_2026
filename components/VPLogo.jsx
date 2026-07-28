'use client';

import { useState } from 'react';

export default function VPLogo({ className = 'h-10 sm:h-10 w-auto object-contain' }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    return (
      <div className="flex items-end text-2xl sm:text-3xl font-black text-slate-950">
        <span>V</span>
        <span className="text-red-600">P</span>
        <span className="text-slate-300 mx-2 font-light">|</span>
        <span className="text-lg sm:text-xl text-slate-700 font-mono font-normal tracking-wide">Informatics</span>
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
