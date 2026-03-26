"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const videos = [
  { id: "purple-waves", label: "Purple Waves" },
  { id: "abstract-flow", label: "Abstract Flow" },
  { id: "dark-particles", label: "Dark Particles" },
  { id: "neon-glow", label: "Neon Glow" },
];

export default function VideoBackground() {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState("purple-waves");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const videoSrc = `/backgrounds/${currentVideo}.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideo]);

  const toggleSelector = useCallback(() => setSelectorOpen((v) => !v), []);
  const selectVideo = useCallback((id: string) => {
    setCurrentVideo(id);
    setSelectorOpen(false);
  }, []);

  const opacity = theme === "dark" ? 0.35 : 0.15;
  const darkness = theme === "dark" ? 0.55 : 0.3;

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {mounted && (
          <video
            ref={videoRef}
            className="absolute w-full h-full object-cover"
            style={{ opacity, willChange: "opacity" }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              theme === "dark"
                ? `rgba(5,8,22,${darkness})`
                : `rgba(249,248,252,${darkness})`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(ellipse at center, transparent 30%, rgba(5,8,22,0.85) 100%)"
                : "radial-gradient(ellipse at center, transparent 30%, rgba(249,248,252,0.9) 100%)",
          }}
        />
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleSelector}
          className="w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-lg hover:scale-105 active:scale-95"
          title="Change background"
          aria-label="Change background video"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
        </button>

        <AnimatePresence>
          {selectorOpen && (
            <m.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 right-0 glass-card p-3 w-48"
            >
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2 px-1">
                Background
              </p>
              {videos.map((v) => (
                <button
                  key={v.id}
                  onClick={() => selectVideo(v.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentVideo === v.id
                      ? "bg-white/[0.08] text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
