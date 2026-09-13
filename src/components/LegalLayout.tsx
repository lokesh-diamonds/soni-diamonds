"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

export type LegalSection = {
  id: string;
  heading: string;
  body: string[];
};

export default function LegalLayout({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <section className="container-luxe pt-16 pb-10 md:pt-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl text-bone">
            {title}
          </h1>
          <p className="mt-5 text-sm text-bone-faint">Last updated · {updated}</p>
        </Reveal>
        <div className="hairline mt-10" />
      </section>

      <section className="container-luxe pb-28">
        <div className="grid gap-14 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Contents</p>
            <nav className="mt-5 space-y-1 border-l border-line-soft">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block -ml-px border-l-2 py-2 pl-4 text-sm transition-colors ${
                    activeId === s.id
                      ? "border-gold text-bone"
                      : "border-transparent text-bone-faint hover:text-bone-dim"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} · {s.heading}
                </a>
              ))}
            </nav>
          </aside>

          <div className="max-w-2xl">
            {sections.map((s, i) => (
              <Reveal
                as="section"
                key={s.id}
                delay={i * 40}
                className="scroll-mt-28 pb-12"
              >
                <div id={s.id} className="scroll-mt-28">
                  <h2 className="font-serif text-2xl md:text-3xl text-bone">
                    <span className="text-gold mr-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {s.body.map((para, j) => (
                      <p
                        key={j}
                        className="leading-relaxed text-bone-dim"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
