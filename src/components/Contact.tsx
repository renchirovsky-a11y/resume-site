"use client";

import { m } from "framer-motion";
import { Send, Mail, FileDown, ArrowUpRight } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] halo-violet floating-orb pointer-events-none opacity-30" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] halo-cyan floating-orb floating-orb-delayed pointer-events-none opacity-25" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-500 mb-3 block">
            {t("contact.label")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            {t("contact.title.1")}
            <span className="text-gradient-hero">{t("contact.title.2")}</span>
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-lg mx-auto">
            {t("contact.text")}
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <a
            href="https://t.me/cassedygarcia"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-5 flex items-center gap-4 group hover:border-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#a36cff]/20 to-[#41caff]/20 border border-white/10">
              <Send size={18} className="text-[#41caff]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-500 mb-0.5">Telegram</p>
              <p className="text-sm font-medium flex items-center gap-1">
                @cassedygarcia
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
              </p>
            </div>
          </a>

          <a
            href="mailto:samir.renchirovsky@email.com"
            className="glass-card p-5 flex items-center gap-4 group hover:border-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff9075]/20 to-[#ffb4df]/20 border border-white/10">
              <Mail size={18} className="text-[#ffb4df]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-500 mb-0.5">Email</p>
              <p className="text-sm font-medium flex items-center gap-1">
                samir.renchirovsky@email.com
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
              </p>
            </div>
          </a>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="https://t.me/cassedygarcia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#a36cff]/30 to-[#41caff]/30 border border-white/15 shadow-[0_8px_32px_rgba(163,108,255,0.2)] hover:shadow-[0_8px_40px_rgba(163,108,255,0.35)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
          >
            <Send size={16} />
            {t("contact.me")}
          </a>
          <a
            href="https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
          >
            <FileDown size={16} />
            {t("contact.resume")}
          </a>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 mt-24 pt-8 border-t border-white/[0.06] text-center"
      >
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Samir Renchirovsky. {t("contact.copyright")}
        </p>
      </m.div>
    </section>
  );
}
