"use client";

import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { useLang } from "@/components/LangProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });
const TiltAuto = dynamic(() => import("@/components/TiltAuto"), { ssr: false });
const About = dynamic(() => import("@/components/About"));
const Metrics = dynamic(() => import("@/components/Metrics"));
const Experience = dynamic(() => import("@/components/Experience"));
const Skills = dynamic(() => import("@/components/Skills"));
const Languages = dynamic(() => import("@/components/Languages"));
const Contact = dynamic(() => import("@/components/Contact"));

const ease = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const { lang } = useLang();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div className="scroll-progress" style={{ scaleX }} aria-hidden />
      <Scene3D />
      <TiltAuto />
      <main className="app-layer relative">
        <Navbar />
        <AnimatePresence mode="wait">
          <m.div
            key={lang}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            <Hero />
            <About />
            <Metrics />
            <Experience />
            <Skills />
            <Languages />
            <Contact />
          </m.div>
        </AnimatePresence>
      </main>
    </LazyMotion>
  );
}
