"use client";

import { m, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Globe2, Calendar, Zap, MapPin } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

type LangDef = {
  nameKey: string;
  levelKey: string;
  code: string;
  percent: number;
  accent: string;
  flag: string;
  since: { ru: string; en: string };
  usage: { ru: string; en: string };
  regions: string;
  cases: { ru: string[]; en: string[] };
};

const langDefs: LangDef[] = [
  {
    nameKey: "lang.russian",
    levelKey: "lang.native",
    code: "C2",
    percent: 100,
    accent: "#4ad7c8",
    flag: "/flags/ru.svg",
    since: { ru: "С рождения", en: "Since birth" },
    usage: { ru: "Ежедневно", en: "Daily" },
    regions: "RU · CIS",
    cases: {
      ru: ["Переговоры", "Контент-стратегия", "Outreach с блогерами"],
      en: ["Negotiations", "Content strategy", "Blogger outreach"],
    },
  },
  {
    nameKey: "lang.uzbek",
    levelKey: "lang.native",
    code: "C2",
    percent: 100,
    accent: "#d8a85f",
    flag: "/flags/uz.svg",
    since: { ru: "С рождения", en: "Since birth" },
    usage: { ru: "Ежедневно", en: "Daily" },
    regions: "UZ · Central Asia",
    cases: {
      ru: ["Деловое общение", "Локальный нетворкинг", "Партнёры в регионе"],
      en: ["Business comms", "Local networking", "Regional partners"],
    },
  },
  {
    nameKey: "lang.english",
    levelKey: "lang.upper",
    code: "B2",
    percent: 72,
    accent: "#7cd6ff",
    flag: "/flags/gb.svg",
    since: { ru: "С 2014", en: "Since 2014" },
    usage: { ru: "В работе", en: "Work daily" },
    regions: "EU · LATAM · Asia",
    cases: {
      ru: ["NDA-проекты", "Технические SEO-брифы", "Глобальные команды"],
      en: ["NDA projects", "Technical SEO briefs", "Global teams"],
    },
  },
];

function AnimatedPercent({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motion = useMotionValue(0);
  const display = useTransform(motion, (v) => Math.round(v).toString());
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motion, value, { duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, value, delay, motion]);

  return (
    <span ref={ref} className="lang-stage-percent">
      <m.span className="lang-stage-percent-num">{display}</m.span>
      <span className="lang-stage-percent-sign">%</span>
    </span>
  );
}

export default function Languages() {
  const { lang, t } = useLang();

  const summary = [
    { num: "3", labelRu: "ЯЗЫКА", labelEn: "LANGUAGES" },
    { num: "2", labelRu: "РОДНЫХ", labelEn: "NATIVE" },
    { num: "8+", labelRu: "СТРАН В РАБОТЕ", labelEn: "WORKING MARKETS" },
    { num: "10+", labelRu: "ЛЕТ ОПЫТА", labelEn: "YEARS OF USE" },
  ];

  return (
    <section id="languages" className="section-band section-rule relative overflow-hidden">
      <div className="mx-auto max-w-[1220px]">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.58, ease }}
          className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-[color:var(--line)] pb-6 sm:flex-row sm:items-end"
        >
          <div className="flex items-center gap-4">
            <div className="icon-3d-coin grid h-14 w-14 place-items-center rounded-[10px] border border-[color:var(--teal)] bg-[color:var(--teal-soft)] text-[color:var(--teal)]">
              <Globe2 size={24} />
            </div>
            <div>
              <p className="eyebrow">{t("lang.label")}</p>
              <h2 className="mt-2 text-4xl font-bold leading-tight text-ivory sm:text-5xl">
                {t("lang.title")}
              </h2>
            </div>
          </div>
          <p className="max-w-[440px] text-sm leading-7 text-muted sm:text-right">
            {lang === "ru"
              ? "Работаю в трёх языковых средах одновременно — переключаюсь между переговорами, контент-командами и партнёрами в день."
              : "Operating across three language environments daily — switching between negotiations, content teams, and partners on the same day."}
          </p>
        </m.div>

        {/* Summary strip */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease }}
          className="lang-summary mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-4"
        >
          {summary.map((s, i) => (
            <div key={i} className="lang-summary-cell flex flex-col gap-1 bg-[color:var(--bg-2)] px-5 py-5">
              <span className="number-3d text-3xl font-bold leading-none text-ivory">{s.num}</span>
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-subtle">
                {lang === "ru" ? s.labelRu : s.labelEn}
              </span>
            </div>
          ))}
        </m.div>

        <div className="grid gap-5 md:grid-cols-3">
          {langDefs.map((item, index) => (
            <m.article
              key={item.nameKey}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.58, delay: index * 0.1, ease }}
              whileHover={{ y: -8 }}
              className="matte-panel kinetic-panel card-3d-deep relative overflow-hidden p-6"
            >
              <div className="panel-inner">
                <div className="lang-stage" style={{ ["--lang-accent" as string]: item.accent }}>
                  <div className="lang-flag-fill">
                    <Image
                      src={item.flag}
                      alt={`${t(item.nameKey)} flag`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="lang-flag-img-fill"
                      priority={index === 0}
                    />
                  </div>
                  <span className="lang-flag-sheen" aria-hidden />
                  <span className="lang-flag-vignette" aria-hidden />
                  <span className="lang-stage-code">{item.code}</span>
                  <AnimatedPercent value={item.percent} delay={0.4 + index * 0.15} />
                </div>

                {/* Title row */}
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <p className="text-2xl font-bold leading-tight text-ivory" style={{ letterSpacing: "-0.02em" }}>
                    {t(item.nameKey)}
                  </p>
                  <span
                    className="font-display text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{ color: item.accent }}
                  >
                    {t(item.levelKey)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-white/[0.05]">
                  <m.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: item.percent / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 + index * 0.15, ease }}
                    style={{
                      transformOrigin: "left",
                      background: `linear-gradient(90deg, ${item.accent}, var(--amber))`,
                      boxShadow: `0 0 14px ${item.accent}66`,
                    }}
                    className="h-full rounded-full"
                  />
                </div>

                {/* Meta row: Since · Usage · Regions */}
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[color:var(--line)] pt-5">
                  <div className="flex flex-col gap-1.5">
                    <Calendar size={13} style={{ color: item.accent }} />
                    <span className="font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle">
                      {lang === "ru" ? "С когда" : "Since"}
                    </span>
                    <span className="text-[13px] font-semibold leading-tight text-ivory">
                      {item.since[lang]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Zap size={13} style={{ color: item.accent }} />
                    <span className="font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle">
                      {lang === "ru" ? "Частота" : "Usage"}
                    </span>
                    <span className="text-[13px] font-semibold leading-tight text-ivory">
                      {item.usage[lang]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <MapPin size={13} style={{ color: item.accent }} />
                    <span className="font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle">
                      {lang === "ru" ? "Регионы" : "Markets"}
                    </span>
                    <span className="text-[13px] font-semibold leading-tight text-ivory">
                      {item.regions}
                    </span>
                  </div>
                </div>

                {/* Use case chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.cases[lang].map((c) => (
                    <span
                      key={c}
                      className="lang-case-chip rounded-full border px-3 py-1 text-[11px] font-semibold"
                      style={{
                        borderColor: `${item.accent}55`,
                        color: item.accent,
                        background: `${item.accent}10`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
