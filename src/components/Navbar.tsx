"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.languages"), href: "#languages" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "experience", "skills", "languages", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <m.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-1.5 sm:py-2 rounded-full border transition-all duration-500 max-w-[calc(100vw-2rem)] ${
          scrolled
            ? "border-white/10 bg-[#0c1017]/80 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "border-white/5 bg-[#0c1017]/40 backdrop-blur-lg"
        }`}
      >
        {/* Monogram */}
        <a
          href="#"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#a36cff]/30 to-[#41caff]/30 border border-white/10 text-sm font-bold mr-1 shrink-0"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          SR
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-[13px] font-medium tracking-wide rounded-full transition-colors duration-300 ${
                active === link.href
                  ? ""
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {active === link.href && (
                <m.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Language switcher */}
        <div className="hidden md:flex items-center ml-1 p-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
          {(["en", "ru"] as const).map((l) => (
            <m.button
              key={l}
              onClick={() => setLang(l)}
              whileTap={{ scale: 0.92 }}
              className={`relative px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors duration-200 ${
                lang === l ? "" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {lang === l && (
                <m.span
                  layoutId="lang-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#a36cff]/25 to-[#41caff]/25 border border-white/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{l.toUpperCase()}</span>
            </m.button>
          ))}
        </div>

        {/* Theme toggle */}
        <m.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92, rotate: 180 }}
          transition={{ duration: 0.3, ease }}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] ml-1 hover:bg-white/[0.08] transition-colors"
        >
          <AnimatePresence mode="wait">
            <m.div
              key={theme}
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? (
                <Sun size={14} className="text-amber-400" />
              ) : (
                <Moon size={14} className="text-indigo-500" />
              )}
            </m.div>
          </AnimatePresence>
        </m.button>

        {/* Available badge */}
        <div className="hidden lg:flex items-center ml-1 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
          {t("nav.available")}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/5 ml-1"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </m.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease }}
            className="fixed top-20 left-4 right-4 z-50 p-4 rounded-2xl border border-white/10 bg-[#0c1017]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    active === link.href
                      ? "bg-white/[0.06]"
                      : "text-slate-400 hover:bg-white/[0.03]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile controls */}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/[0.06] px-4">
                <div className="flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  {(["en", "ru"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors ${
                        lang === l
                          ? "bg-gradient-to-r from-[#a36cff]/25 to-[#41caff]/25 border border-white/15"
                          : "text-slate-500"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08]"
                >
                  {theme === "dark" ? (
                    <Sun size={16} className="text-amber-400" />
                  ) : (
                    <Moon size={16} className="text-indigo-500" />
                  )}
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
