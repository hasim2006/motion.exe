"use client";

import { Droplet, Twitter, Disc as Discord, Github, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-black/10 bg-[#EAECEE] py-20 px-4 md:px-8 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 items-start">
          {/* Col 1: Brand details */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#" className="flex items-center gap-3 mb-6" data-cursor-text="HOME">
                <span className="font-display text-2xl font-extrabold tracking-[0.2em] text-black">
                  HYDRO<span className="text-[#FF6000]">FLOW</span>
                </span>
              </a>

              <p className="text-zinc-600 text-sm leading-relaxed max-w-sm">
                The world&apos;s premier Web3 luxury hydration brand. Pure zero-sugar alpine spring water with NFC-activated Solana rewards.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <a href="#" data-cursor-text="TWITTER" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-900 hover:border-[#FF6000] hover:bg-[#FF6000] hover:text-white transition-all shadow-sm">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" data-cursor-text="DISCORD" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-900 hover:border-[#FF6000] hover:bg-[#FF6000] hover:text-white transition-all shadow-sm">
                <Discord className="h-4 w-4" />
              </a>
              <a href="#" data-cursor-text="GITHUB" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-900 hover:border-[#FF6000] hover:bg-[#FF6000] hover:text-white transition-all shadow-sm">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold mb-4">PRODUCT</h4>
              <ul className="flex flex-col gap-2.5 text-xs font-mono text-zinc-600">
                <li><a href="#about" className="hover:text-black transition-colors">Alpine Water</a></li>
                <li><a href="#viewer" className="hover:text-black transition-colors">3D Can Studio</a></li>
                <li><a href="#ingredients" className="hover:text-black transition-colors">Bio-Electrolytes</a></li>
                <li><a href="#timeline" className="hover:text-black transition-colors">Provenance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold mb-4">ECOSYSTEM</h4>
              <ul className="flex flex-col gap-2.5 text-xs font-mono text-zinc-600">
                <li><a href="#" className="hover:text-black transition-colors">Solana Protocol</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Hydra DAO</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Smart Bins</a></li>
                <li><a href="#faq" className="hover:text-black transition-colors">FAQ & Docs</a></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Newsletter */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold mb-4">STAY HYDRATED & INFORMED</h4>
            <p className="text-zinc-600 text-xs leading-relaxed mb-4">
              Subscribe for exclusive batch releases, athletic pop-ups, and ecosystem yield announcements.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center rounded-2xl border border-black/10 bg-white p-1.5 focus-within:border-[#FF6000] transition-all shadow-sm">
              <input
                type="email"
                placeholder="enter email address..."
                className="w-full bg-transparent px-4 font-mono text-xs text-black placeholder:text-zinc-400 focus:outline-none"
              />
              <button 
                type="submit" 
                data-cursor-text="JOIN"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6000] text-white hover:bg-[#e05400] transition-colors shrink-0 shadow-sm"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Giant Typographic Brand Title */}
        <div className="py-12 border-t border-b border-black/10 my-8 text-center overflow-hidden">
          <h2 className="font-display text-[11vw] font-black uppercase leading-none tracking-tighter text-black select-none">
            HYDROFLOW
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between font-mono text-[11px] text-zinc-500 gap-4">
          <span>© {new Date().getFullYear()} HYDROFLOW LABS INC. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-black transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-black transition-colors">SOLANA CONTRACT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
