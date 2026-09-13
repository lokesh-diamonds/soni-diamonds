"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import LiveRateCalculator from "@/components/LiveRateCalculator";

type Tab = "Rings" | "Necklaces" | "Bracelets";
const tabs: Tab[] = ["Rings", "Necklaces", "Bracelets"];

const ringChart = [
  { us: "4", uk: "H½", eu: "47", mm: "14.9" },
  { us: "4.5", uk: "I½", eu: "48", mm: "15.3" },
  { us: "5", uk: "J½", eu: "49", mm: "15.7" },
  { us: "5.5", uk: "L", eu: "51", mm: "16.1" },
  { us: "6", uk: "M", eu: "52", mm: "16.5" },
  { us: "6.5", uk: "N", eu: "53", mm: "16.9" },
  { us: "7", uk: "O", eu: "54", mm: "17.3" },
  { us: "7.5", uk: "P", eu: "56", mm: "17.7" },
  { us: "8", uk: "Q", eu: "57", mm: "18.1" },
  { us: "8.5", uk: "R", eu: "58", mm: "18.5" },
  { us: "9", uk: "S", eu: "60", mm: "19.0" },
];

const necklaceChart = [
  { length: "40 cm / 16 in", name: "Collar", sits: "At the base of the neck" },
  { length: "42 cm / 16.5 in", name: "Choker", sits: "Just above the collarbone" },
  { length: "45 cm / 18 in", name: "Princess", sits: "On the collarbone" },
  { length: "50 cm / 20 in", name: "Matinée", sits: "Just below the collarbone" },
  { length: "55 cm / 22 in", name: "Opera", sits: "On the décolleté" },
  { length: "70 cm / 28 in", name: "Rope", sits: "Below the bust" },
];

const braceletChart = [
  { size: "XS", wrist: "14.0 cm", fit: "Close" },
  { size: "S", wrist: "15.0 cm", fit: "Close" },
  { size: "M", wrist: "16.0 cm", fit: "Comfort" },
  { size: "L", wrist: "17.0 cm", fit: "Comfort" },
  { size: "XL", wrist: "18.5 cm", fit: "Relaxed" },
];

const quizQuestions = [
  {
    q: "Which piece are you sizing?",
    options: ["A ring", "A necklace", "A bracelet"],
  },
  {
    q: "How do you like it to sit?",
    options: ["Snug and secure", "Comfortable, barely felt", "Loose and moving"],
  },
  {
    q: "Do you know a measurement?",
    options: [
      "Yes, in millimetres",
      "Yes, an existing size",
      "No — I'll need to measure",
    ],
  },
];

