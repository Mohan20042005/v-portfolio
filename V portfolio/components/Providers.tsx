"use client";
import { useEffect, useState } from "react";
import { MotionConfig, motion, useReducedMotion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/scroll";
import { ENTRY } from "@/lib/motion";
import Cursor from "./Cursor";

function Smooth() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.09 });
    setLenis(l);
    l.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); l.destroy(); setLenis(null); };
  }, []);
  return null;
}

function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShow(false), reduce ? 0 : ENTRY * 1000 - 200); return () => clearTimeout(t); }, [reduce]);
  return (
    <AnimatePresence>
      {show && !reduce && (
        <motion.div aria-hidden className="fixed inset-0 z-[100] grid place-items-center bg-paper"
          exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <div className="text-center">
            <div className="overflow-hidden">
              <motion.p initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="display text-5xl sm:text-7xl">
                Vaishnavi <span className="italic text-gold">V</span>
              </motion.p>
            </div>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 block h-px w-24 origin-left bg-gold" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="fixed left-4 top-4 z-[110] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-cream focus:translate-y-0">Skip to content</a>
      <Smooth /><Intro /><Cursor />
      {children}
    </MotionConfig>
  );
}
