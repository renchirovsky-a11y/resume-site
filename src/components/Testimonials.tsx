"use client";

import { useState, memo } from "react";
import { m } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  photo: string;
  text: string;
  stars: number;
  gender: "m" | "f";
}

const testimonials: Testimonial[] = [
  {
    name: "James Carter",
    role: "SEO Director",
    initials: "JC",
    gender: "m",
    photo: "/avatars/james-carter.jpg",
    text: "Worked with Samir on a link building project. He handled volume well and kept things organized in sheets. Easy to work with.",
    stars: 5,
  },
  {
    name: "Emily Parker",
    role: "Growth Lead",
    initials: "EP",
    gender: "f",
    photo: "/avatars/emily-parker.jpg",
    text: "Samir joined when our link profile was already messy. Helped bring some structure and clarity over time.",
    stars: 5,
  },
  {
    name: "Robert Miller",
    role: "Digital Strategist",
    initials: "RM",
    gender: "m",
    photo: "/avatars/robert-miller.jpg",
    text: "Not the type to overpromise. Just does the work and keeps things moving.",
    stars: 5,
  },
  {
    name: "Sarah Williams",
    role: "Marketing Manager",
    initials: "SW",
    gender: "f",
    photo: "/avatars/sarah-williams.jpg",
    text: "Good understanding of anchor distribution and how to avoid obvious patterns.",
    stars: 5,
  },
  {
    name: "David Chen",
    role: "VP of Acquisition",
    initials: "DC",
    gender: "m",
    photo: "/avatars/david-chen.jpg",
    text: "We had a lot of repetitive tasks — he stayed consistent and didn't drop quality.",
    stars: 5,
  },
  {
    name: "Jessica Lee",
    role: "Content Director",
    initials: "JL",
    gender: "f",
    photo: "/avatars/jessica-lee.jpg",
    text: "Comfortable working with large lists of sites and ongoing placements. That helped us scale.",
    stars: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Head of SEO",
    initials: "MJ",
    gender: "m",
    photo: "/avatars/marcus-johnson.jpg",
    text: "He tested different approaches. Some worked better than others, but he adjusted quickly.",
    stars: 4,
  },
  {
    name: "Michael Brown",
    role: "Product Manager",
    initials: "MB",
    gender: "m",
    photo: "/avatars/michael-brown.jpg",
    text: "Communication was simple and to the point. No unnecessary noise.",
    stars: 5,
  },
  {
    name: "Alex Thompson",
    role: "CTO",
    initials: "AT",
    gender: "m",
    photo: "/avatars/alex-thompson.jpg",
    text: "Didn't need much supervision after onboarding. Could handle daily tasks independently.",
    stars: 5,
  },
  {
    name: "Laura Bennett",
    role: "Account Manager",
    initials: "LB",
    gender: "f",
    photo: "/avatars/laura-bennett.jpg",
    text: "Solid choice for ongoing link building work, especially if you need stability.",
    stars: 5,
  },
  {
    name: "Алексей Волков",
    role: "Head of Marketing",
    initials: "АВ",
    gender: "m",
    photo: "/avatars/alexey-volkov.jpg",
    text: "Работали с Самиром по инфлюенсерам. Нормально выстроил процесс, стало меньше путаницы в задачах.",
    stars: 5,
  },
  {
    name: "Дмитрий Козлов",
    role: "CEO, Digital Agency",
    initials: "ДК",
    gender: "m",
    photo: "/avatars/dmitry-kozlov.jpg",
    text: "Как тимлид — спокойный, без лишнего давления. При этом по срокам держит.",
    stars: 5,
  },
  {
    name: "Наталья Смирнова",
    role: "CMO",
    initials: "НС",
    gender: "f",
    photo: "/avatars/natalya-smirnova.jpg",
    text: "Было много интеграций параллельно, он это всё как-то систематизировал, стало проще работать.",
    stars: 5,
  },
  {
    name: "Игорь Петренко",
    role: "Founder",
    initials: "ИП",
    gender: "m",
    photo: "/avatars/igor-petrenko.jpg",
    text: "В переговорах ок, не всегда выбивает максимум, но в целом условия нормальные и без конфликтов.",
    stars: 4,
  },
  {
    name: "Елена Кузнецова",
    role: "Project Manager",
    initials: "ЕК",
    gender: "f",
    photo: "/avatars/elena-kuznetsova.jpg",
    text: "Работали по крауду. Объёмы большие, но он старался держать качество, насколько это возможно.",
    stars: 5,
  },
  {
    name: "Андрей Романов",
    role: "Team Lead",
    initials: "АР",
    gender: "m",
    photo: "/avatars/andrey-romanov.jpg",
    text: "Хорошо ведёт таблицы и учёт ссылок, не теряются размещения.",
    stars: 5,
  },
  {
    name: "Олег Тарасов",
    role: "Marketing Director",
    initials: "ОТ",
    gender: "m",
    photo: "/avatars/oleg-tarasov.jpg",
    text: "Понимает базу по анкорам, не делает перекосов.",
    stars: 5,
  },
  {
    name: "Виктор Соколов",
    role: "SEO Specialist",
    initials: "ВС",
    gender: "m",
    photo: "/avatars/viktor-sokolov.jpg",
    text: "Не идеальный, но надёжный — если задача есть, он её закроет.",
    stars: 5,
  },
  {
    name: "Мария Белова",
    role: "Account Manager",
    initials: "МБ",
    gender: "f",
    photo: "/avatars/maria-belova.jpg",
    text: "Следит за индексом и откликом, не просто \"накидывает ссылки\".",
    stars: 5,
  },
  {
    name: "Анна Миронова",
    role: "Outreach Lead",
    initials: "АМ",
    gender: "f",
    photo: "/avatars/anna-mironova.jpg",
    text: "Подходит для долгой работы, где важна стабильность, а не разовые результаты.",
    stars: 5,
  },
];

