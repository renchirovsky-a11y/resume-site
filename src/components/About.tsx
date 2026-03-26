"use client";

import { m } from "framer-motion";
import { Briefcase, Shield, BarChart3, Users } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const icons = [Briefcase, Shield, BarChart3, Users];
const keys = ["about.igaming", "about.nda", "about.data", "about.scale"];

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-500 mb-3 block">
            {t("about.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            {t("about.title.1")}
            <span className="text-gradient-hero">{t("about.title.2")}</span>
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="glass-card p-8 sm:p-10"
        >
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl">
            {t("about.text")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keys.map((key, i) => {
              const Icon = icons[i];
              return (
                <m.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#a36cff]/20 to-[#41caff]/20 border border-white/10 shrink-0">
                    <Icon size={18} className="text-[#a3a0ff]" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">
                    {t(key)}
                  </span>
                </m.div>
              );
            })}
          </div>
        </m.div>
      </div>
    </section>
  );
}
