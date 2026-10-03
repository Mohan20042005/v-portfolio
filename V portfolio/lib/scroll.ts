import type Lenis from "lenis";
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -64, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