const maleGradients = [
  ["#4f46e5", "#7c3aed"], ["#2563eb", "#4f46e5"], ["#0891b2", "#2563eb"],
  ["#6d28d9", "#4f46e5"], ["#1d4ed8", "#6366f1"], ["#7c3aed", "#2563eb"],
];
const femaleGradients = [
  ["#ec4899", "#a855f7"], ["#f43f5e", "#ec4899"], ["#d946ef", "#a855f7"],
  ["#c026d3", "#e879f9"], ["#db2777", "#a855f7"], ["#f472b6", "#c084fc"],
];

function getGradient(name: string, gender: "m" | "f"): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const g = gender === "m" ? maleGradients : femaleGradients;
  const [c1, c2] = g[Math.abs(hash) % g.length];
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}

function AvatarImg({ t }: { t: Testimonial }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 border border-white/10"
        style={{ background: getGradient(t.name, t.gender) }}
      >
        {t.initials}
      </div>
    );
  }

  return (
    <img
      src={t.photo}
      alt={t.name}
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
const row2 = testimonials.slice(Math.ceil(testimonials.length / 2));

const TestimonialCard = memo(function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="testimonial-card glass-card p-4 sm:p-5 w-[280px] sm:w-[320px] shrink-0 group hover:border-white/15">
      <div className="flex items-center gap-3 mb-3">
        <AvatarImg t={t} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{t.name}</p>
          <p className="text-[11px] text-slate-500 truncate">{t.role}</p>
        </div>
        <Quote size={16} className="text-[#a36cff]/30 ml-auto shrink-0" />
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
        ))}
        {Array.from({ length: 5 - t.stars }).map((_, i) => (
          <Star key={`e-${i}`} size={12} className="text-slate-600" />
        ))}
      </div>
      <p className="text-[13px] text-slate-300 leading-relaxed line-clamp-3">
        {t.text}
      </p>
    </div>
  );
});

/* Pure CSS marquee — no JS animation frames, GPU-composited */
function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];
  const cls = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-[#06070b] to-transparent pointer-events-none theme-fade-left" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-[#06070b] to-transparent pointer-events-none theme-fade-right" />

      <div
        className={`flex gap-4 ${cls}`}
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} t={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-500 mb-3 block">
            {t("testimonials.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            {t("testimonials.title.1")}
            <span className="text-gradient-hero">{t("testimonials.title.2")}</span>
          </h2>
        </m.div>
      </div>

      <div className="space-y-6">
        <MarqueeRow items={row1} direction="left" speed={40} />
        <MarqueeRow items={row2} direction="right" speed={45} />
      </div>
    </section>
  );
}
