"use client";

import { m } from "framer-motion";
import { Globe } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const langDefs = [
  { nameKey: "lang.russian", levelKey: "lang.native", code: "C2", percent: 100 },
  { nameKey: "lang.uzbek", levelKey: "lang.native", code: "C2", percent: 100 },
  { nameKey: "lang.english", levelKey: "lang.upper", code: "B2", percent: 72 },
];

export default function Languages() {
  const { t } = useLang();

  return (
    <section id="languages" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-500 mb-3 block">
            {t("lang.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            <span className="text-gradient-hero">{t("lang.title")}</span>
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="glass-card p-6 sm:p-8 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe size={18} className="text-[#41caff]/60" />
            <span className="text-sm text-slate-400 font-medium">
              {t("lang.proficiency")}
            </span>
          </div>

          <div className="space-y-6">
            {langDefs.map((lang, i) => (
              <m.div
                key={lang.nameKey}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-base font-semibold">
                      {t(lang.nameKey)}
                    </span>
                    <span className="text-xs text-slate-500">{t(lang.levelKey)}</span>
                  </div>
                  <span className="text-sm font-bold text-gradient-accent">
                    {lang.code}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <m.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease }}
                    className="h-full rounded-full bg-gradient-to-r from-[#a36cff] via-[#5abdfd] to-[#76f8ff]"
                  />
                </div>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
