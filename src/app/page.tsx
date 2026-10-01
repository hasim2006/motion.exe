"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductViewer from "@/components/ProductViewer";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import InteractiveTimeline from "@/components/InteractiveTimeline";
import IngredientsSection from "@/components/IngredientsSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import FAQAccordion from "@/components/FAQAccordion";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Dynamically import 3D background canvas with ssr: false
const Can3DCanvas = dynamic(() => import("@/components/Can3DCanvas"), {
  ssr: false,
});

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <LenisProvider>
      <main className="relative min-h-screen bg-[#EAECEE] bg-grid-pattern text-black overflow-x-hidden">
        {/* Custom Morphing Magnetic Cursor */}
        <CustomCursor />

        {/* Immersive Preloader */}
        <Preloader onComplete={() => setLoadingComplete(true)} />

        {/* Fixed 3D Silver Can Background Canvas */}
        <Can3DCanvas />

        {/* Main Content Sections */}
        <div 
          className={`transition-opacity duration-1000 ${
            loadingComplete ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Navbar />
          <HeroSection />
          <MarqueeBanner />
          <AboutSection />
          <ProductViewer />
          <InteractiveTimeline />
          <IngredientsSection />
          <StatsSection />
          <TestimonialsGrid />
          <FAQAccordion />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </LenisProvider>
  );
}
