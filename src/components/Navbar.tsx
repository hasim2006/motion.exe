"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl bg-white/90 backdrop-blur-md px-8 py-3.5 border border-black/10 shadow-sm transition-all duration-300">
        {/* Left Logo: "HYDRO" */}
        <a href="#" className="flex items-center gap-2 group" data-cursor-text="HOME">
          <span className="font-display text-xl font-extrabold tracking-[0.25em] text-black">
            HYDRO
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-8 md:flex font-sans text-sm font-medium text-zinc-700">
          <a href="#" className="hover:text-black transition-colors">Home</a>
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#testimonials" className="hover:text-black transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
        </nav>

        {/* Right CTA Button: "Coming Soon" */}
        <div className="hidden items-center md:flex">
          <button 
            data-cursor-text="JOIN"
            className="rounded-xl bg-[#FF6000] hover:bg-[#E05400] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Coming Soon
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mt-3 rounded-2xl bg-white p-6 shadow-xl border border-black/10 md:hidden">
          <nav className="flex flex-col gap-4 font-sans text-base font-medium text-zinc-800">
            <a href="#" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          </nav>
          <button className="mt-6 w-full rounded-xl bg-[#FF6000] py-3 text-sm font-bold text-white shadow-sm">
            Coming Soon
          </button>
        </div>
      )}
    </header>
  );
}
