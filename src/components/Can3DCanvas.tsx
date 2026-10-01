"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import Can3D from "./Can3D";

export default function Can3DCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 h-screen w-screen flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 7]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#ffffff" />
        <spotLight position={[0, 10, 0]} intensity={1.5} color="#ffffff" angle={0.6} penumbra={1} />
        <pointLight position={[3, 2, 3]} intensity={1} color="#ffffff" />

        <Environment preset="studio" />

        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
          <Can3D />
        </Float>
      </Canvas>
    </div>
  );
}
