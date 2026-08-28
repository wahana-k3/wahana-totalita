'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <>
      {/* Floating Desktop WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20program%20pelatihan%20K3"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 px-5 rounded-full shadow-2xl shadow-emerald-600/50 hover:shadow-emerald-600/70 transition-all transform hover:scale-105"
          aria-label="Konsultasi WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-200 rounded-full" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs text-emerald-100 font-normal leading-none">Tanya CS 24/7</span>
            <span className="text-sm font-bold leading-tight">Chat WhatsApp</span>
          </div>
        </a>
      </div>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl flex items-center gap-2">
        <a
          href="tel:+6287759151278"
          className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center border border-slate-300"
          aria-label="Telepon"
        >
          <Phone className="w-5 h-5 text-slate-700" />
        </a>
        <a
          href="https://wa.me/6287759151278?text=Halo%20Wahana%20Totalita%2C%20saya%20ingin%20konsultasi%20program%20pelatihan%20K3"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 text-sm"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Konsultasi Pelatihan K3</span>
        </a>
      </div>
    </>
  );
}
