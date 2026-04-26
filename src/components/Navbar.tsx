"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useLang } from "./LangProvider";
import { useTheme } from "./ThemeProvider";

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
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
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
      { rootMargin: "-36% 0px -58% 0px" }
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
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.62, ease }}
        className={`fixed left-1/2 top-4 z-50 flex w-[min(930px,calc(100vw-24px))] -translate-x-1/2 items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-[color:var(--line-strong)] bg-[color:var(--panel-strong)] shadow-[0_16px_42px_rgba(0,0,0,0.24)]"
            : "border-[color:var(--line)] bg-[rgba(12,16,20,0.66)]"
        }`}
        aria-label="Primary navigation"
      >
        <a
          href="#"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color:var(--teal)] bg-[rgba(74,215,200,0.06)] text-[15px] font-black text-ivory shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          aria-label="Samir Renchirovsky home"
        >
          SR
        </a>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2 text-[13px] font-bold transition-colors duration-200 ${
                active === link.href
                  ? "text-ivory"
                  : "text-muted hover:text-ivory"
              }`}
            >
              {active === link.href && (
                <m.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full border border-[color:var(--line)] bg-white/[0.055]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <div className="flex rounded-full border border-[color:var(--line)] bg-white/[0.025] p-1">
            {(["en", "ru"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`relative h-9 rounded-full px-3 text-xs font-black uppercase transition-colors duration-200 ${
                  lang === l ? "text-ivory" : "text-subtle hover:text-muted"
                }`}
                aria-pressed={lang === l}
              >
                {lang === l && (
                  <m.span
                    layoutId="lang-active"
                    className="absolute inset-0 rounded-full border border-[color:var(--teal)] bg-[color:var(--teal-soft)]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--line)] bg-white/[0.025] text-muted transition-colors duration-200 hover:border-[color:var(--line-strong)] hover:text-ivory"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={theme}
                initial={{ opacity: 0, rotate: -35, scale: 0.75 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.75 }}
                transition={{ duration: 0.18 }}
              >
                {theme === "dark" ? (
                  <Sun size={17} className="text-[color:var(--amber)]" />
                ) : (
                  <Moon size={17} className="text-[color:var(--teal)]" />
                )}
              </m.span>
            </AnimatePresence>
          </button>

          <div className="hidden h-10 items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/[0.025] px-4 text-[12px] font-black uppercase text-[color:var(--teal)] lg:flex">
            <span className="h-2 w-2 rounded-full bg-[color:var(--teal)] shadow-[0_0_18px_var(--teal)]" />
            {t("nav.available")}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-[color:var(--line)] bg-white/[0.035] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </m.nav>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.24, ease }}
            className="matte-panel fixed left-3 right-3 top-20 z-50 p-3 md:hidden"
          >
            <div className="panel-inner space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-[8px] px-4 py-3 text-sm font-bold ${
                    active === link.href
                      ? "bg-[color:var(--teal-soft)] text-ivory"
                      : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 border-t border-[color:var(--line)] px-4 pt-3">
                {(["en", "ru"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-black uppercase ${
                      lang === l
                        ? "border-[color:var(--teal)] bg-[color:var(--teal-soft)]"
                        : "border-[color:var(--line)] text-subtle"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-[color:var(--line)]"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
