"use client";

import { m } from "framer-motion";
import { ArrowDownRight, Send, FileDown, Sparkles, ImageIcon } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const badges = ["iGaming", "SEO", "Growth", "Leadership"];

export default function Hero() {
  const { t } = useLang();

  const stats = [
    { value: "90K+", label: t("hero.links") },
    { value: "400+", label: t("hero.influencers") },
    { value: "$100K", label: t("hero.budget") },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] halo-violet floating-orb pointer-events-none opacity-60" />
      <div className="absolute top-[10%] right-[-8%] w-[500px] h-[500px] halo-cyan floating-orb floating-orb-delayed pointer-events-none opacity-50" />
      <div className="absolute bottom-[-5%] left-[30%] w-[400px] h-[400px] halo-warm floating-orb floating-orb-slower pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
        <div className="max-w-2xl">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {badges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.3em] uppercase border border-white/10 bg-white/[0.04] text-slate-300"
              >
                {badge}
              </span>
            ))}
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-4"
          >
            <span className="text-gradient-animated">{t("hero.firstname")}</span>
            <br />
            <span className="text-white">{t("hero.lastname")}</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="text-lg sm:text-xl text-slate-300 font-medium mb-2"
          >
            {t("hero.title")}
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-lg"
          >
            {t("hero.subtitle")}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <a
              href="https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[#a36cff]/30 to-[#41caff]/30 border border-white/15 shadow-[0_8px_32px_rgba(163,108,255,0.2)] hover:shadow-[0_8px_40px_rgba(163,108,255,0.35)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
            >
              <FileDown size={16} />
              {t("hero.download")}
            </a>
            <a
              href="https://t.me/cassedygarcia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
            >
              <Send size={16} />
              {t("hero.telegram")}
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            <div className="glass-card p-5 inline-block">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-[#a36cff]" />
                <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-400">
                  {t("hero.keynumbers")}
                </span>
              </div>
              <div className="flex gap-5 sm:gap-8">
                {stats.map((stat, i) => (
                  <m.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 + i * 0.1, ease }}
                    className="text-center"
                  >
                    <span className="text-xl sm:text-2xl font-bold text-gradient-accent block">
                      {stat.value}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {stat.label}
                    </span>
                  </m.div>
                ))}
              </div>
            </div>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="hidden lg:block shrink-0"
        >
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 w-[420px] shadow-[0_30px_90px_rgba(5,8,20,0.45)]">
            <div className="relative aspect-[3/4] bg-gradient-to-br from-[#0f1118] to-[#0b0e14]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon size={56} className="text-white/10 mx-auto mb-3" />
                  <p className="text-xs text-white/20 tracking-wider uppercase">Photo</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/20 to-white/5" />
              <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#0b0f15]/55 px-3 py-2 text-xs font-medium text-white backdrop-blur-xl">
                {t("hero.featured")}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-white/50">
                  {t("hero.portfolio")}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Samir Renchirovsky
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  {t("hero.seogrowth")}
                </p>
              </div>
            </div>
          </div>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500">
          {t("hero.scroll")}
        </span>
        <ArrowDownRight size={16} className="text-slate-500 scroll-indicator" />
      </m.div>
    </section>
  );
}
