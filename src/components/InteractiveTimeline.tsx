"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mountain, Filter, Zap, QrCode, Cpu } from "lucide-react";

const TIMELINE_STEPS = [
  {
    step: "01",
    icon: Mountain,
    title: "Glacial Spring Extraction",
    subtitle: "High-Altitude Alpine Source",
    description: "Water naturally filtered through 500 meters of pristine glacial granite over 50 years, capturing rare ionic trace minerals.",
    stats: "2,400m Altitude",
  },
  {
    step: "02",
    icon: Filter,
    title: "Micro-Filtration",
    subtitle: "0.1 Micron Precision",
    description: "Advanced ceramic membrane filtration removes all impurities while keeping natural bicarbonate & mineral alkalinity intact.",
    stats: "pH 8.5 Natural",
  },
  {
    step: "03",
    icon: Zap,
    title: "Bio-Electrolyte Infusion",
    subtitle: "Ionic Balance Formula",
    description: "Precision-blended with potassium, magnesium glycinate, and bio-available sodium for instantaneous cellular hydration.",
    stats: "850mg Bio-Ions",
  },
  {
    step: "04",
    icon: QrCode,
    title: "NFC Chip Tagging",
    subtitle: "Laser Embedded Under Rim",
    description: "Every aluminum can receives an encrypted NTAG213 microchip before final hermetic sealing.",
    stats: "0ms Scan Latency",
  },
  {
    step: "05",
    icon: Cpu,
    title: "Solana On-Chain Proof",
    subtitle: "Cryptographic Authentication",
    description: "Scanning your can generates a real-time proof-of-hydration on Solana, unlocking liquid token rewards & DAO perks.",
    stats: "100% On-Chain",
  },
];

export default function InteractiveTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="timeline" className="relative min-h-screen w-full py-28 px-4 md:px-8 overflow-hidden border-t border-black/10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 rounded-full border border-[#FF6000]/30 bg-orange-50 px-4 py-1.5 backdrop-blur-md w-fit mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold">
                PROCESS & PROVENANCE
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase text-black tracking-tight">
              FROM GLACIER TO <span className="text-[#FF6000]">BLOCKCHAIN</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-zinc-600 leading-relaxed font-medium">
            Follow the 5-stage precision process that turns raw alpine spring water into an authenticated on-chain beverage asset.
          </p>
        </div>

        {/* Timeline Bar & Step Selectors */}
        <div className="relative mb-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-black/10 hidden md:block" />
          <motion.div
            className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-[#FF6000] hidden md:block"
            animate={{
              width: `${(activeStep / (TIMELINE_STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {TIMELINE_STEPS.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeStep === index;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  data-cursor-text="STEP"
                  className={`flex flex-col items-start p-5 rounded-2xl border transition-all text-left group ${
                    isActive
                      ? "border-[#FF6000] bg-white shadow-lg scale-105"
                      : "border-black/10 bg-white/70 hover:border-black/20 hover:bg-white"
                  }`}
                >
                  <div className="flex w-full items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#FF6000]">
                      PHASE {item.step}
                    </span>
                    <div className={`p-2 rounded-xl ${isActive ? "bg-[#FF6000] text-white" : "bg-zinc-100 text-zinc-700"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-sm font-bold text-black uppercase line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-500 mt-1 font-medium">
                    {item.stats}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Showcase Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card-light rounded-3xl p-8 md:p-12 relative overflow-hidden border border-[#FF6000]/30 shadow-md bg-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm font-bold text-[#FF6000] uppercase tracking-widest">
                  PHASE {TIMELINE_STEPS[activeStep].step} SPECIFICATION
                </span>
                <div className="h-[1px] w-12 bg-[#FF6000]/40" />
              </div>

              <h3 className="font-display text-3xl md:text-5xl font-extrabold text-black uppercase tracking-tight mb-2">
                {TIMELINE_STEPS[activeStep].title}
              </h3>
              <p className="font-mono text-sm text-[#FF6000] uppercase mb-6 font-bold">
                {TIMELINE_STEPS[activeStep].subtitle}
              </p>

              <p className="font-sans text-base md:text-lg text-zinc-600 leading-relaxed max-w-3xl mb-8 font-medium">
                {TIMELINE_STEPS[activeStep].description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="rounded-xl border border-black/10 bg-zinc-50 px-4 py-2.5 font-mono text-xs text-black font-semibold">
                  METRIC: <span className="text-[#FF6000]">{TIMELINE_STEPS[activeStep].stats}</span>
                </div>
                <div className="rounded-xl border border-black/10 bg-zinc-50 px-4 py-2.5 font-mono text-xs text-black font-semibold">
                  VERIFICATION: <span className="text-emerald-600">AUTOMATED QA PASS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="h-44 w-44 rounded-full bg-[#FF6000] p-[2px] shadow-xl">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white text-center p-4">
                  {(() => {
                    const ActiveIcon = TIMELINE_STEPS[activeStep].icon;
                    return <ActiveIcon className="h-14 w-14 text-[#FF6000] mb-2" />;
                  })()}
                  <span className="font-mono text-xs font-bold text-black uppercase">
                    STAGE {TIMELINE_STEPS[activeStep].step}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
