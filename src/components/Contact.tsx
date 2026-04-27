"use client";

import { m } from "framer-motion";
import { ArrowUpRight, FileDown, Mail, Send } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="section-band section-rule relative overflow-hidden pb-10">
      <div className="mx-auto max-w-[1220px]">
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.62, ease }}
          whileHover={{ y: -8 }}
          className="matte-panel kinetic-panel card-3d-deep overflow-hidden"
        >
          <div className="panel-inner grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-[color:var(--line)] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <p className="eyebrow">{t("contact.label")}</p>
              <h2 className="mt-4 max-w-[720px] text-4xl font-bold leading-tight text-ivory sm:text-6xl">
                {t("contact.title.1")}
                <span className="text-gold">{t("contact.title.2")}</span>
              </h2>
              <p className="mt-6 max-w-[620px] text-lg leading-8 text-muted">
                {t("contact.text")}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="https://t.me/cassedygarcia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-action motion-button btn-3d-deep"
                >
                  <Send size={18} />
                  {t("contact.me")}
                </a>
                <a
                  href="https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-action motion-button btn-3d-deep btn-3d-deep-teal"
                >
                  <FileDown size={18} />
                  {t("contact.resume")}
                </a>
              </div>
            </div>

            <div className="grid content-between gap-5 p-7 sm:p-10">
              <a
                href="https://t.me/cassedygarcia"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link card-3d-deep group rounded-[8px] border border-[color:var(--line)] bg-white/[0.025] p-5 transition-colors duration-200 hover:border-[color:var(--teal)]"
              >
                <div className="flex items-center gap-4">
                  <div className="icon-3d-coin grid h-12 w-12 place-items-center rounded-[8px] border border-[color:var(--line)] bg-[color:var(--teal-soft)] text-[color:var(--teal)]">
                    <Send size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-subtle">Telegram</p>
                    <p className="mt-1 flex items-center gap-2 truncate font-bold text-ivory">
                      @cassedygarcia
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-subtle transition-colors group-hover:text-[color:var(--teal)]"
                      />
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="mailto:samir.renchirovsky@email.com"
                className="contact-link card-3d-deep group rounded-[8px] border border-[color:var(--line)] bg-white/[0.025] p-5 transition-colors duration-200 hover:border-[color:var(--amber)]"
              >
                <div className="flex items-center gap-4">
                  <div className="icon-3d-coin icon-3d-coin-amber grid h-12 w-12 place-items-center rounded-[8px] border border-[color:var(--line)] bg-[color:var(--amber-soft)] text-[color:var(--amber)]">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-subtle">Email</p>
                    <p className="mt-1 flex items-center gap-2 truncate font-bold text-ivory">
                      samir.renchirovsky@email.com
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-subtle transition-colors group-hover:text-[color:var(--amber)]"
                      />
                    </p>
                  </div>
                </div>
              </a>

              <p className="pt-6 text-sm text-subtle">
                &copy; {new Date().getFullYear()} Samir Renchirovsky.{" "}
                {t("contact.copyright")}
              </p>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
