"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, MapPin } from "lucide-react";
import { PERSON } from "@/lib/data";
import { PORTRAIT_BLUR } from "@/lib/blur";
import { EASE, ENTRY } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";
import { Magnetic, btnGhost, btnPrimary } from "./ui";

const Gem = dynamic(() => import("./Gem"), { ssr: false });

function Chars({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  return (
    <span aria-hidden className={`block overflow-hidden pb-[0.1em] ${className}`}>
      {text.split("").map((c, i) => (
        <motion.span key={i} className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: delay + i * 0.045, ease: EASE }}>
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : ENTRY;
  const photo = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photo, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const fade = (n: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d + n, ease: EASE } });

  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28 lg:pb-12 lg:pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow-a absolute -left-48 -top-24 h-[36rem] w-[36rem]" />
        <div className="glow-b absolute -bottom-64 -left-24 h-[30rem] w-[42rem]" />
        <div className="absolute inset-y-0 left-[7%] w-px bg-line/70" />
        <div className="absolute inset-y-0 left-[50%] hidden w-px bg-line/50 lg:block" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.p {...fade(0)} className="label mb-6 flex items-center gap-3"><span className="h-px w-8 bg-gold" />Portfolio</motion.p>
          <h1 aria-label={`Hi, I’m ${PERSON.first}`} className="display">
            <span aria-hidden className="block overflow-hidden pb-[0.1em]">
              <motion.span className="inline-block text-[clamp(1.6rem,3vw,2.4rem)] italic text-mute" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: d, ease: EASE }}>
                Hi, I’m
              </motion.span>
            </span>
            <Chars text={PERSON.first} delay={d + 0.1} className="text-[clamp(3.6rem,11.5vw,9rem)] leading-[0.9]" />
          </h1>
          <motion.p {...fade(0.7)} className="mt-6 max-w-md text-lg font-light leading-snug text-ink sm:text-xl">
            {PERSON.role}
          </motion.p>
          <motion.p {...fade(0.85)} className="mt-4 max-w-md text-[0.95rem] font-light leading-relaxed text-mute">{PERSON.intro}</motion.p>
          <motion.div {...fade(1)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic><button type="button" onClick={() => scrollToId("experience")} className={btnPrimary}>View Experience <ArrowDownRight size={16} /></button></Magnetic>
            <Magnetic><button type="button" onClick={() => scrollToId("contact")} className={btnGhost}>Let’s Connect</button></Magnetic>
          </motion.div>
        </div>

        <div ref={photo} className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
          <div className="relative mx-auto w-full lg:max-w-[30rem]">
            <div className="rounded-bl-2xl rounded-br-[5.5rem] rounded-tl-[5.5rem] rounded-tr-2xl shadow-[0_50px_90px_-35px_rgba(70,45,20,0.45)]">
              <motion.div data-cursor="view" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.5, delay: d + 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-bl-2xl rounded-br-[5.5rem] rounded-tl-[5.5rem] rounded-tr-2xl bg-blush/40">
                <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
                  <motion.div className="relative h-full w-full" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.8, delay: d + 0.1, ease: EASE }}>
                    <Image src="/vaishnavi.jpg" alt="Portrait of Vaishnavi smiling outdoors" fill priority placeholder="blur" blurDataURL={PORTRAIT_BLUR}
                      sizes="(min-width:1024px) 480px, 92vw" className="object-cover object-[50%_30%]" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: d + 1.2, ease: EASE }}
              className="absolute -bottom-5 -left-3 z-10 h-28 w-28 sm:-left-8 sm:h-36 sm:w-36 lg:-left-16 lg:h-44 lg:w-44">
              <Gem tone="champagne" className="h-full w-full" />
            </motion.div>
            <motion.p {...fade(1.2)} className="label absolute -bottom-9 right-1 flex items-center gap-2"><MapPin size={12} className="text-gold" />{PERSON.city}</motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
