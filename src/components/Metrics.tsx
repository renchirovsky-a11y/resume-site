"use client";

import { useRef, useEffect, useState } from "react";
import { m, useInView } from "framer-motion";
import { Link2, Users, DollarSign, Target } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const metricDefs = [
  { icon: Link2, value: 90000, suffix: "+", labelKey: "metrics.crowd", tag: "scale" },
  { icon: Users, value: 400, suffix: "+", labelKey: "metrics.influencers", tag: "performance" },
  { icon: DollarSign, value: 50000, prefix: "$", suffix: "", labelKey: "metrics.budget", tag: "systems" },
  { icon: Target, value: 2, suffix: "", labelKey: "metrics.domains", tag: "leadership" },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  isInView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatted =
    count >= 1000 ? `${Math.floor(count / 1000).toLocaleString()}K` : count.toString();

  return (
    <span className="text-4xl sm:text-5xl font-bold text-gradient-accent">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricDefs.map((metric, i) => (
            <m.div
              key={metric.labelKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="glass-card p-6 group cursor-default hover:-translate-y-1 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#a36cff]/20 to-[#41caff]/20 border border-white/10 group-hover:border-white/20 transition-colors">
                  <metric.icon size={20} className="text-[#7cb3ff]" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-slate-600">
                  {metric.tag}
                </span>
              </div>
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                isInView={isInView}
              />
              <p className="text-sm text-slate-400 mt-2">{t(metric.labelKey)}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
