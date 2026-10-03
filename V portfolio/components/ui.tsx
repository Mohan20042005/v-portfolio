"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { EASE } from "@/lib/motion";

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/** Word-by-word masked headline, revealed on scroll. */
export function Words({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const M = motion[Tag];
  return (
    <M className={className} aria-label={text} initial="h" whileInView="v" viewport={{ once: true, margin: "-10% 0px" }} transition={{ staggerChildren: 0.06 }}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block" variants={{ h: { y: "112%" }, v: { y: 0 } }} transition={{ duration: 0.9, ease: EASE }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </M>
  );
}

export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div ref={ref} className={`inline-block ${className}`} style={{ x: sx, y: sy }}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

export const btnPrimary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-gold";
export const btnGhost = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-7 text-sm font-medium tracking-wide transition-colors duration-300 hover:border-gold hover:text-gold";

export function SectionHead({ n, label, title }: { n: string; label: string; title: string }) {
  return (
    <div className="mb-12 md:mb-20">
      <Reveal><p className="label mb-6"><span className="text-gold">{n}</span>&ensp;/&ensp;{label}</p></Reveal>
      <Words text={title} className="h2 max-w-4xl" />
    </div>
  );
}
