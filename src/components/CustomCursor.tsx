"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      const textTarget = target.closest("[data-cursor-text]") as HTMLElement | null;

      if (textTarget) {
        setCursorText(textTarget.getAttribute("data-cursor-text") || "");
        setIsHovered(true);
      } else if (cursorTarget || target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden md:block">
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-solana-cyan shadow-[0_0_12px_#00F5D4]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />

      {/* Outer Follower Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-solana-cyan/40 bg-solana-cyan/10 backdrop-blur-sm"
        animate={{
          x: mousePosition.x - (cursorText ? 40 : isHovered ? 28 : 20),
          y: mousePosition.y - (cursorText ? 40 : isHovered ? 28 : 20),
          width: cursorText ? 80 : isHovered ? 56 : 40,
          height: cursorText ? 80 : isHovered ? 56 : 40,
          borderColor: isHovered ? "rgba(0, 245, 212, 0.8)" : "rgba(0, 245, 212, 0.25)",
          backgroundColor: isHovered ? "rgba(0, 245, 212, 0.15)" : "rgba(0, 245, 212, 0.03)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {cursorText && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-solana-cyan text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
