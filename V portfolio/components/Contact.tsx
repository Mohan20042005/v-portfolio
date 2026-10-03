"use client";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { PERSON } from "@/lib/data";
import { Magnetic, Reveal, Words, btnPrimary } from "./ui";

export default function Contact() {
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || ""), from = String(f.get("email") || ""), msg = String(f.get("message") || "");
    const body = `${msg}\n\n${name}\n${from}`;
    location.href = `mailto:${PERSON.email}?subject=${encodeURIComponent(`Message from ${name}`)}&body=${encodeURIComponent(body)}`;
  };
  const field = "w-full border-0 border-b border-line bg-transparent py-3 text-base font-light outline-none transition-colors placeholder:text-mute/60 focus:border-gold focus-visible:outline-none";
  return (
    <section id="contact" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal><p className="label mb-6"><span className="text-gold">04</span>&ensp;/&ensp;Contact</p></Reveal>
          <Words text="Let’s connect." className="h2 text-[clamp(3.4rem,10vw,8rem)]" />
          <Reveal delay={0.1}><p className="mt-6 max-w-md text-lg font-light leading-relaxed text-mute">For a conversation about retail, jewellery or visual merchandising.</p></Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Magnetic><a href={PERSON.phoneHref} className={btnPrimary}><Phone size={16} />Call {PERSON.phone}</a></Magnetic>
            <Magnetic><a href={`mailto:${PERSON.email}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-7 text-sm font-medium tracking-wide transition-colors hover:border-gold hover:text-gold"><Mail size={16} />{PERSON.email}</a></Magnetic>
          </Reveal>
          <Reveal delay={0.2}><p className="label mt-8">{PERSON.city}</p></Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <form onSubmit={send} className="rounded-3xl border border-line bg-cream p-7 shadow-[0_40px_80px_-50px_rgba(70,45,20,0.4)] md:p-9">
            <div className="space-y-6">
              <label className="block"><span className="label">Your name</span><input name="name" required autoComplete="name" className={field} /></label>
              <label className="block"><span className="label">Your email</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
              <label className="block"><span className="label">Message</span><textarea name="message" required rows={4} className={`${field} resize-none`} /></label>
            </div>
            <button type="submit" className={`${btnPrimary} mt-8 w-full`}>Send message <ArrowUpRight size={16} /></button>
            <p className="mt-4 text-center text-xs font-light text-mute">Opens your email app with the message ready to send. Nothing is stored.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
