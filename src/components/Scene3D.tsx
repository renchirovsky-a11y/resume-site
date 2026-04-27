"use client";

import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  MeshDistortMaterial,
  Environment,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// Palette aligned with the resume design system: teal (#4ad7c8) + amber (#d8a85f) + ivory (#ede7dc)
const TEAL = "#4ad7c8";
const TEAL_DEEP = "#1f8c80";
const AMBER = "#d8a85f";
const AMBER_DEEP = "#a37226";
const IVORY = "#ede7dc";

type ShapeKind = "icosa" | "octa" | "torus" | "knot" | "dodeca" | "octa-frame";

// Sparse ambient shapes — far back, only at extreme corners of viewport.
// Goal: subtle atmospheric depth, NEVER overlapping content.
const shapeData: { kind: ShapeKind; pos: [number, number, number]; scale: number; speed: number; color: string; wire?: boolean }[] = [
  // Top corners
  { kind: "icosa",      pos: [-13, 7, -14],    scale: 0.55, speed: 0.45, color: TEAL },
  { kind: "octa",       pos: [13, 7, -14],     scale: 0.5,  speed: 0.5,  color: AMBER },

  // Mid-edges only
  { kind: "torus",      pos: [-15, 0, -16],    scale: 0.45, speed: 0.4,  color: AMBER },
  { kind: "torus",      pos: [15, 0, -16],     scale: 0.45, speed: 0.45, color: TEAL },

  // Bottom corners
  { kind: "knot",       pos: [-13, -7, -14],   scale: 0.4,  speed: 0.55, color: AMBER },
  { kind: "dodeca",     pos: [13, -7, -14],    scale: 0.45, speed: 0.4,  color: IVORY },

  // Deep background fillers (very far)
  { kind: "octa-frame", pos: [-9, 4, -22],     scale: 0.5,  speed: 0.35, color: TEAL,  wire: true },
  { kind: "octa-frame", pos: [9, -4, -22],     scale: 0.5,  speed: 0.4,  color: AMBER, wire: true },
];

function FloatingShape({
  kind,
  pos,
  scale,
  speed,
  color,
  wire,
  isLight,
}: {
  kind: ShapeKind;
  pos: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  wire?: boolean;
  isLight: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.y = t * 0.55;
  });

  const geometry = useMemo(() => {
    switch (kind) {
      case "icosa":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octa":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[0.7, 0.26, 18, 48]} />;
      case "knot":
        return <torusKnotGeometry args={[0.6, 0.22, 100, 16]} />;
      case "dodeca":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "octa-frame":
        return <octahedronGeometry args={[1, 0]} />;
    }
  }, [kind]);

  return (
    <Float speed={1.0} rotationIntensity={0.5} floatIntensity={1.4} floatingRange={[-0.22, 0.22]}>
      <mesh ref={meshRef} position={pos} scale={scale}>
        {geometry}
        {wire ? (
          <meshBasicMaterial color={color} wireframe transparent opacity={isLight ? 0.55 : 0.65} />
        ) : (
          <meshPhysicalMaterial
            color={color}
            metalness={0.55}
            roughness={0.22}
            clearcoat={0.9}
            clearcoatRoughness={0.18}
            emissive={color}
            emissiveIntensity={isLight ? 0.06 : 0.15}
            envMapIntensity={1.2}
          />
        )}
      </mesh>
    </Float>
  );
}

function CenterBlob({ isLight }: { isLight: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.07;
    meshRef.current.rotation.y = t * 0.1;
  });

  // Atmospheric blob — way back, smaller, subtle so it doesn't dominate content
  return (
    <Float speed={0.35} rotationIntensity={0.15} floatIntensity={0.6} floatingRange={[-0.08, 0.08]}>
      <mesh ref={meshRef} position={[0, 0, -22]} scale={2.0}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color={isLight ? AMBER : TEAL_DEEP}
          attach="material"
          distort={0.32}
          speed={0.8}
          roughness={0.45}
          metalness={0.45}
          emissive={isLight ? AMBER_DEEP : TEAL_DEEP}
          emissiveIntensity={isLight ? 0.03 : 0.1}
          envMapIntensity={0.9}
          transparent
          opacity={0.32}
        />
      </mesh>
    </Float>
  );
}

function ParallaxRig({ enabled }: { enabled: boolean }) {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (!enabled) return;
    const targetX = mouse.x * 0.7;
    const targetY = mouse.y * 0.45;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(target.current);
  });

  return null;
}

function ScrollDriven() {
  const { camera } = useThree();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    const targetZ = 9 - scrollProgress.current * 2.5;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
  });

  return null;
}

function SceneInner({ isLight, dpr }: { isLight: boolean; dpr: number }) {
  return (
    <>
      <ambientLight intensity={isLight ? 0.7 : 0.32} color={IVORY} />
      <directionalLight position={[5, 6, 4]} intensity={isLight ? 1.1 : 0.8} color={isLight ? "#ffffff" : IVORY} />
      <pointLight position={[-6, -4, -3]} intensity={isLight ? 0.6 : 1.2} color={AMBER} />
      <pointLight position={[6, -2, 2]} intensity={isLight ? 0.6 : 1.1} color={TEAL} />

      <CenterBlob isLight={isLight} />

      {shapeData.map((s, i) => (
        <FloatingShape key={i} {...s} isLight={isLight} />
      ))}

      <Sparkles
        count={dpr > 1 ? 70 : 40}
        scale={[16, 11, 10]}
        size={1.8}
        speed={0.25}
        opacity={isLight ? 0.35 : 0.6}
        color={isLight ? AMBER : IVORY}
      />

      <Environment preset="warehouse" />

      <ParallaxRig enabled />
      <ScrollDriven />
    </>
  );
}

export default function Scene3D() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [dpr, setDpr] = useState(1.25);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);

    const mqMobile = window.matchMedia("(max-width: 768px)");
    setIsMobile(mqMobile.matches);
    const onMobile = () => setIsMobile(mqMobile.matches);
    mqMobile.addEventListener("change", onMobile);

    // Kick R3F's ResizeObserver after Next.js hydration completes (workaround for
    // canvas getting stuck at default 300x150 after Turbopack HMR or route remount)
    const kick = () => window.dispatchEvent(new Event("resize"));
    const t1 = setTimeout(kick, 60);
    const t2 = setTimeout(kick, 320);

    return () => {
      mq.removeEventListener("change", onChange);
      mqMobile.removeEventListener("change", onMobile);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted || reduceMotion) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none ambient-field"
        aria-hidden
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="ambient-field absolute inset-0" aria-hidden />
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={[1, isMobile ? 1.4 : 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <PerformanceMonitor
            onIncline={() => setDpr((d) => Math.min(2, d + 0.25))}
            onDecline={() => setDpr((d) => Math.max(0.75, d - 0.25))}
            flipflops={3}
          >
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <SceneInner isLight={isLight} dpr={dpr} />
          </PerformanceMonitor>
        </Suspense>
      </Canvas>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight
            ? "radial-gradient(ellipse 70% 60% at center, transparent 5%, rgba(244,239,229,0.5) 65%, rgba(244,239,229,0.85) 100%)"
            : "radial-gradient(ellipse 70% 60% at center, transparent 5%, rgba(8,10,13,0.55) 65%, rgba(8,10,13,0.85) 100%)",
        }}
      />
    </div>
  );
}
