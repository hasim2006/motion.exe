"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement)[]>([]);

  const addToRefs = (el: HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToViewer = () => {
    const el = document.getElementById("viewer");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative w-full min-h-screen py-28 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-center z-20 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
        
        {/* Left Column: Pre-Trade Energy & Ingredients */}
        <div className="md:col-span-4 flex flex-col justify-between h-[480px]">
          {/* Top Block */}
          <div ref={addToRefs}>
            <p className="font-mono text-xs uppercase text-zinc-600 font-semibold tracking-widest mb-1">
              Pre-Trade Energy
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-black tracking-widest leading-none mb-2">
              SOLANA<br />SPLASH
            </h2>
            <p className="font-sans text-xs text-zinc-600 font-medium">
              330ml with Zero Sugar
            </p>
          </div>

          {/* Bottom Block */}
          <div ref={addToRefs}>
            <h3 className="font-display text-sm font-black uppercase text-black tracking-wider mb-2">
              INGREDIENTS
            </h3>
            <p className="font-sans text-xs text-zinc-700 leading-relaxed max-w-xs font-medium">
              Caffeine, Natural Flavor, Magnesium Citrate, Sodium Citrate, Stevia Extract
            </p>
          </div>
        </div>

        {/* Center Column: Rounded Rectangle Container for 3D Can */}
        <div className="md:col-span-4 flex justify-center">
          <div 
            id="can-target-rectangle"
            className="w-full max-w-[360px] h-[480px] rounded-3xl border-2 border-zinc-400/80 bg-zinc-100/70 backdrop-blur-sm p-4 shadow-sm flex items-center justify-center relative overflow-hidden"
          >
            {/* The 3D Can translates smoothly into this rectangle container */}
          </div>
        </div>

        {/* Right Column: Introduction & Rotate Hydroflow CTA */}
        <div className="md:col-span-4 flex flex-col justify-between h-[480px]">
          {/* Top Block */}
          <div ref={addToRefs}>
            <h3 className="font-display text-sm font-black uppercase text-black tracking-wider mb-3">
              INTRODUCTION TO DRINK
            </h3>
            <p className="font-sans text-xs text-zinc-700 leading-relaxed font-medium">
              Solana Splash by HydroFlow is the world&apos;s first tokenized energy drink, blending cutting-edge blockchain innovation with peak performance. Designed for the modern trader, Solana Splash combines refreshing taste with tokenized transparency, redefining how you hydrate and energize.
            </p>
          </div>

          {/* Bottom Block: Rotate Hydroflow Orange Button */}
          <div ref={addToRefs} className="flex justify-start md:justify-start">
            <button 
              onClick={scrollToViewer}
              data-cursor-text="ROTATE"
              className="rounded-xl bg-[#FF6000] hover:bg-[#e05400] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Rotate Hydroflow
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
