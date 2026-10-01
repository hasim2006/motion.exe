"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, Moon, Zap, Rotate3d, Info } from "lucide-react";
import Can3D, { FlavorType } from "./Can3D";

type LightingPreset = "cyber" | "dark" | "solar";

const FLAVOR_METADATA: Record<FlavorType, { title: string; subtitle: string; desc: string; hex: string; accent: string; electrolytes: string; minerals: string }> = {
  cyan: {
    title: "Solana Splash",
    subtitle: "Pure Alpine Hydration",
    desc: "Sourced from pristine high-altitude glacial springs, infused with bio-identical ionic minerals and cryptographic NFC authentication.",
    hex: "#FF6000",
    accent: "#3B82F6",
    electrolytes: "750mg",
    minerals: "Ph 8.5+",
  },
  violet: {
    title: "Quantum Violet",
    subtitle: "Aero Electro Boost",
    desc: "Engineered for maximum cellular absorption with zero artificial sweeteners, natural blueberry terpenes, and fast-acting potassium ions.",
    hex: "#9945FF",
    accent: "#00F5D4",
    electrolytes: "920mg",
    minerals: "Ph 9.0+",
  },
  mint: {
    title: "Neon Mint",
    subtitle: "Cellular Recovery Formula",
    desc: "Crisp natural spearmint essence blended with magnesium glycinate and trace ocean minerals to optimize muscle recovery.",
    hex: "#10B981",
    accent: "#00F5D4",
    electrolytes: "850mg",
    minerals: "Ph 8.8+",
  },
  amber: {
    title: "Solar Amber",
    subtitle: "Citrus Energy Infusion",
    desc: "Sun-ripened blood orange and yuzu extracts combined with L-theanine and organic B-complex vitamins for smooth, jitter-free focus.",
    hex: "#F59E0B",
    accent: "#FFD166",
    electrolytes: "800mg",
    minerals: "Ph 8.2+",
  },
};

const HOTSPOTS = [
  {
    id: "nfc",
    title: "Cryptographic NFC Chip",
    description: "Tamper-proof NFC tag embedded directly under the aluminum lip. Scan with any smartphone to verify authenticity & earn hydra tokens.",
    badge: "Solana On-Chain",
  },
  {
    id: "spring",
    title: "Alpine Spring Source",
    description: "Filtered through ancient glacial rock formations over 50 years, yielding pure mineral balance and natural alkalinity.",
    badge: "100% Alpine Purity",
  },
  {
    id: "can",
    title: "Infinite Aluminum",
    description: "Lightweight 330ml infinitely recyclable aluminum shell with zero plastic lining and UV light protection.",
    badge: "Zero Waste",
  },
];

