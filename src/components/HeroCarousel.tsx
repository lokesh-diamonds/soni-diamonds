"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slide = {
  image: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  copy: string;
};

const slides: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "The Solitaire — GIA Certified",
    titleLead: "A single diamond,",
    titleAccent: "cut for maximum fire.",
    copy: "Round, cushion and emerald-cut centre stones from 1 to 5 carats. Every one graded D–F colour, VVS–VS clarity, ideal cut.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "The Rivière — Tennis Necklaces & Bracelets",
    titleLead: "An unbroken line",
    titleAccent: "of light.",
    copy: "Hand-matched round brilliants, four-prong set on an articulated line that moves like water against the skin.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "The Halo — Engagement Rings",
    titleLead: "One carat that reads",
    titleAccent: "like two.",
    copy: "A tight pavé halo lifts the centre stone and throws a continuous ring of scintillation. Set by hand under a microscope.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Everyday Brilliance — Studs & Pendants",
    titleLead: "The diamonds",
    titleAccent: "you never take off.",
    copy: "Matched-pair studs and shaved-bezel pendants in 18k gold and platinum. Certified, secured, effortless.",
  },
];

const INTERVAL = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced.current) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  function goto(i: number) {
    setIndex(i);
    if (timer.current) {
      clearInterval(timer.current);
      if (!reduced.current) {
        timer.current = setInterval(
          () => setIndex((n) => (n + 1) % slides.length),
          INTERVAL
        );
      }
    }
  }

  const active = slides[index];

  return (
    <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
      {/* Rotating image layers with slow Ken Burns */}
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt={slide.eyebrow}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${
              i === index ? "animate-kenburns" : ""
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/35 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />

      {/* Copy — crossfades with the slide */}
      <div className="container-luxe relative flex h-full flex-col justify-end pb-24 md:pb-32">
        <div key={index} className="hero-copy max-w-3xl">
          <p className="eyebrow">{active.eyebrow}</p>
          <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-[1.02] text-bone">
            {active.titleLead}{" "}
            <span className="text-gold-gradient">{active.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-bone-dim">
            {active.copy}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-gold">
              Explore the Diamonds
            </Link>
            <Link href="/contact?subject=bespoke" className="btn-ghost">
              Design a Bespoke Ring
            </Link>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-12 flex gap-3">
          {slides.map((s, i) => (
            <button
              key={s.image}
              onClick={() => goto(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-[3px] w-14 overflow-hidden bg-line"
            >
              <span
                className={`absolute inset-0 origin-left bg-gold ${
                  i === index ? "animate-progress" : ""
                }`}
                style={{
                  transform: i < index ? "scaleX(1)" : i > index ? "scaleX(0)" : undefined,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
