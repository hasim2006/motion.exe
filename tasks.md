# Hydroflow - Product Landing Page Implementation Tasks

## Design System & Color Palette
- **Base Background (Deep Obsidian):** `#08090D`
- **Surface Dark (Elevated Cards):** `#12141D` / `#161925`
- **Text Primary (Crisp White):** `#FFFFFF`
- **Text Secondary (Silver Gray):** `#94A3B8`
- **Accents:**
  - Solana Purple: `#9945FF` / `#9D4EDD`
  - Neon Cyan: `#00F5D4` / `#00E5FF`
  - Solana Electric Green: `#14F195`
- **Gradients:** `linear-gradient(135deg, #9945FF 0%, #00F5D4 50%, #14F195 100%)`
- **Typography:** Giant brutalist sans-serif headings (`Syne`, `Space Grotesk`, or wide system sans-serif) + `Inter` / `JetBrains Mono` for body & data accents.

## Architecture & Component Breakdown

```
src/
├── app/
│   ├── globals.css          # Dark theme styles, custom scrollbar, keyframes, glow utilities
│   ├── layout.tsx           # Font setup, metadata, global providers
│   └── page.tsx             # Main orchestrator page
├── components/
│   ├── Preloader.tsx        # Fullscreen counter loader with GSAP fade-out & reveal
│   ├── Navbar.tsx           # Glassmorphism header with logo & wallet/buy CTA
│   ├── HeroSection.tsx      # Center brutalist text + floating badge stats + scan CTA
│   ├── Can3DCanvas.tsx      # R3F canvas wrapper & lighting setup
│   ├── Can3D.tsx            # 3D procedural metallic aluminum drink can with texture & GSAP scroll rotation
│   ├── MarqueeBanner.tsx    # Infinite scrolling text banner ("Pure. Refreshing. Blockchain-Powered. ✦")
│   ├── AboutSection.tsx     # Staggered fade-up text reveal ("WHERE WATER MEETS INNOVATION")
│   ├── FeaturesGrid.tsx     # Web3 hydration specs (Zero Sugar, 330ml, NFC Verified, Token Rewards)
│   ├── TestimonialsGrid.tsx # Sleek minimalist card grid with quotes
│   ├── FAQAccordion.tsx     # Collapsible FAQ (Incubation program, hydration token, verification)
│   └── Footer.tsx           # High-contrast footer with social links & newsletter
```

## Phase Execution Plan
1. **Phase 1: Project Initialization & Config**
   - Initialize Next.js 14/15 App Router app in root directory.
   - Configure Tailwind CSS with custom colors, gradients, and font families.
   - Install dependencies: `gsap`, `framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`, `clsx`, `tailwind-merge`.

2. **Phase 2: Preloader & Layout Foundation**
   - Build `Preloader` with animated percentage counter (`0% -> 100%`) using GSAP/Framer Motion.
   - Create high-contrast `Navbar` and hero placeholder layout.

3. **Phase 3: Content Sections & Static UI**
   - Implement `HeroSection` layout with bold center brutalist headings ("TOKENIZING HYDRATION", "HYDROFLOW").
   - Build `MarqueeBanner` using seamless infinite CSS keyframes.
   - Build `AboutSection` with asymmetric layout and feature cards.
   - Build `TestimonialsGrid` and `FAQAccordion` with interactive expand/collapse state.
   - Build `Footer`.

4. **Phase 4: 3D Can & GSAP Integration**
   - Build 3D Can model component in R3F with realistic metallic cylinder materials, pull-tab rim detail, and custom Hydroflow Solana Splash graphics texture.
   - Attach GSAP ScrollTrigger to sync the 3D can rotation (`rotation.y`, `rotation.x`, `position.y`, `scale`) smoothly with page scrolling.
   - Add GSAP staggered scroll triggers for section headings, text reveals, and floating badges.

5. **Phase 5: Verification & Polish**
   - Verify responsiveness across mobile, tablet, desktop.
   - Check performance, smooth 60fps scrolling, and lighting intensity.
