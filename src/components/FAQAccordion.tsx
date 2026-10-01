"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes Hydroflow different from ordinary spring water?",
      a: "Hydroflow combines 100% natural glacial spring water with ionic mineral electrolytes and an embedded NFC microchip under every pull tab. It connects physical daily hydration directly to cryptographic Solana on-chain rewards.",
    },
    {
      q: "How does the NFC chip verification work under the can lid?",
      a: "Inside every aluminum pull tab is a microscopic NTAG213 tag. Tap any NFC-enabled iOS or Android smartphone to instantly verify product authenticity and claim hydra token rewards without installing any third-party app.",
    },
    {
      q: "Is Hydroflow completely zero sugar and preservative free?",
      a: "Yes! Hydroflow contains zero sugar, zero artificial sweeteners, zero calories, and zero chemical preservatives. It is naturally balanced at pH 8.5+ with essential mineral electrolytes.",
    },
    {
      q: "How does the closed-loop aluminum recycling mechanism work?",
      a: "Return empty cans to any partnered smart recycling bin or drop point. Scanning the bottom barcode at the station triggers instant micro-token cashback directly into your connected Web3 wallet.",
    },
    {
      q: "Where can I buy Hydroflow cases or order wholesale?",
      a: "Hydroflow is available for direct shipment in 12-pack cases across North America, Europe, and select international Web3 events, festivals, and partner athletic facilities.",
    },
  ];

  return (
    <section 
      id="faq" 
      aria-labelledby="faq-heading"
      className="relative w-full py-28 px-4 md:px-8 overflow-hidden border-t border-black/10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6000]/30 bg-orange-50 px-4 py-1.5 backdrop-blur-md mb-3">
            <HelpCircle className="h-4 w-4 text-[#FF6000] animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold">
              KNOWLEDGE BASE
            </span>
          </div>

          <h2 id="faq-heading" className="font-display text-4xl md:text-6xl font-extrabold uppercase text-black tracking-tight">
            FREQUENTLY ASKED <span className="text-[#FF6000]">QUESTIONS</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4" role="tablist">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-button-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={idx}
                className={`glass-card-light rounded-3xl overflow-hidden border transition-all duration-300 ${
                  isOpen ? "border-[#FF6000]/50 shadow-md bg-white" : "border-black/10 hover:border-black/20"
                }`}
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  data-cursor-text="TOGGLE"
                  className="w-full px-6 py-6 flex items-center justify-between text-left text-black transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6000]"
                >
                  <span className="font-display text-base md:text-lg font-bold">
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-full border transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 border-[#FF6000] bg-orange-100 text-[#FF6000]" : "border-black/10 bg-zinc-100 text-zinc-600"}`}>
                    {isOpen ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-zinc-600 text-xs md:text-sm leading-relaxed border-t border-black/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
