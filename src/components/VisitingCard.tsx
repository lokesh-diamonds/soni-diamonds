"use client";

import Image from "next/image";
import { useState } from "react";

// Served `unoptimized` so exact high-res pixels reach the browser.
const CARD_SRC = "/images/visiting-card.jpeg";
const CARD_W = 1600;
const CARD_H = 900;

type Props = {
  /** "panel" = full featured block (footer). "compact" = slim card (sidebar). */
  variant?: "panel" | "compact";
};

export default function VisitingCard({ variant = "panel" }: Props) {
  const [open, setOpen] = useState(false);

  // Continuously revolving infinite marquee loop
  const revolvingMarquee = (
    <div
      className="overflow-hidden w-full py-2 cursor-pointer"
      onClick={() => setOpen(true)}
      role="button"
      tabIndex={0}
      aria-label="View Soni Diamonds Business Card"
    >
      <div className="flex w-max animate-card-scroll items-center gap-8 hover:[animation-play-state:paused]">
        {[0, 1, 2, 3].map((dup) => (
          <div key={dup} className="shrink-0 flex items-center justify-center">
            <Image
              src={CARD_SRC}
              alt="Soni Diamonds Official Business Card — Front & Back"
              width={CARD_W}
              height={CARD_H}
              unoptimized
              priority={dup === 0}
              aria-hidden={dup > 0}
              className={
                variant === "compact"
                  ? "h-[120px] w-auto shrink-0 object-contain sm:h-[150px]"
                  : "h-[180px] w-auto shrink-0 object-contain sm:h-[220px] md:h-[260px]"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {variant === "panel" ? (
        <div className="w-full my-6 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-[0.65rem] uppercase tracking-[0.25em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                </span>
                Official Business Card
              </div>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl text-bone">
                Soni Diamonds — Luxury Diamond Jewellery
              </h3>
            </div>
          </div>

          {/* Clean revolving cards without grey background */}
          {revolvingMarquee}
        </div>
      ) : (
        <div className="w-full py-3">
          <div className="flex items-center gap-3 pb-3 border-b border-line-soft mb-3">
            <div className="relative h-8 w-8 shrink-0">
              <Image src="/images/logo-transparent.png" alt="Soni Diamonds" fill className="object-contain" />
            </div>
            <div>
              <h3 className="font-serif text-base text-bone">Official Business Card</h3>
              <p className="text-[0.7rem] text-gold">Soni Diamonds · Surat</p>
            </div>
          </div>
          {revolvingMarquee}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-gold/40 bg-ink-panel p-4 md:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line-soft pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 shrink-0">
                  <Image src="/images/logo-transparent.png" alt="Logo" fill className="object-contain" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-bone">
                    Soni Diamonds Business Card
                  </h4>
                  <p className="text-xs text-gold">Lokesh Soni · Wholesaler &amp; Retailer</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-bone-dim hover:text-bone text-2xl p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Full card modal view */}
            <div className="overflow-x-auto p-2 flex justify-center">
              <Image
                src={CARD_SRC}
                alt="Soni Diamonds visiting card — full front and back"
                width={CARD_W}
                height={CARD_H}
                unoptimized
                className="h-[260px] w-auto max-w-full sm:h-[340px] md:h-[420px] object-contain"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-bone-dim border-t border-line-soft/40">
              <span>Lokesh Soni · +91 93098 52270</span>
              <span>lokesh@sonidiamonds.in</span>
              <span>Making Charges: ₹850 / gram</span>
              <span>LB Char Rasta · Mahidharpura · Surat</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