export default function SizeGuideClient() {
  const [tab, setTab] = useState<Tab>("Rings");

  // Quiz
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const quizDone = answers.every((a) => a !== null);

  const result = useMemo(() => {
    if (!quizDone) return null;
    const piece = ["a ring", "a necklace", "a bracelet"][answers[0]!];
    const fit = ["a snug", "a comfort", "a relaxed"][answers[1]!];
    const method =
      answers[2] === 0
        ? "Use the millimetre column of the master chart below — measure the inside diameter of a piece that already fits."
        : answers[2] === 1
          ? "Cross-reference your known size in the conversion chart below to find the Soni Diamonds equivalent."
          : "Order our complimentary sizing set, or wrap a strip of paper around the spot and measure its length against a ruler.";
    return { piece, fit, method };
  }, [answers, quizDone]);

  return (
    <>
      <PageHero
        eyebrow="Client Care & Pricing"
        title="Live Gold Rate Calculator & Size Guide"
        intro="Calculate real-time prices for custom 18K/14K/22K gold jewellery at flat making charges of ₹850/gram, and find your exact ring, necklace and bracelet dimensions."
      />

      {/* Live Calculator Section */}
      <section className="container-luxe py-10 md:py-14">
        <Reveal>
          <LiveRateCalculator />
        </Reveal>
      </section>


      {/* The Four Cs */}
      <section className="container-luxe py-14 md:py-16">
        <Reveal>
          <p className="eyebrow">Understanding the Diamond</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
            The Four Cs
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {[
            {
              c: "Cut",
              d: "The proportions and finish that decide how much light the diamond returns. Graded Excellent to Poor. We supply Excellent / Ideal only — it is the single biggest factor in how bright a diamond looks.",
              scale: "Ideal · Excellent · Very Good · Good · Fair · Poor",
            },
            {
              c: "Colour",
              d: "How colourless the diamond is, graded D (icy white) to Z (light yellow). D–F is colourless; G–J near-colourless. Our solitaires are D–F; accent stones F–G.",
              scale: "D · E · F · G · H · I · J · … · Z",
            },
            {
              c: "Clarity",
              d: "The number and visibility of natural inclusions, graded Flawless (FL) to Included (I3). We work in VVS and VS — inclusions invisible without magnification.",
              scale: "FL · IF · VVS1 · VVS2 · VS1 · VS2 · SI1 · SI2 · I1–I3",
            },
            {
              c: "Carat",
              d: "The diamond's weight, not its diameter. A well-cut 1.00ct round measures about 6.4mm. Two stones of equal carat can face up very differently — cut decides that.",
              scale: "0.50ct ≈ 5.2mm · 1.00ct ≈ 6.4mm · 2.00ct ≈ 8.1mm",
            },
          ].map((item, i) => (
            <Reveal key={item.c} delay={i * 70}>
              <div className="border-t border-line pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-4xl text-gold-gradient">
                    {item.c[0]}
                  </span>
                  <h3 className="font-serif text-xl text-bone">{item.c}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  {item.d}
                </p>
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-bone-faint">
                  {item.scale}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Carat to millimetre */}
      <section className="container-luxe pb-14">
        <Reveal>
          <h2 className="font-serif text-2xl md:text-3xl text-bone">
            Round brilliant — carat to diameter
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-bone-dim">
            Approximate face-up size for a well-cut round brilliant. Fancy shapes
            vary; ask us for a shape-specific chart.
          </p>
        </Reveal>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-line text-left text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                <th className="py-4 pr-6 font-normal">Carat</th>
                <th className="py-4 pr-6 font-normal">Diameter</th>
                <th className="py-4 font-normal">Looks like</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {[
                ["0.25 ct", "4.1 mm", "A delicate accent or petite solitaire"],
                ["0.50 ct", "5.2 mm", "A classic first solitaire"],
                ["0.75 ct", "5.8 mm", "Noticeable, still understated"],
                ["1.00 ct", "6.4 mm", "The benchmark engagement size"],
                ["1.50 ct", "7.4 mm", "Substantial presence on the hand"],
                ["2.00 ct", "8.1 mm", "A statement centre stone"],
                ["3.00 ct", "9.3 mm", "Unmistakable"],
              ].map((row) => (
                <tr key={row[0]}>
                  <td className="py-4 pr-6 text-bone">{row[0]}</td>
                  <td className="py-4 pr-6 text-bone-dim">{row[1]}</td>
                  <td className="py-4 text-bone-dim">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="hairline container-luxe" />

      {/* Tabs */}
      <section className="container-luxe pt-14 pb-8">
        <Reveal>
          <p className="eyebrow">Finding Your Fit</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
            Ring, necklace &amp; bracelet sizes
          </h2>
        </Reveal>
        <div className="mt-8 flex gap-2 border-b border-line-soft">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-5 py-4 text-[0.7rem] uppercase tracking-[0.24em] transition-colors ${
                tab === t ? "text-bone" : "text-bone-faint hover:text-bone-dim"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-0 -bottom-px h-px bg-gold" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Chart panels */}
      <section className="container-luxe pb-16">
        <div key={tab} className="reveal is-visible">
          {tab === "Rings" && (
            <>
              <h2 className="font-serif text-2xl md:text-3xl text-bone">
                Ring conversion — master chart
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-line text-left text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                      <th className="py-4 pr-6 font-normal">US</th>
                      <th className="py-4 pr-6 font-normal">UK</th>
                      <th className="py-4 pr-6 font-normal">EU</th>
                      <th className="py-4 font-normal">Inner Ø (mm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft">
                    {ringChart.map((row) => (
                      <tr key={row.us}>
                        <td className="py-4 pr-6 text-bone">{row.us}</td>
                        <td className="py-4 pr-6 text-bone-dim">{row.uk}</td>
                        <td className="py-4 pr-6 text-bone-dim">{row.eu}</td>
                        <td className="py-4 text-bone-dim">{row.mm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "Necklaces" && (
            <>
              <h2 className="font-serif text-2xl md:text-3xl text-bone">
                Necklace lengths & where they sit
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-line text-left text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                      <th className="py-4 pr-6 font-normal">Length</th>
                      <th className="py-4 pr-6 font-normal">Name</th>
                      <th className="py-4 font-normal">Where it sits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft">
                    {necklaceChart.map((row) => (
                      <tr key={row.length}>
                        <td className="py-4 pr-6 text-bone">{row.length}</td>
                        <td className="py-4 pr-6 text-bone-dim">{row.name}</td>
                        <td className="py-4 text-bone-dim">{row.sits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "Bracelets" && (
            <>
              <h2 className="font-serif text-2xl md:text-3xl text-bone">
                Bracelet & cuff sizing
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-line text-left text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                      <th className="py-4 pr-6 font-normal">Size</th>
                      <th className="py-4 pr-6 font-normal">Wrist</th>
                      <th className="py-4 font-normal">Intended fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft">
                    {braceletChart.map((row) => (
                      <tr key={row.size}>
                        <td className="py-4 pr-6 text-bone">{row.size}</td>
                        <td className="py-4 pr-6 text-bone-dim">{row.wrist}</td>
                        <td className="py-4 text-bone-dim">{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>

      {/* How to measure */}
      <section className="border-y border-line-soft bg-ink-soft py-20">
        <div className="container-luxe grid gap-12 md:grid-cols-3">
          {[
            {
              t: "Measuring a ring",
              d: "Wrap a strip of paper around the base of your finger. Mark where it overlaps, lay it flat, and measure the length in millimetres. Divide by π (3.14) for the inner diameter, then read it off the master chart.",
            },
            {
              t: "Measuring for a necklace",
              d: "Use a soft tape at the length you want the piece to fall, or measure an existing necklace from clasp to clasp. Add 2 cm if you wear high necklines.",
            },
            {
              t: "Measuring a wrist",
              d: "Wrap the tape snugly around the wrist just below the bone. For a chain bracelet add 1.5 cm for comfort; for a cuff, measure the narrowest point.",
            },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 90}>
              <p className="eyebrow">Step 0{i + 1}</p>
              <h3 className="mt-3 font-serif text-xl text-bone">{item.t}</h3>
              <p className="mt-3 leading-relaxed text-bone-dim">{item.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Size finder quiz */}
      <section className="container-luxe py-20">
        <Reveal>
          <p className="eyebrow">Size Finder</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
            Three questions to the right method
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {quizQuestions.map((question, qi) => (
            <Reveal key={question.q} delay={qi * 80}>
              <div className="border border-line-soft p-6 h-full">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                  Question {qi + 1}
                </p>
                <p className="mt-3 font-serif text-lg text-bone">
                  {question.q}
                </p>
                <div className="mt-5 space-y-2">
                  {question.options.map((opt, oi) => {
                    const selected = answers[qi] === oi;
                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setAnswers((a) => {
                            const copy = [...a];
                            copy[qi] = oi;
                            return copy;
                          })
                        }
                        className={`block w-full border px-4 py-3 text-left text-sm transition-colors ${
                          selected
                            ? "border-gold bg-gold/10 text-bone"
                            : "border-line text-bone-dim hover:border-bone-faint"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {result && (
          <div className="mt-10 border border-gold/40 bg-gold/5 p-8">
            <p className="eyebrow">Your result</p>
            <p className="mt-3 font-serif text-xl text-bone">
              You&rsquo;re sizing {result.piece} for {result.fit} fit.
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-bone-dim">
              {result.method}
            </p>
            <Link href="/contact?subject=sizing" className="btn-ghost mt-6">
              Request a Complimentary Sizing Set
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
