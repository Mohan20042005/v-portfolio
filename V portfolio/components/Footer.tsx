import { PERSON } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="display text-3xl">{PERSON.name}</p>
          <p className="mt-1 text-sm font-light text-mute">{PERSON.role}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm font-light md:items-end">
          <a href={PERSON.phoneHref} className="transition-colors hover:text-gold">{PERSON.phone}</a>
          <a href={`mailto:${PERSON.email}`} className="transition-colors hover:text-gold">{PERSON.email}</a>
          <p className="label mt-3">© {new Date().getFullYear()} {PERSON.name}</p>
        </div>
      </div>
    </footer>
  );
}
