"use client";

import { Quote, Star, Sparkles } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Hydroflow is redefining sustainability and purity. Combining alpine water with instant Solana NFC rewards is brilliant.",
    author: "Alex V.",
    role: "Web3 Founder & Triathlete",
    tag: "SOLANA EARLY ADOPTER",
  },
  {
    quote: "The zero sugar carbonated formula is insanely refreshing. Plus, scanning the can tab to earn rewards makes daily hydration addictively fun.",
    author: "Elena Rostova",
    role: "Fitness & Biohacking Coach",
    tag: "VERIFIED CONSUMER",
  },
  {
    quote: "Finally a physical product that bridges Web3 culture with premium design. The 330ml aluminum can looks like a piece of art.",
    author: "Marcus Chen",
    role: "Creative Director & Collector",
    tag: "ECOSYSTEM BACKER",
  },
  {
    quote: "The electrolyte balance prevents cramping during 50km trail runs. Clean taste with zero metallic aftertaste.",
    author: "Sarah Jenkins",
    role: "Ultramarathon Athlete",
    tag: "PRO ATHLETE",
  },
  {
    quote: "On-chain provenance for physical beverages is the future. Every single can is authenticated in milliseconds.",
    author: "Devon Reed",
    role: "DePIN Protocol Architect",
    tag: "VALUED BACKER",
  },
];

export default function TestimonialsGrid() {
  return (
    <section id="testimonials" className="relative w-full py-28 overflow-hidden border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 text-center mb-16">
        <div className="flex items-center justify-center gap-2 rounded-full border border-[#FF6000]/30 bg-orange-50 px-4 py-1.5 backdrop-blur-md w-fit mx-auto mb-4">
          <Sparkles className="h-4 w-4 text-[#FF6000] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold">
            COMMUNITY & REVIEWS
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-black">
          TRUSTED BY <span className="text-[#FF6000]">INNOVATORS</span>
        </h2>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="animate-marquee flex gap-6 w-max">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div
              key={idx}
              data-cursor-text="QUOTE"
              className="glass-card-light rounded-3xl p-6 w-[340px] md:w-[400px] flex flex-col justify-between shrink-0 border border-black/10 hover:border-[#FF6000]/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-6 w-6 text-[#FF6000]" />
                  <div className="flex items-center gap-1 text-[#FF6000]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-zinc-800 text-sm italic leading-relaxed mb-6 font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-sm font-bold text-black">{t.author}</h4>
                  <p className="font-sans text-xs text-zinc-500">{t.role}</p>
                </div>
                <span className="font-mono text-[9px] text-[#FF6000] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-orange-100 border border-orange-200">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
