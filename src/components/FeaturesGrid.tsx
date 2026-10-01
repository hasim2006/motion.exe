"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Flame, Layers, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Sparkles className="h-7 w-7 text-solana-cyan" />,
      tag: "PURITY & FORMULA",
      title: "Alpine Electrolyte Blend",
      desc: "Pure natural spring water enriched with natural potassium, magnesium, and calcium for maximum cellular hydration.",
      accent: "from-solana-cyan/20 to-transparent",
    },
    {
      icon: <Flame className="h-7 w-7 text-solana-purple" />,
      tag: "ZERO SUGAR",
      title: "Crisp Carbonated Refreshment",
      desc: "No artificial sweeteners, zero preservatives, zero calories. Clean, refreshing taste in a sleek 330ml aluminum vessel.",
      accent: "from-solana-purple/20 to-transparent",
    },
    {
      icon: <ShieldCheck className="h-7 w-7 text-solana-green" />,
      tag: "ON-CHAIN PROOF",
      title: "Tamper-Proof NFC Chips",
      desc: "Cryptographically verified lid tags prevent counterfeiting and ensure authentic origin tracking from source to sip.",
      accent: "from-solana-green/20 to-transparent",
    },
    {
      icon: <Layers className="h-7 w-7 text-blue-400" />,
      tag: "REWARD ENGINE",
      title: "Drink to Earn Hydration NFTs",
      desc: "Unlock rare digital badges, real-world festival passes, and automated token drops every time you scan your can.",
      accent: "from-blue-500/20 to-transparent",
    },
  ];

  return (
    <section id="features" ref={containerRef} className="relative w-full py-28 px-6 md:px-12 max-w-7xl mx-auto z-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs text-solana-cyan uppercase tracking-widest">
          UNMATCHED SPECIFICATIONS
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase text-white mt-3">
          ENGINEERED FOR <span className="text-gradient-solana">PERFORMANCE</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="feature-card glass-card relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5"
          >
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.accent} rounded-full blur-3xl pointer-events-none`} />

            <div className="flex items-center justify-between mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                {item.icon}
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted px-3 py-1 rounded-full border border-white/10 bg-white/5">
                {item.tag}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-text-muted text-base leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
