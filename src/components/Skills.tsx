"use client";

import { m } from "framer-motion";
import { Brain, Settings, Wrench } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const categories = [
  {
    icon: Wrench,
    titleKey: "skills.technical",
    marker: "Technical",
    skillKeys: [
      "skill.t1",
      "skill.t2",
      "skill.t3",
      "skill.t4",
      "skill.t5",
      "skill.t6",
      "skill.t7",
      "skill.t8",
      "skill.t9",
      "skill.t10",
    ],
  },
  {
    icon: Brain,
    titleKey: "skills.soft",
    marker: "People",
    skillKeys: [
      "skill.s1",
      "skill.s2",
      "skill.s3",
      "skill.s4",
      "skill.s5",
      "skill.s6",
      "skill.s7",
      "skill.s8",
    ],
  },
  {
    icon: Settings,
    titleKey: "skills.tools",
    marker: "Stack",
    skillKeys: [
      "skill.tool1",
      "skill.tool2",
      "skill.tool3",
      "skill.tool4",
      "skill.tool5",
      "skill.tool6",
    ],
  },
];

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="section-band section-rule relative overflow-hidden">
      <div className="mx-auto max-w-[1220px]">
        <m.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.62, ease }}
          className="mb-12"
        >
          <p className="eyebrow">{t("skills.label")}</p>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-ivory sm:text-5xl">
            {t("skills.title.1")}
            <span className="text-gold">{t("skills.title.2")}</span>
          </h2>
        </m.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {categories.map((category, index) => {
            const skills = category.skillKeys
              .map((key) => t(key))
              .filter((value) => value.length > 0);

            return (
              <m.article
                key={category.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.56, delay: index * 0.08, ease }}
                whileHover={{ y: -8 }}
                className="matte-panel kinetic-panel card-3d-deep p-6 lg:p-7"
              >
                <div className="panel-inner">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`icon-kicker icon-3d-coin ${index === 1 ? "icon-3d-coin-amber" : ""} grid h-12 w-12 place-items-center rounded-[8px] border border-[color:var(--line)] bg-[color:var(--teal-soft)] text-[color:var(--teal)]`}>
                        <category.icon size={21} />
                      </div>
                      <h3 className="text-xl font-bold text-ivory">
                        {t(category.titleKey)}
                      </h3>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-subtle">
                      {category.marker}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => (
                      <span
                        key={`${skill}-${skillIndex}`}
                        className="skill-pill skill-pill-3d rounded-full border border-[color:var(--line)] bg-white/[0.025] px-3 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:border-[color:var(--teal)] hover:text-ivory"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
