"use client";

import { m } from "framer-motion";
import { Wrench, Brain, Settings } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const categories = [
  {
    icon: Wrench,
    titleKey: "skills.technical",
    accent: "from-[#a36cff]/20 to-[#7c6cff]/20",
    skillKeys: ["skill.t1", "skill.t2", "skill.t3", "skill.t4", "skill.t5", "skill.t6", "skill.t7", "skill.t8", "skill.t9", "skill.t10"],
  },
  {
    icon: Brain,
    titleKey: "skills.soft",
    accent: "from-[#41caff]/20 to-[#5abdfd]/20",
    skillKeys: ["skill.s1", "skill.s2", "skill.s3", "skill.s4", "skill.s5", "skill.s6", "skill.s7", "skill.s8"],
  },
  {
    icon: Settings,
    titleKey: "skills.tools",
    accent: "from-[#ff9075]/20 to-[#ffb4df]/20",
    skillKeys: ["skill.tool1", "skill.tool2", "skill.tool3", "skill.tool4", "skill.tool5", "skill.tool6"],
  },
];

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-500 mb-3 block">
            {t("skills.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            {t("skills.title.1")}
            <span className="text-gradient-hero">{t("skills.title.2")}</span>
          </h2>
        </m.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const skills = cat.skillKeys
              .map((key) => t(key))
              .filter((val) => val.length > 0);

            return (
              <m.div
                key={cat.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
                className="glass-card p-6 sm:p-7 hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${cat.accent} border border-white/10`}>
                    <cat.icon size={18} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold">{t(cat.titleKey)}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, j) => (
                    <span
                      key={`${skill}-${j}`}
                      className="px-3 py-1.5 rounded-full text-[13px] text-slate-300 bg-white/[0.04] border border-white/[0.08] cursor-default hover:scale-105 hover:bg-white/[0.08] transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
