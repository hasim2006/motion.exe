"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type FlavorType = "cyan" | "violet" | "mint" | "amber";

interface Can3DProps {
  flavor?: FlavorType;
  interactive?: boolean;
}

export default function Can3D({ interactive = false }: Can3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Motion state tracking for buttery smooth quaternion slerp & sine floating
  const rotYRef = useRef(0);
  const targetPosYRef = useRef(0.12);
  const targetScaleRef = useRef(0.76);
  const prefersReducedMotionRef = useRef(false);

  // Touchpad, mouse & touch drag global pointer tracking ref
  const globalPointerRef = useRef({ x: 0, y: 0, active: false });

  // Reusable THREE objects for 60fps zero-allocation performance
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);
  const targetEuler = useMemo(() => new THREE.Euler(), []);

  // Universal pointer & reduced motion preferences listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotionRef.current = mediaQuery.matches;

      const handleMotionChange = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };

      mediaQuery.addEventListener("change", handleMotionChange);

      const updatePointer = (clientX: number, clientY: number) => {
        globalPointerRef.current.x = (clientX / window.innerWidth) * 2 - 1;
        globalPointerRef.current.y = -(clientY / window.innerHeight) * 2 + 1;
        globalPointerRef.current.active = true;
      };

      const handlePointerMove = (e: PointerEvent | MouseEvent) => {
        updatePointer(e.clientX, e.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          updatePointer(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("mousemove", handlePointerMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });

      return () => {
        mediaQuery.removeEventListener("change", handleMotionChange);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, []);

  // Generate silver metallic canvas texture matching reference screenshot
  const labelTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Crisp silver metallic background
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, "#DCE0E5");
      grad.addColorStop(0.2, "#FFFFFF");
      grad.addColorStop(0.5, "#E2E6EC");
      grad.addColorStop(0.8, "#FFFFFF");
      grad.addColorStop(1, "#DCE0E5");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Subtle Blue Wave Ribbon in middle matching reference image
      ctx.beginPath();
      ctx.moveTo(0, 380);
      ctx.bezierCurveTo(300, 320, 700, 440, 1024, 380);
      ctx.lineTo(1024, 460);
      ctx.bezierCurveTo(700, 520, 300, 400, 0, 460);
      ctx.closePath();
      const waveGrad = ctx.createLinearGradient(0, 0, 1024, 0);
      waveGrad.addColorStop(0, "rgba(59, 130, 246, 0.6)");
      waveGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.8)");
      waveGrad.addColorStop(1, "rgba(59, 130, 246, 0.6)");
      ctx.fillStyle = waveGrad;
      ctx.fill();

      // Top HYDRO Branding
      ctx.fillStyle = "#111111";
      ctx.font = "900 110px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("HYDROFLOW", 512, 340);

      // Subtitle "Solana Splash" matching reference image
      ctx.fillStyle = "#D97706";
      ctx.font = "bold 42px sans-serif";
      ctx.fillText("Solana Splash", 512, 600);

      // Tech details
      ctx.fillStyle = "#666666";
      ctx.font = "500 28px monospace";
      ctx.fillText("PRE-TRADE ENERGY", 512, 660);

      ctx.fillStyle = "#444444";
      ctx.font = "bold 26px monospace";
      ctx.fillText("330ML  •  ZERO SUGAR  •  ALPINE WATER", 512, 820);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Can materials
  const canMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.18,
      metalness: 0.9,
    });
  }, [labelTexture]);

  const aluminumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.1,
      metalness: 0.95,
    });
  }, []);

  // GSAP ScrollTrigger for scroll-driven Y-axis 360° rotation & stopping movement inside box
  useEffect(() => {
    if (interactive) return;

    const ctx = gsap.context(() => {
      // 1. Scroll-driven Y-axis 360-degree rotation starting when user scrolls down from top!
      gsap.fromTo(
        rotYRef,
        { current: 0 },
        {
          current: Math.PI * 2, // Complete 360° spin during scroll down
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "top 25%",
            scrub: 0.8,
          },
        }
      );

      // 2. Position & Scale timeline: Can translates into box and STOPS moving down inside #about
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      tl.to(targetPosYRef, {
        current: 0.02,
        duration: 1,
        ease: "power2.out",
      })
      .to(targetScaleRef, {
        current: 0.75,
        duration: 1,
        ease: "power2.out",
      }, 0)
      .to(targetPosYRef, {
        current: 0.02,
        duration: 3, // Stops moving down & stays centered inside #can-target-rectangle while #about is active
      })
      .to(targetPosYRef, {
        current: -6,
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, [interactive]);

  // Cinematic Touchpad, Touch & Mouse Pointer Physics Loop (360° Directional Angle Pitch/Yaw/Roll Slerp)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Respect user reduced motion preference
    if (prefersReducedMotionRef.current) {
      groupRef.current.position.set(0, targetPosYRef.current, 0.1);
      groupRef.current.rotation.set(0.12, 0, 0);
      return;
    }

    const time = state.clock.getElapsedTime();

    // Universal pointer position from touchpad, touch, or mouse (-1 to +1)
    const mouseX = globalPointerRef.current.active ? globalPointerRef.current.x : state.pointer.x;
    const mouseY = globalPointerRef.current.active ? globalPointerRef.current.y : state.pointer.y;

    // 1. 360-degree directional pointing orientation based on touchpad/cursor position
    const angleRad = Math.atan2(mouseX, 0.7);
    const pitchRad = Math.atan2(-mouseY, 0.7);

    if (interactive) {
      rotYRef.current += delta * 0.4;
    }
    const currentRotY = rotYRef.current + angleRad;

    // 2. X-axis pitch tilt: 7° base tilt - pitchRad from touchpad/mouse + subtle breath
    const tiltX = 0.12 + pitchRad * 0.45 + Math.sin(time * 0.8) * 0.02;

    // 3. Z-axis roll sway: micro roll + mouse X roll sway (-0.15 to +0.15 rad)
    const swayZ = Math.sin(time * 0.6) * 0.035 + mouseX * 0.15;

    // Build target Euler & Quaternion
    targetEuler.set(tiltX, currentRotY, swayZ, "YXZ");
    targetQuat.setFromEuler(targetEuler);

    // 4. Quaternion slerp for buttery-smooth rotation with damping & inertia
    groupRef.current.quaternion.slerp(targetQuat, 0.08);

    // 5. Smooth sine wave floating + touchpad/cursor position parallax drift in 360 degrees
    const sineFloat = Math.sin(time * 1.5) * 0.07;
    const basePosY = targetPosYRef.current;

    const targetX = mouseX * 0.35;
    const targetY = basePosY + sineFloat + mouseY * 0.28;

    // Interpolate position & scale for zero jittering
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0.1, 0.08);

    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScaleRef.current, 0.08);
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef} position={[0, 0.12, 0]} scale={[0.76, 0.76, 0.76]}>
      {/* Can Body Cylinder */}
      <mesh ref={meshRef} material={canMaterial}>
        <cylinderGeometry args={[1.2, 1.2, 3.6, 64]} />
      </mesh>

      {/* Top Metallic Rim */}
      <mesh position={[0, 1.83, 0]} material={aluminumMaterial}>
        <cylinderGeometry args={[1.15, 1.2, 0.06, 64]} />
      </mesh>
      <mesh position={[0, 1.86, 0]} material={aluminumMaterial}>
        <cylinderGeometry args={[1.12, 1.12, 0.02, 64]} />
      </mesh>

      {/* Pull Tab Detail */}
      <group position={[0.15, 1.88, 0]}>
        <mesh material={aluminumMaterial}>
          <boxGeometry args={[0.42, 0.02, 0.28]} />
        </mesh>
      </group>

      {/* Bottom Rim */}
      <mesh position={[0, -1.83, 0]} material={aluminumMaterial}>
        <cylinderGeometry args={[1.2, 1.1, 0.06, 64]} />
      </mesh>
      <mesh position={[0, -1.86, 0]} material={aluminumMaterial}>
        <cylinderGeometry args={[1.1, 1.1, 0.02, 64]} />
      </mesh>
    </group>
  );
}
