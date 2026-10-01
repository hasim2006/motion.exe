"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Sparkles } from "lucide-react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 1500;
    const intervalTime = 16;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          exit={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#EAECEE] bg-grid-pattern px-8 py-12 text-black overflow-hidden"
        >
          {/* Top Status Header */}
          <div className="z-10 flex w-full max-w-7xl items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF6000] animate-ping" />
              HYDROFLOW // PROTOCOL 2.0
            </span>
            <span className="flex items-center gap-1.5 text-[#FF6000] font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              SOLANA MAINNET
            </span>
          </div>

          {/* Center Branding & Counter */}
          <div className="z-10 flex flex-col items-center">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-display text-3xl font-extrabold tracking-[0.25em] text-black">
                HYDRO<span className="text-[#FF6000]">FLOW</span>
              </span>
            </div>

            <div className="font-display text-8xl font-extrabold tracking-tight md:text-[120px] text-black">
              <span>{count}</span>
              <span className="text-4xl font-light text-zinc-400 md:text-6xl">%</span>
            </div>

            {/* Progress Line */}
            <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-black/10 md:w-80 relative">
              <motion.div
                className="h-full bg-[#FF6000]"
                style={{ width: `${count}%` }}
              />
            </div>

            <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600 font-medium">
              INITIALIZING 3D CANVAS MATRIX
            </p>
          </div>

          {/* Footer Badge */}
          <div className="z-10 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
            [ 330ML ALUMINUM CAN • NFC TOKEN ENCODED • ZERO SUGAR ]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
