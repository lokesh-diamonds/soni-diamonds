"use client";

import { useEffect, useState } from "react";

type RateData = {
  city: string;
  timestamp: string;
  gold: {
    "24k": number;
    "22k": number;
    "18k": number;
    "14k": number;
  };
  diamond: {
    naturalPerCarat: number;
    labPerCarat: number;
  };
  makingChargesPerGram: number;
  currency: string;
};

export default function FooterLiveRates() {
  const [rates, setRates] = useState<RateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("/api/rates?city=Surat");
        if (res.ok) {
          const data = await res.json();
          setRates(data);
        }
      } catch (err) {
        console.error("Failed to load Surat live rates", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-gold/30 bg-gradient-to-r from-ink-panel via-black/80 to-ink-panel p-4 md:p-5 my-8 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft/60 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-serif text-sm text-bone tracking-wide">
            Surat Live Rate Puller
          </span>
          <span className="text-[0.65rem] uppercase tracking-widest text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded-full">
            Katargam &amp; Mahidharpura Market
          </span>
        </div>

        <div className="text-[0.7rem] text-bone-faint">
          Making Charges: <span className="text-gold font-semibold">₹850 / gram</span> (Flat Rate)
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-2 text-xs text-bone-faint animate-pulse">
          Fetching live Surat gold rates...
        </div>
      ) : rates ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-ink/60 border border-gold/20 rounded-lg p-2.5">
            <p className="text-[0.65rem] uppercase tracking-wider text-bone-faint">24K Gold Rate (Surat)</p>
            <p className="font-serif text-base md:text-lg text-gold font-medium mt-0.5">
              ₹{rates.gold["24k"].toLocaleString("en-IN")} <span className="text-[0.65rem] font-sans text-bone-dim">/ g</span>
            </p>
          </div>

          <div className="bg-ink/60 border border-gold/20 rounded-lg p-2.5">
            <p className="text-[0.65rem] uppercase tracking-wider text-bone-faint">22K Gold Rate (Surat)</p>
            <p className="font-serif text-base md:text-lg text-gold font-medium mt-0.5">
              ₹{rates.gold["22k"].toLocaleString("en-IN")} <span className="text-[0.65rem] font-sans text-bone-dim">/ g</span>
            </p>
          </div>

          <div className="bg-ink/60 border border-gold/20 rounded-lg p-2.5">
            <p className="text-[0.65rem] uppercase tracking-wider text-bone-faint">18K Gold Rate (Surat)</p>
            <p className="font-serif text-base md:text-lg text-gold font-medium mt-0.5">
              ₹{rates.gold["18k"].toLocaleString("en-IN")} <span className="text-[0.65rem] font-sans text-bone-dim">/ g</span>
            </p>
          </div>

          <div className="bg-ink/60 border border-gold/20 rounded-lg p-2.5">
            <p className="text-[0.65rem] uppercase tracking-wider text-bone-faint">14K Gold Rate (Surat)</p>
            <p className="font-serif text-base md:text-lg text-gold font-medium mt-0.5">
              ₹{rates.gold["14k"].toLocaleString("en-IN")} <span className="text-[0.65rem] font-sans text-bone-dim">/ g</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-xs text-rose-300 text-center py-2">
          Unable to pull live market rates. Please check connection.
        </div>
      )}
    </div>
  );
}
