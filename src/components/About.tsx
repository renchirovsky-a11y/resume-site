"use client";

import { m } from "framer-motion";
import { BarChart3, Briefcase, Shield, Users } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  { key: "about.igaming", icon: Briefcase, meta: "iGaming" },
  { key: "about.nda", icon: Shield, meta: "NDA" },
  { key: "about.data", icon: BarChart3, meta: "Data" },
  { key: "about.scale", icon: Users, meta: "Scale" },
];

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section-band section-rule relative overflow-hidden">
      <div className="mx-auto max-w-[1220px]">
        <m.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.62, ease }}
          className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="badge-3d grid h-16 w-16 place-items-center rounded-[8px] border border-[color:var(--amber)] text-xl font-bold text-[color:var(--amber)]">
                01
              </span>
              <div>
                <p className="eyebrow">{t("about.label")}</p>
                <h2 className="mt-3 text-4xl font-bold leading-tight text-ivory sm:text-5xl">
                  {t("about.title.1")}
                  <span className="text-gold">{t("about.title.2")}</span>
                </h2>
              </div>
            </div>
            <p className="max-w-[520px] text-lg leading-9 text-muted">
              {t("about.text")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((item, index) => (
              <m.div
                key={item.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.48, delay: index * 0.06, ease }}
                whileHover={{ y: -8 }}
                className="matte-panel kinetic-panel card-3d-deep min-h-[180px] p-6"
              >
                <div className="panel-inner flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className={`icon-kicker icon-3d-coin ${index % 2 === 1 ? "icon-3d-coin-amber" : ""} grid h-11 w-11 place-items-center rounded-[8px] border border-[color:var(--line)] bg-[color:var(--teal-soft)] text-[color:var(--teal)]`}>
                      <item.icon size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-subtle">
                      {item.meta}
                    </span>
                  </div>
                  <p className="mt-8 text-xl font-bold leading-snug text-ivory">
                    {t(item.key)}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
