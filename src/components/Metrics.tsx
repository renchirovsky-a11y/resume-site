"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { DollarSign, Link2, Target, Users } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const metricDefs = [
  { icon: Link2, value: 90000, suffix: "+", labelKey: "metrics.crowd", tag: "scale" },
  { icon: Users, value: 400, suffix: "+", labelKey: "metrics.influencers", tag: "network" },
  { icon: DollarSign, value: 50000, prefix: "$", labelKey: "metrics.budget", tag: "budget" },
  { icon: Target, value: 2, labelKey: "metrics.domains", tag: "focus" },
];

function formatCount(value: number) {
  if (value >= 1000) return `${Math.floor(value / 1000)}K`;
  return value.toString();
}

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  active,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let start: number | null = null;
    const duration = 1200;

    const tick = (time: number) => {
      if (start === null) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span className="text-4xl font-black text-ivory sm:text-5xl">
      {prefix}
      {formatCount(count)}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="section-band pt-6" ref={ref}>
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[color:var(--line)] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{lang === "ru" ? "Сводка" : "Scoreboard"}</p>
            <h2 className="mt-3 text-3xl font-black text-ivory sm:text-4xl">
              {lang === "ru" ? "Операционный масштаб" : "Operational scale"}
            </h2>
          </div>
          <p className="max-w-[460px] text-sm leading-7 text-muted sm:text-right">
            {lang === "ru"
              ? "Короткая сводка по объему, партнерам, бюджетам и ключевым направлениям роста."
              : "A compact view of volume, partners, budgets, and core growth domains."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricDefs.map((metric, index) => (
            <m.div
              key={metric.labelKey}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.54, delay: index * 0.07, ease }}
              className="matte-panel p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="panel-inner">
                <div className="mb-8 flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-[8px] border border-[color:var(--line)] bg-white/[0.025] text-[color:var(--teal)]">
                    <metric.icon size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-subtle">
                    {metric.tag}
                  </span>
                </div>
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  active={isInView}
                />
                <p className="mt-3 min-h-10 text-sm leading-5 text-muted">
                  {t(metric.labelKey)}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