export default function ProductViewer() {
  const [activeFlavor, setActiveFlavor] = useState<FlavorType>("cyan");
  const [activeLight, setActiveLight] = useState<LightingPreset>("cyber");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const flavorData = FLAVOR_METADATA[activeFlavor];

  return (
    <section id="viewer" className="relative min-h-screen w-full py-24 px-4 md:px-8 overflow-hidden border-t border-black/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 rounded-full border border-[#FF6000]/30 bg-orange-50 px-4 py-1.5 backdrop-blur-md mb-4">
            <Rotate3d className="h-4 w-4 text-[#FF6000] animate-spin" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold">
              3D INTERACTIVE PRODUCT STUDIO
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-black">
            INSPECT & <span className="text-[#FF6000]">CUSTOMIZE</span>
          </h2>
          <p className="mt-3 max-w-xl font-sans text-sm md:text-base text-zinc-600 font-medium">
            Drag to rotate in 360°, pinch to zoom, switch custom flavor profiles, and inspect key product architecture.
          </p>
        </div>

        {/* Main 3D Viewer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            <div className="glass-card-light rounded-3xl p-6 relative bg-white border border-black/10 shadow-sm">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
                [ SELECT FLAVOR EDITION ]
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(FLAVOR_METADATA) as FlavorType[]).map((fKey) => {
                  const item = FLAVOR_METADATA[fKey];
                  const isActive = activeFlavor === fKey;
                  return (
                    <button
                      key={fKey}
                      onClick={() => setActiveFlavor(fKey)}
                      data-cursor-text="SELECT"
                      className={`flex flex-col items-start p-3.5 rounded-2xl border transition-all text-left ${
                        isActive
                          ? "border-[#FF6000] bg-orange-50 shadow-sm"
                          : "border-black/10 bg-zinc-50 hover:border-black/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="h-3 w-3 rounded-full shadow-sm"
                          style={{ backgroundColor: item.hex }}
                        />
                        <span className="font-display text-xs font-bold text-black uppercase">
                          {item.title}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 font-medium">
                        {item.electrolytes} • {item.minerals}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Flavor Detail Specs */}
              <div className="mt-6 pt-6 border-t border-black/10">
                <h4 className="font-display text-xl font-bold text-black mb-1">
                  {flavorData.title}
                </h4>
                <p className="font-mono text-xs uppercase text-[#FF6000] font-bold mb-3">
                  {flavorData.subtitle}
                </p>
                <p className="font-sans text-xs leading-relaxed text-zinc-600 font-medium">
                  {flavorData.desc}
                </p>
              </div>
            </div>

            {/* Environment Lighting */}
            <div className="glass-card-light rounded-3xl p-6 bg-white border border-black/10 shadow-sm">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
                [ ENVIRONMENT LIGHTING ]
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveLight("cyber")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 font-mono text-xs border font-bold transition-all ${
                    activeLight === "cyber"
                      ? "border-[#FF6000] bg-orange-50 text-[#FF6000]"
                      : "border-black/10 text-zinc-600 hover:text-black"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>STUDIO</span>
                </button>
                <button
                  onClick={() => setActiveLight("dark")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 font-mono text-xs border font-bold transition-all ${
                    activeLight === "dark"
                      ? "border-purple-600 bg-purple-50 text-purple-600"
                      : "border-black/10 text-zinc-600 hover:text-black"
                  }`}
                >
                  <Moon className="h-3.5 w-3.5" />
                  <span>DARK</span>
                </button>
                <button
                  onClick={() => setActiveLight("solar")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 font-mono text-xs border font-bold transition-all ${
                    activeLight === "solar"
                      ? "border-amber-500 bg-amber-50 text-amber-600"
                      : "border-black/10 text-zinc-600 hover:text-black"
                  }`}
                >
                  <Sun className="h-3.5 w-3.5" />
                  <span>SOLAR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center 3D Canvas */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div 
              data-cursor-text="DRAG 3D"
              className="relative h-[480px] md:h-[580px] w-full rounded-3xl border border-black/10 bg-white shadow-lg overflow-hidden"
            >
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-[11px] font-mono text-zinc-700 font-bold backdrop-blur-md shadow-sm">
                <Info className="h-3.5 w-3.5 text-[#FF6000]" />
                <span>ROTATE WITH MOUSE / TOUCH</span>
              </div>

              <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={1.2} />
                <directionalLight position={[5, 10, 7]} intensity={2.5} color="#ffffff" />
                <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#ffffff" />
                <Environment preset="studio" />

                <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
                  <Can3D flavor={activeFlavor} interactive={true} />
                </Float>

                <OrbitControls 
                  enableZoom={true}
                  minDistance={4}
                  maxDistance={8}
                  enablePan={false}
                  autoRotate={false}
                  rotateSpeed={0.8}
                />
              </Canvas>

              {/* Hotspot Interactive Popups */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 justify-center">
                {HOTSPOTS.map((spot) => {
                  const isActive = activeHotspot === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono transition-all font-semibold ${
                        isActive
                          ? "border-[#FF6000] bg-[#FF6000] text-white shadow-sm"
                          : "border-black/10 bg-white/90 text-zinc-800 hover:border-black/30 backdrop-blur-md shadow-sm"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{spot.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hotspot Detail Card Overlay */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 rounded-2xl bg-white p-5 border border-[#FF6000]/40 shadow-md"
                >
                  {HOTSPOTS.filter((s) => s.id === activeHotspot).map((spot) => (
                    <div key={spot.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-black text-base">
                            {spot.title}
                          </span>
                          <span className="rounded-full bg-orange-100 border border-orange-200 px-2.5 py-0.5 font-mono text-[10px] uppercase text-[#FF6000] font-bold">
                            {spot.badge}
                          </span>
                        </div>
                        <p className="mt-1 font-sans text-xs text-zinc-600 leading-relaxed max-w-2xl font-medium">
                          {spot.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="self-start sm:self-center font-mono text-xs text-[#FF6000] font-bold hover:underline shrink-0"
                      >
                        CLOSE [X]
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
