"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Droplets, Flame } from "lucide-react";

const INGREDIENTS = [
  {
    name: "Glacial Alpine Spring Water",
    amount: "330 ML",
    benefit: "Naturally Alkaline pH 8.5+",
    description: "Extracted from 2,400m altitude protected mountain reserves. Zero microplastics, zero heavy metal contamination.",
    icon: Droplets,
    color: "#FF6000",
    floatDelay: 0,
  },
  {
    name: "Ionic Electrolyte Complex",
    amount: "850 MG",
    benefit: "Potassium, Magnesium, Sodium",
    description: "Precision 3:1 bio-identical electrolyte ratio matching human blood plasma osmolarity for maximum hydration speed.",
    icon: Sparkles,
    color: "#FF6000",
    floatDelay: 1,
  },
  {
    name: "Zero Sugars & Artificial Syrups",
    amount: "0.0 G",
    benefit: "Ketogenic & Diabetic Friendly",
    description: "Naturally sweetened with organic botanical extracts and monkfruit. Zero insulin spikes or energy crashes.",
    icon: Flame,
    color: "#FF6000",
    floatDelay: 2,
  },
  {
    name: "NTAG213 Micro NFC Chip",
    amount: "1 TAG",
    benefit: "On-Chain Verification",
    description: "Encrypted smart chip sealed directly under the top aluminum lip. Instant mobile scan without app installation.",
    icon: Shield,
    color: "#FF6000",
    floatDelay: 1.5,
  },
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="relative min-h-screen w-full py-28 px-4 md:px-8 overflow-hidden border-t border-black/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 rounded-full border border-[#FF6000]/30 bg-orange-50 px-4 py-1.5 backdrop-blur-md mb-4">
            <Droplets className="h-4 w-4 text-[#FF6000] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold">
              BIO-ENGINEERED PURITY
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-black">
            WHAT INSIDE THE <span className="text-[#FF6000]">CAN MATTERS</span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-sm md:text-base text-zinc-600 font-medium">
            Four foundational pillars crafted without compromises. High performance formula designed for mind & body.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.floatDelay,
                }}
                data-cursor-text="INGREDIENT"
                className="glass-card-light rounded-3xl p-6 flex flex-col justify-between group border border-black/10 hover:border-[#FF6000]/40 bg-white"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl border border-orange-200 bg-orange-50 text-[#FF6000]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-[#FF6000]">
                      {item.amount}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-black mb-1">
                    {item.name}
                  </h3>
                  <p className="font-mono text-xs text-[#FF6000] font-bold mb-4">
                    {item.benefit}
                  </p>

                  <p className="font-sans text-xs text-zinc-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[10px] uppercase text-zinc-500 font-semibold">
                  <span>CLINICALLY TESTED</span>
                  <span className="text-emerald-600">100% PURE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
