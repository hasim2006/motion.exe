"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Layers, Box, Cpu } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full pt-36 pb-16 flex flex-col justify-between items-center bg-grid-pattern overflow-hidden">
      {/* Center Headline & 3D Can Gap (z-0 so 3D Can at z-30 renders IN FRONT of text) */}
      <div className="relative z-0 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center my-auto">
        
        {/* Row 1: TOKE   ZING */}
        <div className="w-full flex items-center justify-between font-display font-black text-black text-[7.5vw] md:text-[8.5vw] lg:text-[9.5vw] xl:text-[124px] leading-none tracking-tight select-none px-2">
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="tracking-[0.02em]"
          >
            TOKE
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="tracking-[0.02em]"
          >
            ZING
          </motion.span>
        </div>

        {/* Row 2: HYDRATION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-black text-black text-[7.5vw] md:text-[8.5vw] lg:text-[9.5vw] xl:text-[124px] leading-none tracking-tight select-none text-center -mt-1 md:-mt-3"
        >
          HYDRATION
        </motion.div>

        {/* Dashed Separator & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-col items-center text-center"
        >
          <div className="w-64 md:w-96 border-b-2 border-dashed border-black/30 mb-3" />
          <p className="font-mono text-xs md:text-sm font-semibold tracking-[0.25em] text-zinc-800 uppercase">
            PURE. REFRESHING. BLOCKCHAIN-POWERED.
          </p>
        </motion.div>
      </div>

      {/* Bottom Partner Logos Bar matching reference design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="z-10 w-full max-w-5xl px-4 mt-6"
      >
        <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-black/10 shadow-sm grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-black/10 overflow-hidden">
          <div className="flex items-center justify-center gap-2.5 py-4 px-6 font-display text-sm font-bold text-black hover:text-[#FF6000] transition-colors">
            <Layers className="h-5 w-5 text-black" />
            <span>Chainlink</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 py-4 px-6 font-display text-sm font-bold text-black hover:text-[#FF6000] transition-colors">
            <Zap className="h-5 w-5 text-black" />
            <span>TRON</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 py-4 px-6 font-display text-sm font-bold text-black hover:text-[#FF6000] transition-colors">
            <Box className="h-5 w-5 text-black" />
            <span>BNB</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 py-4 px-6 font-display text-sm font-bold text-black hover:text-[#FF6000] transition-colors">
            <Cpu className="h-5 w-5 text-black" />
            <span>OKX</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 py-4 px-6 font-display text-sm font-bold text-black hover:text-[#FF6000] transition-colors col-span-2 md:col-span-1">
            <Shield className="h-5 w-5 text-black" />
            <span>Chainlink</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
