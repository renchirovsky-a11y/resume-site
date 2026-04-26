"use client";

import { m } from "framer-motion";
import { Globe2 } from "lucide-react";
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
    <section id="languages" className="section-band section-rule">
      <div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[0.62fr_1fr]">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.58, ease }}
        >
          <p className="eyebrow">{t("lang.label")}</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-gold sm:text-5xl">
            {t("lang.title")}
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.62, delay: 0.08, ease }}
          className="matte-panel p-6 sm:p-8"
        >
          <div className="panel-inner">
            <div className="mb-8 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-[8px] border border-[color:var(--line)] bg-[color:var(--teal-soft)] text-[color:var(--teal)]">
                <Globe2 size={20} />
              </div>
              <p className="font-bold text-muted">{t("lang.proficiency")}</p>
            </div>

            <div className="space-y-7">
              {langDefs.map((item, index) => (
                <m.div
                  key={item.nameKey}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: 0.14 + index * 0.08, ease }}
                >
                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-lg font-black text-ivory">
                        {t(item.nameKey)}
                      </p>
                      <p className="mt-1 text-sm text-subtle">{t(item.levelKey)}</p>
                    </div>
                    <span className="text-xl font-black text-[color:var(--teal)]">
                      {item.code}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <m.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1, ease }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--teal),var(--amber))]"
                    />
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
