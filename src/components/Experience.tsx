"use client";

import { m } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const experienceDefs = [
  {
    titleKey: "exp.job1.title",
    companyKey: "exp.job1.company",
    datesKey: "exp.job1.dates",
    locationKey: "exp.job1.location",
    accent: "01",
    bulletKeys: [
      "exp.job1.b1",
      "exp.job1.b2",
      "exp.job1.b3",
      "exp.job1.b4",
      "exp.job1.b5",
      "exp.job1.b6",
      "exp.job1.b7",
      "exp.job1.b8",
    ],
  },
  {
    titleKey: "exp.job2.title",
    companyKey: "exp.job2.company",
    datesKey: "exp.job2.dates",
    locationKey: "exp.job2.location",
    accent: "02",
    bulletKeys: [
      "exp.job2.b1",
      "exp.job2.b2",
      "exp.job2.b3",
      "exp.job2.b4",
      "exp.job2.b5",
      "exp.job2.b6",
      "exp.job2.b7",
    ],
  },
];

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="section-band section-rule relative overflow-hidden">
      <div className="mx-auto max-w-[1220px]">
        <m.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.62, ease }}
          className="mb-12 grid gap-6 lg:grid-cols-[0.56fr_1fr]"
        >
          <div>
            <p className="eyebrow">{t("exp.label")}</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight text-ivory sm:text-5xl">
              {t("exp.title.1")}
              <span className="text-gold">{t("exp.title.2")}</span>
            </h2>
          </div>
          <p className="max-w-[640px] text-lg leading-8 text-muted lg:justify-self-end">
            SEO operations, influencer pipelines, budgets, negotiations, and
            measurable growth systems across competitive markets.
          </p>
        </m.div>

        <div className="space-y-5">
          {experienceDefs.map((job, index) => (
            <m.article
              key={job.titleKey}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.58, delay: index * 0.08, ease }}
              whileHover={{ y: -8, scale: 1.006 }}
              className="matte-panel kinetic-panel card-3d-deep overflow-hidden"
            >
              <div className="panel-inner grid lg:grid-cols-[270px_1fr]">
                <div className="border-b border-[color:var(--line)] p-6 lg:border-b-0 lg:border-r lg:p-8">
                  <span className="number-badge badge-3d grid h-14 w-14 place-items-center rounded-[8px] border border-[color:var(--amber)] text-lg font-bold text-[color:var(--amber)]">
                    {job.accent}
                  </span>
                  <h3 className="mt-7 text-2xl font-bold leading-tight text-ivory">
                    {t(job.titleKey)}
                  </h3>
                  <div className="mt-5 space-y-3 text-sm text-muted">
                    <p className="flex items-center gap-2">
                      <Building2 size={15} className="text-teal" />
                      {t(job.companyKey)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={15} className="text-teal" />
                      {t(job.datesKey)}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={15} className="text-teal" />
                      {t(job.locationKey)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-x-8 gap-y-4 p-6 sm:grid-cols-2 lg:p-8">
                  {job.bulletKeys.map((key) => (
                    <div
                      key={key}
                      className="group bullet-row flex items-start gap-3 border-t border-[color:var(--line)] pt-4"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--teal)] transition-transform duration-200 group-hover:scale-150" />
                      <p className="text-sm leading-7 text-muted">{t(key)}</p>
                    </div>
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
