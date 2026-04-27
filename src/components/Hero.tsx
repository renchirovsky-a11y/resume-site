"use client";

import type { PointerEvent } from "react";
import {
  m,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
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
  const pointerX = useMotionValue(680);
  const pointerY = useMotionValue(420);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${pointerX}px ${pointerY}px, rgba(74, 215, 200, 0.13), transparent 62%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    pointerX.set(x);
    pointerY.set(y);
  };

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
    <section
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:pt-28"
      onPointerMove={handlePointerMove}
    >
      <m.div className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />
      <div className="hero-lattice pointer-events-none absolute inset-x-4 top-28 z-0 h-px" />
      <div className="mx-auto grid w-full max-w-[1280px] min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] xl:gap-14">
        <div className="relative z-10 min-w-0">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="mb-8 flex flex-wrap gap-2.5"
          >
            {badgeDefs.map((badge, i) => (
              <m.span
                key={badge.label}
                className="chip chip-3d px-3.5"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
              >
                <badge.icon size={14} className="text-teal" />
                {badge.label}
              </m.span>
            ))}
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease }}
            className="hero-title hero-title-3d max-w-full text-[clamp(2.1rem,5.6vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ivory"
          >
            <m.span
              className="hero-line block"
              initial={{ y: "110%", rotateX: -50 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{ duration: 0.82, delay: 0.05, ease }}
            >
              {t("hero.firstname")}
            </m.span>
            <m.span
              className="hero-line text-gold block"
              initial={{ y: "110%", rotateX: -50 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease }}
            >
              {t("hero.lastname")}
            </m.span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.18, ease }}
            className="mt-8 max-w-full text-sm font-bold uppercase tracking-[0.12em] text-muted sm:text-base sm:tracking-[0.18em]"
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
              className="primary-action motion-button btn-3d-deep"
            >
              <FileDown size={18} />
              {t("hero.download")}
            </a>
            <a
              href="https://t.me/cassedygarcia"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-action motion-button btn-3d-deep btn-3d-deep-teal"
            >
              <Send size={18} className="text-teal" />
              {t("hero.telegram")}
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease }}
            className="matte-panel kinetic-panel card-3d-deep mt-10 max-w-[680px]"
          >
            <div className="panel-inner stats-3d-grid grid metric-divider md:grid-cols-3">
              {stats.map((stat, index) => (
                <m.div
                  key={stat.label}
                  className="stat-card element-3d-card p-6 sm:p-7"
                  whileHover={{ y: -10, rotateX: -4, rotateY: index === 1 ? 0 : index === 0 ? 5 : -5 }}
                  transition={{ type: "spring", stiffness: 330, damping: 25 }}
                >
                  <span className="depth-plane" />
                  <stat.icon size={22} className="mb-5 text-teal" />
                  <m.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.6 + index * 0.08 }}
                    className="number-3d block text-4xl font-bold text-ivory sm:text-5xl"
                  >
                    {stat.value}
                  </m.span>
                  <span className="mt-2 block text-sm text-muted">{stat.label}</span>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>

        <m.aside
          initial={{ opacity: 0, x: 36, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.82, delay: 0.22, ease }}
          whileHover={{ y: -8, rotateX: -1.2, rotateY: -1.8, scale: 1.01 }}
          className="matte-panel kinetic-panel profile-3d-shell card-3d-deep min-w-0 overflow-hidden lg:mt-16"
        >
          <div className="panel-inner">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--line)] p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-[8px] border border-[color:var(--line)] bg-white/[0.035] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em]">
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

            <div className="border-b border-[color:var(--line)] p-6 sm:p-7">
              <p className="eyebrow">{t("hero.portfolio")}</p>
              <h2 className="mt-6 text-[1.7rem] font-bold leading-tight text-ivory">
                Samir
                <br />
                <span className="break-words">Renchirovsky</span>
              </h2>
              <p className="mt-4 text-base font-bold text-[color:var(--teal)]">
                {t("hero.seogrowth")}
              </p>
              <a
                href="#experience"
                className="profile-action-3d mt-8 inline-flex min-h-11 items-center gap-3 rounded-[8px] border border-[color:var(--teal)] bg-[color:var(--teal-soft)] px-4 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
              >
                {lang === "ru" ? "См. портфолио" : "View portfolio"}
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="border-b border-[color:var(--line)] p-6 sm:p-7">
              <p className="eyebrow">
                {lang === "ru" ? "Последние кампании" : "Recent campaigns"}
              </p>
              <div className="mt-5 space-y-5">
                {campaigns.map((campaign, index) => (
                  <m.div
                    key={campaign.name}
                    className="campaign-row grid grid-cols-[18px_1fr] gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.52, delay: 0.9 + index * 0.12, ease }}
                  >
                    <div className="relative flex justify-center">
                      <span className="timeline-node mt-1 h-3 w-3 rounded-full bg-[color:var(--teal)] shadow-[0_0_18px_rgba(74,215,200,0.65)]" />
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
                  </m.div>
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
                    d="M0 128 L22 122 L42 114 L63 116 L84 104 L104 98 L126 91 L146 92 L168 79 L188 76 L208 66 L229 70 L248 54 L270 58 L292 42 L316 37 L338 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.72)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sparkline-runner"
                  />
                  <path
                    d="M0 128 L22 122 L42 114 L63 116 L84 104 L104 98 L126 91 L146 92 L168 79 L188 76 L208 66 L229 70 L248 54 L270 58 L292 42 L316 37 L338 24 L338 144 L0 144 Z"
                    fill="url(#spark-fill)"
                  />
                  <circle cx="338" cy="24" r="6" fill="var(--teal)" className="spark-dot" />
                </svg>
              </div>

              <div className="flex flex-col justify-end">
                <p className="text-4xl font-bold text-ivory">90K+</p>
                <p className="mt-2 text-sm text-muted">{t("hero.links")}</p>
                <p className="mt-5 inline-flex w-fit items-center rounded-full bg-[color:var(--teal-soft)] px-3 py-1 text-sm font-bold text-[color:var(--teal)]">
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
        <span className="text-[10px] font-bold uppercase tracking-[0.26em]">
          {t("hero.scroll")}
        </span>
        <ArrowDownRight size={16} />
      </m.div>
    </section>
  );
}
