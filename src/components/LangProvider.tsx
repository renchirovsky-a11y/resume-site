"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Lang = "en" | "ru";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.languages": "Languages",
    "nav.contact": "Contact",
    "nav.available": "Available",
    // Hero
    "hero.firstname": "Samir",
    "hero.lastname": "Renchirovsky",
    "hero.title": "Linkbuilder / Influencer Marketing Lead",
    "hero.subtitle":
      "Results-driven digital marketer with deep expertise in SEO link building and influencer marketing across competitive iGaming environments.",
    "hero.download": "Download CV",
    "hero.telegram": "Telegram",
    "hero.keynumbers": "Key Numbers",
    "hero.links": "Links Placed",
    "hero.influencers": "Influencers",
    "hero.budget": "Budget Managed",
    "hero.featured": "Featured",
    "hero.portfolio": "Portfolio",
    "hero.seogrowth": "SEO & Growth Professional",
    "hero.scroll": "Scroll",
    // About
    "about.label": "About",
    "about.title.1": "Professional ",
    "about.title.2": "Summary",
    "about.text":
      "Experienced digital marketing professional specializing in SEO link building and influencer marketing within the competitive iGaming sector. Successfully managed large-scale link-building operations with over 90,000 crowd link placements and led influencer campaigns involving 1,000+ content creators and streamers. Proven track record of managing budgets exceeding $50,000, developing data-driven strategies, and building efficient operational workflows across multiple GEOs and NDA-protected projects.",
    "about.igaming": "iGaming Industry Expert",
    "about.nda": "NDA-Protected Projects",
    "about.data": "Data-Driven Optimization",
    "about.scale": "Operational Scale & Leadership",
    // Metrics
    "metrics.crowd": "Crowd Link Placements",
    "metrics.influencers": "Influencers & Streamers",
    "metrics.budget": "Budget Managed",
    "metrics.domains": "Core Domains of Expertise",
    // Experience
    "exp.label": "Career",
    "exp.title.1": "Professional ",
    "exp.title.2": "Experience",
    "exp.job1.title": "Linkbuilder",
    "exp.job1.company": "NDA Project · iGaming",
    "exp.job1.dates": "Sep 2023 — Dec 2025",
    "exp.job1.location": "Kyiv",
    "exp.job1.b1": "Led and scaled link-building operations across multiple GEOs and projects",
    "exp.job1.b2": "Built and managed backlink profiles exceeding 90,000 placements",
    "exp.job1.b3": "Developed off-page SEO strategies based on niche, GEO, and site maturity",
    "exp.job1.b4": "Designed workflows for donor research, relevance validation, and indexation tracking",
    "exp.job1.b5": "Managed anchor distribution and link velocity for optimal ranking growth",
    "exp.job1.b6": "Created and maintained large datasets and automated workflows using Google Sheets",
    "exp.job1.b7": "Tested and implemented unconventional SEO approaches for competitive advantage",
    "exp.job1.b8": "Monitored rankings, DR/UR metrics, indexation, and link growth dynamics",
    "exp.job2.title": "Influencer Marketing Lead (2nd / Associate)",
    "exp.job2.company": "Apuesta360 · iGaming",
    "exp.job2.dates": "Jun 2024 — Nov 2025",
    "exp.job2.location": "Cyprus",
    "exp.job2.b1": "Led influencer marketing operations and managed campaigns end-to-end",
    "exp.job2.b2": "Built structured outreach and collaboration processes for scalable partnerships",
    "exp.job2.b3": "Managed budgets up to $50,000 with full accountability for ROI",
    "exp.job2.b4": "Coordinated with 1,000+ influencers and streamers across multiple markets",
    "exp.job2.b5": "Oversaw communication, negotiations, content approvals, and campaign launches",
    "exp.job2.b6": "Tracked performance metrics and optimized campaign ROI continuously",
    "exp.job2.b7": "Coordinated internal workflows and improved team efficiency across departments",
    // Skills
    "skills.label": "Expertise",
    "skills.title.1": "Skills & ",
    "skills.title.2": "Tools",
    "skills.technical": "Technical Skills",
    "skills.soft": "Soft Skills",
    "skills.tools": "Tools & Platforms",
    "skill.t1": "Link building strategy",
    "skill.t2": "Crowd marketing",
    "skill.t3": "Mixed link profile management",
    "skill.t4": "Anchor strategy",
    "skill.t5": "GEO-based SEO strategy",
    "skill.t6": "PBN management",
    "skill.t7": "SEO analytics",
    "skill.t8": "Link profile optimization",
    "skill.t9": "Workflow automation",
    "skill.t10": "Vendor & contractor management",
    "skill.s1": "Strategic thinking",
    "skill.s2": "Analytical thinking",
    "skill.s3": "Negotiation",
    "skill.s4": "Communication",
    "skill.s5": "Time management",
    "skill.s6": "Prioritization",
    "skill.s7": "Decision-making under pressure",
    "skill.s8": "Accountability",
    "skill.tool1": "Ahrefs",
    "skill.tool2": "Semrush",
    "skill.tool3": "Google Analytics 4",
    "skill.tool4": "Google Sheets",
    "skill.tool5": "Notion",
    "skill.tool6": "CRM & outreach systems",
    // Languages
    "lang.label": "Communication",
    "lang.title": "Languages",
    "lang.proficiency": "Language Proficiency",
    "lang.russian": "Russian",
    "lang.uzbek": "Uzbek",
    "lang.english": "English",
    "lang.native": "Native",
    "lang.upper": "Upper-Intermediate",
    // Contact
    "contact.label": "Get in Touch",
    "contact.title.1": "Let's ",
    "contact.title.2": "Work Together",
    "contact.text":
      "Open to new opportunities in SEO, link building, influencer marketing, and growth strategy. Reach out to discuss how I can contribute to your team.",
    "contact.me": "Contact Me",
    "contact.resume": "Download Resume",
    "contact.copyright": "All rights reserved.",
    // Testimonials
    "testimonials.label": "Testimonials",
    "testimonials.title.1": "What People ",
    "testimonials.title.2": "Say",
  },
  ru: {
    // Navbar
    "nav.about": "Резюме",
    "nav.experience": "Опыт",
    "nav.skills": "Навыки",
    "nav.languages": "Языки",
    "nav.contact": "Контакт",
    "nav.available": "Открыт",
    // Hero
    "hero.firstname": "Самир",
    "hero.lastname": "Ренчировский",
    "hero.title": "Linkbuilder / Influencer Marketing Lead",
    "hero.subtitle":
      "Linkbuilder / Influencer Marketing Lead с опытом работы в iGaming на проектах под NDA. Ориентирован на результат, цифры и эффективность в конкурентной среде.",
    "hero.download": "Скачать CV",
    "hero.telegram": "Telegram",
    "hero.keynumbers": "Ключевые цифры",
    "hero.links": "Ссылок размещено",
    "hero.influencers": "Инфлюенсеров",
    "hero.budget": "Управление бюджетом",
    "hero.featured": "Избранное",
    "hero.portfolio": "Портфолио",
    "hero.seogrowth": "SEO & Growth специалист",
    "hero.scroll": "Прокрутка",
    // About
    "about.label": "Резюме",
    "about.title.1": "",
    "about.title.2": "Резюме",
    "about.text":
      "Сильный бэкграунд в SEO и линкбилдинге: более 90 000 размещённых ссылок, выстроенные процессы, работа с анкорами, индексом и качеством доноров. Есть опыт управления инфлюенсерами и бюджетами до $50 000, построения процессов и масштабирования направлений.",
    "about.igaming": "Эксперт в iGaming",
    "about.nda": "Проекты под NDA",
    "about.data": "Результат и цифры",
    "about.scale": "Масштабирование и лидерство",
    // Metrics
    "metrics.crowd": "Ссылок размещено",
    "metrics.influencers": "Инфлюенсеров и стримеров",
    "metrics.budget": "Управление бюджетом",
    "metrics.domains": "Направления экспертизы",
    // Experience
    "exp.label": "Опыт работы",
    "exp.title.1": "Опыт ",
    "exp.title.2": "работы",
    "exp.job1.title": "Linkbuilder (iGaming)",
    "exp.job1.company": "NDA",
    "exp.job1.dates": "Сентябрь 2023 — Декабрь 2025",
    "exp.job1.location": "Киев",
    "exp.job1.b1": "Развивал и систематизировал направление линкбилдинга",
    "exp.job1.b2": "Разместил более 90 000 ссылок (crowd, web 2.0, форумы, каталоги, профили, гест-посты и др.)",
    "exp.job1.b3": "Выстраивал ссылочные стратегии под GEO, нишу и стадию проекта",
    "exp.job1.b4": "Контролировал анкор-лист, распределение ссылочной массы и естественность профиля",
    "exp.job1.b5": "Отбирал доноров, работал с качеством и релевантностью площадок",
    "exp.job1.b6": "Создал рабочие процессы: базы, шаблоны, автоматизация через Google Sheets",
    "exp.job1.b7": "Тестировал нестандартные SEO-подходы и улучшал результаты",
    "exp.job1.b8": "Отслеживал позиции, DR/UR, индекс и динамику ссылок",
    "exp.job2.title": "Influencer Marketing Lead (2nd / Associate)",
    "exp.job2.company": "Apuesta360",
    "exp.job2.dates": "Июнь 2024 — Ноябрь 2025",
    "exp.job2.location": "Кипр",
    "exp.job2.b1": "Управлял направлением influencer marketing",
    "exp.job2.b2": "Построил системный процесс поиска, коммуникации и закупки интеграций",
    "exp.job2.b3": "Работал с бюджетами до $50 000",
    "exp.job2.b4": "Сотрудничал с 1000+ инфлюенсерами и стримерами",
    "exp.job2.b5": "Вёл переговоры, контролировал размещения и запуск кампаний",
    "exp.job2.b6": "Отслеживал результаты и оптимизировал эффективность",
    "exp.job2.b7": "Координировал работу и повышал скорость процессов",
    // Skills
    "skills.label": "Навыки",
    "skills.title.1": "Навыки и ",
    "skills.title.2": "инструменты",
    "skills.technical": "Технические навыки",
    "skills.soft": "Soft Skills",
    "skills.tools": "Инструменты",
    "skill.t1": "Линкбилдинг: crowd, смешанный профиль, анкоры, траст",
    "skill.t2": "Стратегии ссылок под GEO / нишу / этап проекта",
    "skill.t3": "Работа с PBN (подбор, планирование)",
    "skill.t4": "SEO-аналитика: позиции, DR/UR, индекс, динамика",
    "skill.t5": "Influencer marketing: поиск, переговоры, запуск кампаний",
    "skill.t6": "Оптимизация процессов и workflow",
    "skill.t7": "Контроль подрядчиков и качества",
    "skill.t8": "",
    "skill.t9": "",
    "skill.t10": "",
    "skill.s1": "Аналитическое мышление",
    "skill.s2": "Коммуникация и переговоры",
    "skill.s3": "Тайм-менеджмент",
    "skill.s4": "Работа в нагрузке",
    "skill.s5": "Самостоятельность и ответственность",
    "skill.s6": "",
    "skill.s7": "",
    "skill.s8": "",
    "skill.tool1": "Ahrefs / Semrush",
    "skill.tool2": "Google Analytics (GA4)",
    "skill.tool3": "Google Sheets (продвинутый уровень, автоматизация)",
    "skill.tool4": "Notion",
    "skill.tool5": "CRM и outreach-системы",
    "skill.tool6": "",
    // Languages
    "lang.label": "Коммуникация",
    "lang.title": "Языки",
    "lang.proficiency": "Уровень владения",
    "lang.russian": "Русский",
    "lang.uzbek": "Узбекский",
    "lang.english": "Английский",
    "lang.native": "Родной",
    "lang.upper": "Выше среднего",
    // Contact
    "contact.label": "Связаться",
    "contact.title.1": "Давайте ",
    "contact.title.2": "работать вместе",
    "contact.text":
      "Открыт к новым возможностям в SEO, линкбилдинге, инфлюенсер-маркетинге и стратегии роста. Свяжитесь со мной, чтобы обсудить сотрудничество.",
    "contact.me": "Связаться",
    "contact.resume": "Скачать резюме",
    "contact.copyright": "Все права защищены.",
    // Testimonials
    "testimonials.label": "Отзывы",
    "testimonials.title.1": "",
    "testimonials.title.2": "Отзывы",
  },
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export function useLang() {
  return useContext(LangContext);
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}
