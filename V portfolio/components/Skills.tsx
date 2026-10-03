"use client";
import { SKILLS } from "@/lib/data";
import { Reveal, SectionHead } from "./ui";

export default function Skills() {
  let n = 0;
  return (
    <section id="skills" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead n="03" label="Skills" title="What I bring to the shop floor." />
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {SKILLS.map((g) => (
            <div key={g.group}>
              <Reveal><p className="label mb-4 text-gold">{g.group}</p></Reveal>
              <ul>
                {g.items.map((s) => {
                  n += 1;
                  return (
                    <li key={s.name} className="border-t border-line last:border-b">
                      <Reveal delay={0.04 * (n % 5)}>
                      <div className="group relative">
                        <div className="py-5 transition-transform duration-500 md:group-hover:translate-x-3">
                          <div className="flex items-baseline gap-4">
                            <span className="label w-6 shrink-0">{String(n).padStart(2, "0")}</span>
                            <span className="display text-[clamp(1.6rem,3.2vw,2.7rem)] transition-colors duration-300 group-hover:text-gold">{s.name}</span>
                          </div>
                          {s.seen && (
                            <p className="mt-1 pl-10 text-[0.8rem] font-light text-mute transition-all duration-500 md:max-h-0 md:translate-y-1 md:overflow-hidden md:opacity-0 md:group-hover:max-h-8 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                              Applied at {s.seen}
                            </p>
                          )}
                        </div>
                        <span aria-hidden className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
                      </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
