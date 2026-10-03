# Vaishnavi V — Portfolio

Next.js 15 · React 19 · TypeScript · Tailwind v4 · Motion · GSAP · Lenis · React Three Fiber + Drei · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Deploy: push to GitHub → vercel.com/new → import → Deploy (no env vars needed).

- **All content** lives in `lib/data.ts` (taken from the resume). Edit text there only.
- **3D**: one faceted stone (`components/Gem.tsx`), used in the hero and the Experience chapters (gold for Glow, silver for GIVA). It pauses off-screen and falls back to a still line drawing on low-power devices, no-WebGL, or reduced-motion.
- **Contact form** opens the visitor's email app (no backend, nothing stored).
- Private payslip data is deliberately **not** used anywhere in the site.
