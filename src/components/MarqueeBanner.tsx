"use client";

export default function MarqueeBanner() {
  const items = [
    "PURE HYDRATION",
    "ZERO SUGAR",
    "BLOCKCHAIN-POWERED",
    "SOLANA ECOSYSTEM",
    "330ML ALUMINUM",
    "NFC VERIFIED",
    "RECYCLE & EARN",
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#0B0C12] py-4 select-none z-20">
      <div className="flex w-max animate-marquee gap-8">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-display text-lg md:text-xl font-bold uppercase tracking-wider text-white/80 hover:text-solana-cyan transition-colors">
              {text}
            </span>
            <span className="text-solana-purple font-mono text-sm">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
