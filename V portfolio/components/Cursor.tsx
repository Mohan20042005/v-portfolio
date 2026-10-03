"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Desktop-only cursor: a soft ring that follows smoothly and grows over interactive things. */
export default function Cursor() {
  const [on, setOn] = useState(false);
  const [state, setState] = useState<"idle" | "link" | "view">("idle");
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 });
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setState(t.closest("[data-cursor='view']") ? "view" : t.closest("a,button,input,textarea,[data-cursor]") ? "link" : "idle");
    };
    addEventListener("mousemove", move); addEventListener("mouseover", over);
    return () => { removeEventListener("mousemove", move); removeEventListener("mouseover", over); document.documentElement.classList.remove("has-cursor"); };
  }, [x, y]);
  if (!on) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-3 -mt-3 h-6 w-6">
      <motion.div animate={{ scale: state === "view" ? 3.2 : state === "link" ? 2.1 : 1, opacity: state === "idle" ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="grid h-full w-full place-items-center rounded-full border border-gold bg-gold/10 backdrop-blur-[1px]">
        <span className="h-1 w-1 rounded-full bg-gold" />
      </motion.div>
    </motion.div>
  );
}
