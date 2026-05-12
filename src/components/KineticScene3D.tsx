"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";

type KineticScene3DProps = {
  className?: string;
};

export default function KineticScene3D({ className = "" }: KineticScene3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;
    let frame = 0;
    let cleanup = () => {};

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const start = async () => {
      const THREE = await import("three");
      if (!mounted) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0.2, 7);

      const rig = new THREE.Group();
      scene.add(rig);

      const disposables: Array<{ dispose: () => void }> = [];
      const materialSet: Three.Material[] = [];

      const teal = new THREE.Color("#4ad7c8");
      const amber = new THREE.Color("#d8a85f");
      const ivory = new THREE.Color("#ede7dc");

      const makeSolidMaterial = (
        color: Three.Color,
        options: { opacity?: number; metalness?: number; roughness?: number } = {}
      ) => {
        const material = new THREE.MeshStandardMaterial({
          color,
          metalness: options.metalness ?? 0.58,
          roughness: options.roughness ?? 0.28,
          transparent: true,
          opacity: options.opacity ?? 0.92,
        });
        materialSet.push(material);
        return material;
      };

      const ambientLight = new THREE.AmbientLight("#ede7dc", 0.72);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight("#ffffff", 2.1);
      keyLight.position.set(3.2, 3.6, 4.5);
      scene.add(keyLight);

      const tealLight = new THREE.PointLight("#4ad7c8", 2.8, 9);
      tealLight.position.set(-2.4, 1.8, 2.6);
      scene.add(tealLight);

      const goldLight = new THREE.PointLight("#d8a85f", 2.2, 8);
      goldLight.position.set(2.6, -1.7, 2.2);
      scene.add(goldLight);

      const coreGeometry = new THREE.IcosahedronGeometry(0.92, 2);
      const core = new THREE.Mesh(
        coreGeometry,
        makeSolidMaterial(teal, { opacity: 0.76, metalness: 0.74, roughness: 0.2 })
      );
      core.rotation.set(0.5, 0.15, -0.24);
      rig.add(core);
      disposables.push(coreGeometry);

      const shellGeometry = new THREE.DodecahedronGeometry(1.18, 0);
      const shell = new THREE.Mesh(
        shellGeometry,
        makeSolidMaterial(ivory, { opacity: 0.11, metalness: 0.42, roughness: 0.18 })
      );
      shell.scale.set(1, 1, 0.74);
      rig.add(shell);
      disposables.push(shellGeometry);

      const ringMaterial = makeSolidMaterial(amber, { opacity: 0.72, metalness: 0.7, roughness: 0.24 });
      const tealRingMaterial = makeSolidMaterial(teal, { opacity: 0.48, metalness: 0.66, roughness: 0.18 });
      const ivoryMaterial = makeSolidMaterial(ivory, { opacity: 0.5, metalness: 0.5, roughness: 0.22 });

      const rings: Three.Object3D[] = [];
      [
        { radius: 1.64, tube: 0.055, rotation: [Math.PI / 2.24, 0.18, 0.18], material: ringMaterial },
        { radius: 1.95, tube: 0.032, rotation: [Math.PI / 2, 0.9, -0.32], material: tealRingMaterial },
        { radius: 2.23, tube: 0.022, rotation: [Math.PI / 2.55, -0.58, 0.44], material: ivoryMaterial },
      ].forEach(({ radius, tube, rotation, material }) => {
        const geometry = new THREE.TorusGeometry(radius, tube, 24, 168);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
        rings.push(mesh);
        rig.add(mesh);
        disposables.push(geometry);
      });

      const bladeGeometry = new THREE.BoxGeometry(0.68, 0.07, 0.16);
      const blades: Three.Mesh[] = [];
      for (let index = 0; index < 8; index += 1) {
        const blade = new THREE.Mesh(
          bladeGeometry,
          index % 2 === 0
            ? makeSolidMaterial(amber, { opacity: 0.72, metalness: 0.72, roughness: 0.2 })
            : makeSolidMaterial(teal, { opacity: 0.5, metalness: 0.62, roughness: 0.22 })
        );
        const angle = (index / 8) * Math.PI * 2;
        blade.position.set(Math.cos(angle) * 1.64, Math.sin(angle) * 1.64, index % 2 ? 0.42 : -0.42);
        blade.rotation.z = angle;
        blade.rotation.y = index % 2 ? 0.82 : -0.82;
        blades.push(blade);
        rig.add(blade);
      }
      disposables.push(bladeGeometry);

      const beadGeometry = new THREE.SphereGeometry(0.055, 18, 18);
      const beads: Three.Mesh[] = [];
      for (let index = 0; index < 10; index += 1) {
        const bead = new THREE.Mesh(beadGeometry, index % 3 === 0 ? ringMaterial : tealRingMaterial);
        beads.push(bead);
        rig.add(bead);
      }
      disposables.push(beadGeometry);

      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        const width = Math.max(Math.floor(bounds.width), 1);
        const height = Math.max(Math.floor(bounds.height), 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const compact = width < 220;
        rig.scale.setScalar(compact ? 0.9 : 1.06);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(canvas);

      const render = (time = 0) => {
        const t = time * 0.001;

        rig.rotation.y = Math.sin(t * 0.42) * 0.18 + pointer.x * 0.22;
        rig.rotation.x = Math.cos(t * 0.38) * 0.1 - pointer.y * 0.14;
        rig.position.y = Math.sin(t * 0.72) * 0.05;
        core.rotation.x = 0.5 + t * 0.42;
        core.rotation.y = 0.15 + t * 0.55;
        core.scale.setScalar(1 + Math.sin(t * 1.4) * 0.025);
        shell.rotation.y = -t * 0.22;
        shell.rotation.z = t * 0.12;

        rings.forEach((ring, index) => {
          ring.rotation.z += 0.003 + index * 0.0015;
          ring.rotation.y += 0.0018 + index * 0.0012;
        });

        blades.forEach((blade, index) => {
          blade.rotation.x = Math.sin(t * 0.9 + index) * 0.18;
          blade.position.z = (index % 2 ? 0.42 : -0.42) + Math.sin(t * 1.1 + index) * 0.08;
        });

        beads.forEach((bead, index) => {
          const angle = t * (0.42 + index * 0.015) + (index / beads.length) * Math.PI * 2;
          const radius = index % 2 === 0 ? 2.0 : 1.56;
          bead.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle * 0.92) * radius * 0.42,
            Math.sin(angle) * 0.72
          );
        });

        renderer.render(scene, camera);
        if (!reducedMotion) frame = requestAnimationFrame(render);
      };

      resize();
      render();

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        disposables.forEach((item) => item.dispose());
        materialSet.forEach((material) => material.dispose());
        renderer.dispose();
      };
    };

    void start();

    return () => {
      mounted = false;
      window.removeEventListener("pointermove", onPointerMove);
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`element-3d-canvas ${className}`} />;
}
