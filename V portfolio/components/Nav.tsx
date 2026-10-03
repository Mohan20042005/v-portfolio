"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV, PERSON } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import { EASE, ENTRY } from "@/lib/motion";

export default function Nav() {
  const reduce = useReducedMotion();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const on = () => setSolid(scrollY > 40);
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => { removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToId(id), open ? 120 : 0); };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav aria-label="Primary" initial={reduce ? false : { y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: reduce ? 0 : ENTRY, duration: 0.9, ease: EASE }}
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border py-2 pl-5 pr-2 transition-all duration-500 ${solid || open ? "border-line bg-cream/70 shadow-[0_10px_40px_-18px_rgba(60,40,20,0.3)] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
        <a href="#home" onClick={go("home")} className="display text-xl">{PERSON.first}<span className="italic text-gold">.</span></a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={go(id)} aria-current={active === id ? "true" : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${active === id ? "text-ink" : "text-mute hover:text-ink"}`}>
                {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-paper" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#contact" onClick={go("contact")} className="hidden min-h-10 items-center rounded-full bg-ink px-5 text-sm text-cream transition-colors hover:bg-gold sm:inline-flex">Let’s Connect</a>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-line md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 -z-10 flex flex-col justify-center bg-paper px-8 md:hidden">
            <ul>
              {NAV.map(([id, label], i) => (
                <li key={id} className="overflow-hidden border-b border-line">
                  <motion.a href={`#${id}`} onClick={go(id)} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.08 * i + 0.1, duration: 0.7, ease: EASE }}
                    className="display flex items-baseline gap-4 py-4 text-[2.6rem]">
                    <span className="label !text-[0.65rem]">0{i + 1}</span>{label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <p className="label mt-8">{PERSON.city}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
