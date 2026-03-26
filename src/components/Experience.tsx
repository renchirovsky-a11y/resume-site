"use client";

import { m } from "framer-motion";
import { MapPin, Calendar, Building2 } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const experienceDefs = [
  {
    titleKey: "exp.job1.title",
    companyKey: "exp.job1.company",
    datesKey: "exp.job1.dates",
    locationKey: "exp.job1.location",
    bulletKeys: [
      "exp.job1.b1", "exp.job1.b2", "exp.job1.b3", "exp.job1.b4",
      "exp.job1.b5", "exp.job1.b6", "exp.job1.b7", "exp.job1.b8",
    ],
  },
  {
    titleKey: "exp.job2.title",
    companyKey: "exp.job2.company",
    datesKey: "exp.job2.dates",
    locationKey: "exp.job2.location",
    bulletKeys: [
      "exp.job2.b1", "exp.job2.b2", "exp.job2.b3", "exp.job2.b4",
      "exp.job2.b5", "exp.job2.b6", "exp.job2.b7",
    ],
  },
];

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-500 mb-3 block">
            {t("exp.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            {t("exp.title.1")}
            <span className="text-gradient-hero">{t("exp.title.2")}</span>
          </h2>
        </m.div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#a36cff]/40 via-[#41caff]/30 to-transparent" />

          <div className="space-y-8">
            {experienceDefs.map((exp, i) => (
              <m.div
                key={exp.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
                className="relative pl-8 md:pl-20"
              >
                <div className="absolute left-0 md:left-8 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#a36cff] to-[#41caff] border-2 border-[#0b0e14] shadow-[0_0_12px_rgba(163,108,255,0.4)]" />

                <div className="glass-card p-6 sm:p-8 group hover:border-white/12 hover:shadow-[0_20px_60px_rgba(163,108,255,0.08)] hover:-translate-y-0.5 transition-all duration-500">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">
                        {t(exp.titleKey)}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Building2 size={14} className="text-[#a36cff]/60" />
                        <span>{t(exp.companyKey)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                        <Calendar size={12} />
                        {t(exp.datesKey)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                        <MapPin size={12} />
                        {t(exp.locationKey)}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bulletKeys.map((key) => (
                      <li
                        key={key}
                        className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-[#41caff]/50 shrink-0" />
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
