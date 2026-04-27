"use client";

import { useEffect } from "react";

// Auto-applies mouse-tracked 3D tilt to every element matching SELECTOR.
// Picks up cards added later (via MutationObserver) and tears down cleanly.
const SELECTOR = ".matte-panel, .stat-card, .contact-link, .chip, .skill-pill, .number-badge";
const NO_TILT = "[data-no-tilt]";

type State = {
  rect: DOMRect | null;
  rx: number;
  ry: number;
  tx: number;
  ty: number;
  gx: number;
  gy: number;
  scale: number;
  rafId: number | null;
  intensity: number;
  scaleHover: number;
  perspective: number;
};

const stateMap = new WeakMap<HTMLElement, State>();
const handlers = new WeakMap<
  HTMLElement,
  {
    enter: (e: PointerEvent) => void;
    move: (e: PointerEvent) => void;
    leave: () => void;
  }
>();

function getConfig(el: HTMLElement) {
  // Subtle by default — strong tilt creates visual noise on text-heavy cards
  if (el.classList.contains("chip") || el.classList.contains("skill-pill")) {
    return { intensity: 6, scaleHover: 1.04, perspective: 800 };
  }
  if (el.classList.contains("number-badge")) {
    return { intensity: 10, scaleHover: 1.05, perspective: 700 };
  }
  if (el.classList.contains("stat-card")) {
    return { intensity: 5, scaleHover: 1.015, perspective: 1100 };
  }
  if (el.classList.contains("contact-link")) {
    return { intensity: 6, scaleHover: 1.02, perspective: 1000 };
  }
  return { intensity: 3, scaleHover: 1.005, perspective: 1800 };
}

function ensureBaseStyles(el: HTMLElement) {
  if (!el.dataset.tiltApplied) {
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";
    el.dataset.tiltApplied = "1";
    el.classList.add("tilt-bound");
  }
}

function tick(el: HTMLElement, s: State) {
  s.rx += (s.tx - s.rx) * 0.13;
  s.ry += (s.ty - s.ry) * 0.13;
  s.gx += (s.gx === s.gx ? 0 : 0); // no-op stub kept for future easing
  el.style.transform = `perspective(${s.perspective}px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) scale3d(${s.scale.toFixed(3)}, ${s.scale.toFixed(3)}, ${s.scale.toFixed(3)})`;
  el.style.setProperty("--tilt-glare-x", `${s.gx.toFixed(1)}%`);
  el.style.setProperty("--tilt-glare-y", `${s.gy.toFixed(1)}%`);

  const settled =
    Math.abs(s.tx - s.rx) < 0.02 && Math.abs(s.ty - s.ry) < 0.02;
  if (settled) {
    s.rafId = null;
    return;
  }
  s.rafId = requestAnimationFrame(() => tick(el, s));
}

function attach(el: HTMLElement) {
  if (handlers.has(el)) return;
  if (el.matches(NO_TILT)) return;
  ensureBaseStyles(el);

  const cfg = getConfig(el);
  const s: State = {
    rect: null,
    rx: 0,
    ry: 0,
    tx: 0,
    ty: 0,
    gx: 50,
    gy: 50,
    scale: 1,
    rafId: null,
    ...cfg,
  };
  stateMap.set(el, s);

  const enter = () => {
    s.rect = el.getBoundingClientRect();
    s.scale = cfg.scaleHover;
  };

  const move = (e: PointerEvent) => {
    if (!s.rect) s.rect = el.getBoundingClientRect();
    const x = (e.clientX - s.rect.left) / s.rect.width;
    const y = (e.clientY - s.rect.top) / s.rect.height;
    s.ty = (x - 0.5) * 2 * s.intensity;
    s.tx = -(y - 0.5) * 2 * s.intensity;
    s.gx = x * 100;
    s.gy = y * 100;
    if (s.rafId == null) s.rafId = requestAnimationFrame(() => tick(el, s));
  };

  const leave = () => {
    s.tx = 0;
    s.ty = 0;
    s.gx = 50;
    s.gy = 50;
    s.scale = 1;
    s.rect = null;
    if (s.rafId == null) s.rafId = requestAnimationFrame(() => tick(el, s));
  };

  el.addEventListener("pointerenter", enter);
  el.addEventListener("pointermove", move, { passive: true });
  el.addEventListener("pointerleave", leave);
  handlers.set(el, { enter, move, leave });
}

function detach(el: HTMLElement) {
  const h = handlers.get(el);
  if (!h) return;
  el.removeEventListener("pointerenter", h.enter);
  el.removeEventListener("pointermove", h.move);
  el.removeEventListener("pointerleave", h.leave);
  handlers.delete(el);
  const s = stateMap.get(el);
  if (s?.rafId) cancelAnimationFrame(s.rafId);
  stateMap.delete(el);
  el.style.transform = "";
  delete el.dataset.tiltApplied;
  el.classList.remove("tilt-bound");
}

export default function TiltAuto() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || isCoarsePointer) return;

    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => attach(el));
    };

    scan();

    let scanTimer: number | null = null;
    const scheduleScan = () => {
      if (scanTimer != null) return;
      scanTimer = window.setTimeout(() => {
        scanTimer = null;
        scan();
      }, 150);
    };

    // Only re-scan if a mutation actually added a tilt-eligible node
    const matchesSelector = (n: Node): boolean => {
      if (!(n instanceof Element)) return false;
      if (n.matches(SELECTOR)) return true;
      return n.querySelector?.(SELECTOR) != null;
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const n of m.addedNodes) {
          if (matchesSelector(n)) {
            scheduleScan();
            return;
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (scanTimer != null) clearTimeout(scanTimer);
      observer.disconnect();
      document.querySelectorAll<HTMLElement>(".tilt-bound").forEach((el) => detach(el));
    };
  }, []);

  return null;
}
