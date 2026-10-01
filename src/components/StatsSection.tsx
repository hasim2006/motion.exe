"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Recycle, QrCode, Award } from "lucide-react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

function Counter({ from = 0, to, duration = 2, suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const current = from + progress * (to - from);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    icon: Recycle,
    value: 3.4,
    suffix: "M+",
    decimals: 1,
    title: "Cans Recycled",
    subtitle: "Closed-loop zero waste aluminum",
    color: "#FF6000",
    percentage: 100,
  },
  {
    icon: QrCode,
    value: 840,
    suffix: "K+",
    decimals: 0,
    title: "NFC Scans",
    subtitle: "Verified Solana on-chain mints",
    color: "#FF6000",
    percentage: 88,
  },
  {
    icon: Zap,
    value: 0.0,
    suffix: "ms",
    decimals: 1,
    title: "NFC Latency",
    subtitle: "Instant mobile chip response",
    color: "#FF6000",
    percentage: 99,
  },
  {
    icon: Award,
    value: 100,
    suffix: "%",
    decimals: 0,
    title: "Alpine Purity",
    subtitle: "Zero artificial preservatives",
    color: "#FF6000",
    percentage: 100,
  },
];

export default function StatsSection() {
  return (
    <section id="stats" className="relative w-full py-28 px-4 md:px-8 overflow-hidden border-t border-black/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 rounded-full border border-[#FF6000]/30 bg-orange-50 px-4 py-1.5 backdrop-blur-md mb-4">
            <Zap className="h-4 w-4 text-[#FF6000] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold">
              METRICS & PERFORMANCE
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-black">
            PROVEN BY THE <span className="text-[#FF6000]">NUMBERS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            const radius = 40;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (stat.percentage / 100) * circumference;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card-light rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden bg-white border border-black/10"
              >
                {/* SVG Progress Ring */}
                <div className="relative mb-6 flex items-center justify-center">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      className="stroke-zinc-200"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r={radius}
                      stroke={stat.color}
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-[#FF6000]" />
                  </div>
                </div>

                <div className="font-display text-4xl md:text-5xl font-extrabold text-black mb-2">
                  <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>

                <h3 className="font-display text-sm font-bold text-black uppercase tracking-wider">
                  {stat.title}
                </h3>
                <p className="font-mono text-xs text-zinc-500 mt-1 font-medium">
                  {stat.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
