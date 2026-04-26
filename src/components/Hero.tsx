"use client";

import { m } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ExternalLink,
  FileDown,
  Link2,
  Search,
  Send,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const badgeDefs = [
  { label: "iGaming", icon: Activity },
  { label: "SEO", icon: Search },
  { label: "Growth", icon: TrendingUp },
  { label: "Leadership", icon: Users },
];

export default function Hero() {
  const { lang, t } = useLang();

  const stats = [
    { value: "90K+", label: t("hero.links"), icon: Link2 },
    { value: "400+", label: t("hero.influencers"), icon: Users },
    { value: "$50K", label: t("hero.budget"), icon: Wallet },
  ];

  const campaigns = [
    {
      name: "Apuesta360",
      type: "Influencer Campaign",
      region: lang === "ru" ? "Кипр, LatAm" : "Cyprus, LatAm",
      period: lang === "ru" ? "Июн 2024 — Ноя 2025" : "Jun 2024 — Nov 2025",
    },
    {
      name: "NDA Project",
      type: "Linkbuilding",
      region: "EU, CIS, LatAm, Asia",
      period: lang === "ru" ? "Сен 2023 — Дек 2025" : "Sep 2023 — Dec 2025",
    },
  ];

  return (
    <section className="relative flex min-h-screen items-center px-4 pb-16 pt-32 sm:px-6 lg:pt-28">
      <div className="mx-auto grid w-full max-w-[1280px] min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] xl:gap-14">
        <div className="min-w-0">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="mb-8 flex flex-wrap gap-2.5"
          >
            {badgeDefs.map((badge) => (
              <span key={badge.label} className="chip px-3.5">
                <badge.icon size={14} className="text-teal" />
                {badge.label}
              </span>
            ))}
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease }}
            className="max-w-full text-[clamp(2.35rem,6.8vw,5.8rem)] font-black leading-[0.96] text-ivory"
          >
            <span>{t("hero.firstname")}</span>
            <br />
            <span className="text-gold">{t("hero.lastname")}</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.18, ease }}
            className="mt-8 max-w-full text-sm font-black uppercase tracking-[0.12em] text-muted sm:text-base sm:tracking-[0.18em]"
          >
            {t("hero.title")}
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.27, ease }}
            className="mt-5 max-w-[620px] text-base leading-8 text-muted sm:text-lg"
          >
            {t("hero.subtitle")}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.36, ease }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-action"
            >
              <FileDown size={18} />
              {t("hero.download")}
            </a>
            <a
              href="https://t.me/cassedygarcia"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-action"
            >
              <Send size={18} className="text-teal" />
              {t("hero.telegram")}
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease }}
            className="matte-panel mt-10 max-w-[680px]"
          >
            <div className="panel-inner grid metric-divider md:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={stat.label} className="p-6 sm:p-7">
                  <stat.icon size={22} className="mb-5 text-teal" />
                  <m.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.6 + index * 0.08 }}
                    className="block text-4xl font-black text-ivory sm:text-5xl"
                  >
                    {stat.value}
                  </m.span>
                  <span className="mt-2 block text-sm text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </m.div>
        </div>

        <m.aside
          initial={{ opacity: 0, x: 36, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.82, delay: 0.22, ease }}
          className="matte-panel min-w-0 overflow-hidden lg:mt-16"
        >
          <div className="panel-inner">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--line)] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-[8px] border border-[color:var(--line)] bg-white/[0.035] px-3 py-2 text-xs font-black uppercase tracking-[0.12em]">
                <Star size={15} className="text-[color:var(--amber)]" />
                {t("hero.featured")}
              </div>
              <div className="text-right">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-ivory">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--teal)] shadow-[0_0_18px_var(--teal)]" />
                  {lang === "ru" ? "Открыт к предложениям" : "Open to offers"}
                </p>
                <p className="mt-1 text-sm text-subtle">Full-time / Remote</p>
              </div>
            </div>

            <div className="grid border-b border-[color:var(--line)] md:grid-cols-[0.9fr_1.1fr]">
              <div className="grid min-h-[250px] place-items-center border-b border-[color:var(--line)] p-6 md:border-b-0 md:border-r">
                <div className="relative grid aspect-square w-[min(260px,70vw)] place-items-center rounded-full border border-[color:var(--amber)] bg-[radial-gradient(circle_at_50%_38%,rgba(216,168,95,0.12),transparent_54%),rgba(255,255,255,0.02)]">
                  <div className="absolute inset-6 rounded-full border border-[color:var(--line)]" />
                  <div className="absolute inset-10 rounded-full border border-[color:var(--line)] opacity-60" />
                  <div className="text-center">
                    <p className="font-serif text-[clamp(4rem,8vw,6.5rem)] leading-none text-ivory">
                      SR
                    </p>
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.1em] text-ivory">
                      Samir Renchirovsky
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="eyebrow">{t("hero.portfolio")}</p>
                <h2 className="mt-6 text-[1.7rem] font-black leading-tight text-ivory">
                  Samir
                  <br />
                  <span className="break-words">Renchirovsky</span>
                </h2>
                <p className="mt-4 text-base font-bold text-[color:var(--teal)]">
                  {t("hero.seogrowth")}
                </p>
                <a
                  href="#experience"
                  className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-[8px] border border-[color:var(--teal)] bg-[color:var(--teal-soft)] px-4 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {lang === "ru" ? "См. портфолио" : "View portfolio"}
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="border-b border-[color:var(--line)] p-6 sm:p-7">
              <p className="eyebrow">
                {lang === "ru" ? "Последние кампании" : "Recent campaigns"}
              </p>
              <div className="mt-5 space-y-5">
                {campaigns.map((campaign, index) => (
                  <div key={campaign.name} className="grid grid-cols-[18px_1fr] gap-4">
                    <div className="relative flex justify-center">
                      <span className="mt-1 h-3 w-3 rounded-full bg-[color:var(--teal)] shadow-[0_0_18px_rgba(74,215,200,0.65)]" />
                      {index < campaigns.length - 1 && (
                        <span className="absolute bottom-[-24px] top-5 w-px bg-[color:var(--line)]" />
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                      <div>
                        <p className="font-bold text-ivory">
                          {campaign.name}
                          <span className="mx-2 text-subtle">/</span>
                          <span className="font-medium text-muted">{campaign.type}</span>
                        </p>
                        <p className="mt-1 text-sm text-subtle">{campaign.region}</p>
                      </div>
                      <p className="text-sm text-subtle sm:text-right">{campaign.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_150px] sm:p-7">
              <div>
                <p className="eyebrow">
                  {lang === "ru"
                    ? "Динамика ссылочного профиля"
                    : "Link profile momentum"}
                </p>
                <svg
                  viewBox="0 0 360 144"
                  className="mt-5 h-36 w-full overflow-visible"
                  role="img"
                  aria-label="Link profile growth chart"
                >
                  <defs>
                    <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[24, 72, 120].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="350"
                      y1={y}
                      y2={y}
                      stroke="var(--line)"
                      strokeDasharray="4 6"
                    />
                  ))}
                  <path
                    d="M0 128 L22 122 L42 114 L63 116 L84 104 L104 98 L126 91 L146 92 L168 79 L188 76 L208 66 L229 70 L248 54 L270 58 L292 42 L316 37 L338 24"
                    fill="none"
                    stroke="var(--teal)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sparkline-path"
                  />
                  <path
                    d="M0 128 L22 122 L42 114 L63 116 L84 104 L104 98 L126 91 L146 92 L168 79 L188 76 L208 66 L229 70 L248 54 L270 58 L292 42 L316 37 L338 24 L338 144 L0 144 Z"
                    fill="url(#spark-fill)"
                  />
                  <circle cx="338" cy="24" r="6" fill="var(--teal)" className="spark-dot" />
                </svg>
              </div>

              <div className="flex flex-col justify-end">
                <p className="text-4xl font-black text-ivory">90K+</p>
                <p className="mt-2 text-sm text-muted">{t("hero.links")}</p>
                <p className="mt-5 inline-flex w-fit items-center rounded-full bg-[color:var(--teal-soft)] px-3 py-1 text-sm font-black text-[color:var(--teal)]">
                  +32%
                </p>
                <p className="mt-2 text-sm text-subtle">
                  {lang === "ru" ? "за 12 месяцев" : "over 12 months"}
                </p>
              </div>
            </div>
          </div>
        </m.aside>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle md:flex"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.26em]">
          {t("hero.scroll")}
        </span>
        <ArrowDownRight size={16} />
      </m.div>
    </section>
  );
}
