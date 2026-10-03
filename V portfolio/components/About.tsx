"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { EDUCATION, PERSON, PILLARS } from "@/lib/data";
import { Reveal } from "./ui";

function Word({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.16, 1]);
  return <motion.span style={{ opacity: o }}>{w}</motion.span>;
}

function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="display flex flex-wrap gap-x-[0.26em] text-[clamp(2rem,5.2vw,4.4rem)]">
      {words.map((w, i) => reduce ? <span key={i}>{w}</span> : <Word key={i} w={w} p={scrollYProgress} a={i / words.length} b={(i + 1) / words.length} />)}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="relative border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal><p className="label mb-8"><span className="text-gold">01</span>&ensp;/&ensp;About</p></Reveal>
        <Statement text="Retail sales, visual merchandising and customer relationships, in jewellery and diamond retail." />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-lg font-light leading-relaxed text-ink/80">{PERSON.profile}</p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6 transition-colors hover:border-gold">
                  <span className="label pt-1.5 text-gold">0{i + 1}</span>
                  <div>
                    <h3 className="display text-3xl transition-transform duration-500 group-hover:translate-x-2">{p.t}</h3>
                    <p className="mt-2 max-w-md text-[0.95rem] font-light leading-relaxed text-mute">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><p className="label">Education</p></Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <div className="flex flex-col gap-1 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="display text-3xl">{e.title}</h3>
                    <p className="mt-1 text-[0.95rem] font-light text-mute">{e.school}</p>
                  </div>
                  <p className="label sm:text-right">{e.when}</p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
