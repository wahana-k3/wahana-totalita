import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', className = '', size = 'md' }: LogoProps) {
  const isDark = variant === 'dark'; // Dark text for white background

  const sizeClasses = {
    sm: { img: 'h-9 w-9', textMain: 'text-base', textSub: 'text-[9px]' },
    md: { img: 'h-11 w-11 sm:h-12 sm:w-12', textMain: 'text-lg sm:text-xl', textSub: 'text-[10px] sm:text-[11px]' },
    lg: { img: 'h-14 w-14 sm:h-16 sm:w-16', textMain: 'text-2xl', textSub: 'text-xs' },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group shrink-0 ${className}`}>
      {/* Official Emblem */}
      <div className="relative shrink-0">
        <img
          src="/images/logo.png"
          alt="Wahana Totalita Konsultan Logo"
          className={`${currentSize.img} object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform`}
        />
      </div>

      {/* Brand Typographic Lockup */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display font-extrabold tracking-tight transition-colors ${currentSize.textMain} ${
              isDark ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-emerald-400'
            }`}
          >
            WAHANA TOTALITA
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`font-bold tracking-wider uppercase ${currentSize.textSub} ${
              isDark ? 'text-emerald-700 font-semibold' : 'text-emerald-400 font-medium'
            }`}
          >
            KONSULTAN
          </span>
          <span className={`text-[9px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>•</span>
          <span
            className={`font-semibold tracking-wide ${currentSize.textSub} ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            PJK3 KEMNAKER RI
          </span>
        </div>
      </div>
    </Link>
  );
}
