import React from 'react';
import { AuthHero } from '../auth/AuthHero';
import buniyaadlogo from '../../assets/buniyaadlogo2.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans antialiased text-slate-900">
      {/* Left Panel: Desktop Hero (55% Width) */}
      <div className="hidden lg:relative lg:flex lg:w-[55%] bg-slate-950 overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architectural Engineering"
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter brightness-75"
        />
        
        {/* Lightened Gradient Overlay (prevents double-darkening) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />
        
        {/* Enterprise Brand Content with z-10 to stay above overlays */}
        <div className="relative z-10 w-full flex flex-col justify-between">
          <AuthHero />
        </div>
      </div>

      {/* Right Panel: Interactive Form Region (45% Width on LG) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between items-center p-6 sm:p-12 min-h-screen">
        {/* Mobile Header Logo */}
        <div className="w-full max-w-md lg:hidden flex justify-start pt-2 pb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center pr-4">
              <img
                src={buniyaadlogo}
                alt="BuniyaadEC Logo"
                className="h-14 sm:h-16 md:h-18 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center border-l-2 border-cyan-500 pl-4 leading-tight">
              <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                BuniyaadEC
              </span>
              <span className="text-xs sm:text-sm text-black font-medium tracking-wide">
                We Make Strong Foundations...
              </span>
            </div>
          </div>
        </div>

        {/* Center Container for Forms */}
        <div className="w-full max-w-md my-auto flex flex-col justify-center">
          {children}
        </div>

        {/* Enterprise Footer */}
        <footer className="w-full max-w-md pt-8 text-center text-xs text-slate-500">
          <div className="flex justify-center gap-4 mb-2">
            <a href="#terms" className="hover:text-slate-700 transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#privacy" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#support" className="hover:text-slate-700 transition-colors">Security</a>
          </div>
          <p>&copy; {new Date().getFullYear()} BuniyaadEC Platform Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};