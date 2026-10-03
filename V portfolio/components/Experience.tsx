"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { EXPERIENCE, type Job } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { useMedia } from "@/lib/hooks";
import { Reveal, Words } from "./ui";

const Gem = dynamic(() => import("./Gem"), { ssr: false });
const pad = (n: number) => String(n).padStart(2, "0");

const container = { in: {}, show: { transition: { staggerChildren: 0.1 } }, out: { opacity: 0, y: -28, transition: { duration: 0.35 } } };
const item = { in: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };

/** One company = one chapter. */
function Chapter({ job, n, mode }: { job: Job; n: number; mode: "sticky" | "stacked" }) {
  const props = mode === "sticky"
    ? { initial: "in", animate: "show", exit: "out" }
    : { initial: "in", whileInView: "show", viewport: { once: true, margin: "-15% 0px" } };
  return (
    <motion.article variants={container} {...props} className="max-w-2xl">
      <motion.p variants={item} className="label mb-5">Chapter {pad(n)} <span className="text-mute/50">/ {pad(EXPERIENCE.length)}</span></motion.p>
      <motion.div variants={{ in: { clipPath: "inset(0 100% 0 0)" }, show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } } }}
        className="inline-block rounded-2xl border border-line bg-cream px-6 py-4 shadow-[0_24px_60px_-34px_rgba(70,45,20,0.4)]">
        <Image src={job.logo.src} alt={job.logo.alt} width={job.logo.w} height={job.logo.h} sizes="200px" className="h-auto w-36 sm:w-44" />
      </motion.div>
      <motion.h3 variants={item} className="display mt-6 text-[clamp(2rem,4.6vw,3.6rem)]">{job.role}</motion.h3>
      <motion.p variants={item} className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] font-light text-mute">
        <span className="text-ink">{job.company}</span><span aria-hidden className="h-px w-5 bg-gold" />{job.place}
        <span className="rounded-full border border-gold/50 px-3 py-0.5 text-xs uppercase tracking-[0.18em] text-gold">{job.when}</span>
      </motion.p>
      <ul className="mt-6 space-y-3">
        {job.points.map((p) => (
          <motion.li key={p} variants={item} className="flex gap-3 text-[0.95rem] font-light leading-relaxed text-ink/80">
            <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-gold" />{p}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useMedia("(min-width: 1024px)");
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(EXPERIENCE.length - 1, Math.max(0, Math.floor(v * EXPERIENCE.length)))));
  const job = EXPERIENCE[i];

  return (
    <section id="experience" ref={ref} style={{ height: `${EXPERIENCE.length * 100 + 40}svh` }} className="relative border-t border-line">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-1/4 h-[30rem] w-[30rem] glow-a" />
        <p className="label absolute left-5 top-24 md:left-10"><span className="text-gold">02</span>&ensp;/&ensp;Experience</p>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr] gap-5 px-5 pt-10 md:gap-12 md:px-10 lg:grid-cols-[auto_1fr_20rem]">
          {/* timeline rail */}
          <div aria-hidden className="relative flex flex-col items-center py-2">
            <span className={`label mb-3 transition-colors ${i === 0 ? "text-gold" : ""}`}>01</span>
            <div className="relative w-px flex-1 bg-line"><motion.div style={{ scaleY: line }} className="absolute inset-0 origin-top bg-gold" /></div>
            <span className={`label mt-3 transition-colors ${i === 1 ? "text-gold" : ""}`}>02</span>
          </div>

          <ol className="sr-only">
            {EXPERIENCE.map((j) => (
              <li key={j.id}><h3>{j.role}, {j.company}, {j.place} ({j.when})</h3><ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul></li>
            ))}
          </ol>
          <div aria-hidden className="min-h-[26rem]">
            <AnimatePresence mode="wait"><Chapter key={job.id} job={job} n={i + 1} mode="sticky" /></AnimatePresence>
          </div>

          {desktop ? (
            <div aria-hidden className="relative self-center"><Gem tone={job.tone} className="aspect-square w-full" /></div>
          ) : (
            <div aria-hidden className="absolute -top-8 right-3 h-24 w-24"><Gem tone={job.tone} className="h-full w-full" /></div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stacked() {
  return (
    <section id="experience" className="border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal><p className="label mb-6"><span className="text-gold">02</span>&ensp;/&ensp;Experience</p></Reveal>
        <Words text="Where I have worked." className="h2 mb-16" />
        <div className="space-y-24">{EXPERIENCE.map((j, k) => <Chapter key={j.id} job={j} n={k + 1} mode="stacked" />)}</div>
      </div>
    </section>
  );
}

export default function Experience() {
  const reduce = useReducedMotion();
  return reduce ? <Stacked /> : <Cinematic />;
}
