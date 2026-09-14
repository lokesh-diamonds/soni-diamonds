"use client";

import { useEffect, useState } from "react";

type RateData = {
  city: string;
  gold: {
    "24k": number;
    "22k": number;
    "18k": number;
    "14k": number;
  };
  silver: { "999": number };
  platinum: { "950": number };
  makingChargesPerGram: number;
  isLiveApi: boolean;
};

// Unit conversion factors relative to 1 Gram
const UNITS = [
  { id: "Gram", label: "Gram", factor: 1 },
  { id: "10g", label: "10g", factor: 10 },
  { id: "Kg", label: "Kg", factor: 1000 },
  { id: "Tola", label: "Tola", factor: 11.6638038 },
  { id: "Ounce", label: "Ounce (Troy)", factor: 31.1034768 },
  { id: "Sovereign", label: "Sovereign (8g)", factor: 8 },
];

const METALS = [
  { id: "Gold-24K", label: "Gold (24K Pure)" },
  { id: "Gold-22K", label: "Gold (22K Standard)" },
  { id: "Gold-18K", label: "Gold (18K Hallmark)" },
  { id: "Gold-14K", label: "Gold (14K Custom)" },
  { id: "Silver", label: "Silver (999 Fine)" },
  { id: "Platinum", label: "Platinum (950 Fine)" },
];

// Live rate lookup per metal id, given the API response. Returns null if the
// rate isn't loaded yet — callers must handle that rather than falling back
// to an invented number.
function liveRateFor(rates: RateData | null, metalId: string): number | null {
  if (!rates) return null;
  switch (metalId) {
    case "Gold-24K":
      return rates.gold["24k"];
    case "Gold-22K":
      return rates.gold["22k"];
    case "Gold-18K":
      return rates.gold["18k"];
    case "Gold-14K":
      return rates.gold["14k"];
    case "Silver":
      return rates.silver["999"];
    case "Platinum":
      return rates.platinum["950"];
    default:
      return null;
  }
}

export default function LiveRateCalculator({ embedded = false }: { embedded?: boolean }) {
  const [rates, setRates] = useState<RateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // The bullion spot price is one real market — there is no genuine per-city
  // premium data available without a paid Indian bullion-association feed.
  // "Location" here is therefore a detected DISPLAY LABEL only: we show the
  // user's real city (via browser geolocation + reverse geocoding, exactly
  // as LocationPrompt already does), but the rate itself is the same live
  // spot rate everywhere. Nothing here is a fabricated city multiplier.
  const [location, setLocation] = useState("Surat");
  const [detecting, setDetecting] = useState(false);

  // Tab State: "converter" (matches user screenshot) or "jewellery"
  const [activeTab, setActiveTab] = useState<"converter" | "jewellery">("converter");

  // -------------------------------------------------------------
  // UNIT CONVERTER STATE (User Screenshot Feature)
  // -------------------------------------------------------------
  const [amount, setAmount] = useState<number>(10);
  const [unit, setUnit] = useState<string>("Gram");
  const [selectedMetal, setSelectedMetal] = useState<string>("Gold-24K");
  // Editable rate per gram — seeded from the live rate once it loads, but
  // the user is free to override it (e.g. to their own dealer's quote).
  const [customRate, setCustomRate] = useState<number | null>(null);
  const [includeMaking, setIncludeMaking] = useState<boolean>(false);

  // -------------------------------------------------------------
  // JEWELLERY CALCULATOR STATE
  // -------------------------------------------------------------
  const [purity, setPurity] = useState<"18k" | "14k" | "22k" | "24k">("18k");
  const [metalWeight, setMetalWeight] = useState<number>(5.0); // grams

  const MAKING_CHARGE_PER_GRAM = 850; // INR per gram fixed rate

  const fetchRates = async (city: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rates?city=${encodeURIComponent(city)}`);
      if (res.ok) {
        const data: RateData = await res.json();
        setRates(data);
        setLoadError(false);
        setCustomRate((prev) => prev ?? data.gold["24k"]);
      } else {
        setLoadError(true);
      }
    } catch (err) {
      console.error("Failed to fetch live rates for calculator", err);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("soni_user_location") || "Surat";
    setLocation(saved);
    fetchRates(saved);

    const interval = setInterval(() => fetchRates(saved), 5 * 60 * 1000);

    // Stay in sync if LocationPrompt (or this component's own detector)
    // changes the saved location elsewhere on the page.
    const handleLocChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) {
        setLocation(detail);
        fetchRates(detail);
      }
    };
    window.addEventListener("soni_location_changed", handleLocChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("soni_location_changed", handleLocChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real browser geolocation → real reverse geocoding (OpenStreetMap
  // Nominatim, free, no key) — the same approach LocationPrompt uses. No
  // fallback list of fake cities; if detection fails we simply keep Surat.
  const handleDetectLocation = () => {
    if (!("geolocation" in navigator)) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (res.ok) {
            const data = await res.json();
            const city: string =
              data.address?.city ||
              data.address?.town ||
              data.address?.state ||
              "Surat";
            localStorage.setItem("soni_user_location", city);
            window.dispatchEvent(
              new CustomEvent("soni_location_changed", { detail: city })
            );
            setLocation(city);
            fetchRates(city);
          }
        } catch (err) {
          console.error("Reverse geocoding failed", err);
        } finally {
          setDetecting(false);
        }
      },
      () => setDetecting(false)
    );
  };

  // Reset Unit Converter values
  const handleResetConverter = () => {
    setAmount(10);
    setUnit("Gram");
    setSelectedMetal("Gold-24K");
    setIncludeMaking(false);
    setCustomRate(rates?.gold["24k"] ?? null);
  };

  // Sync custom rate when metal selection changes, from the live rate.
  const handleMetalChange = (metalId: string) => {
    setSelectedMetal(metalId);
    const live = liveRateFor(rates, metalId);
    if (live !== null) setCustomRate(live);
  };

  const handleResetRate = () => {
    handleMetalChange(selectedMetal);
  };

  const unitConfig = UNITS.find((u) => u.id === unit) || UNITS[0];
  const effectiveRate = customRate ?? 0;

  // Calculate Unit Converter totals
  const totalGramsInUnit = amount * unitConfig.factor;
  const rawMetalCost = totalGramsInUnit * effectiveRate;
  const makingCost = includeMaking ? totalGramsInUnit * MAKING_CHARGE_PER_GRAM : 0;
  const estimatedValue = rawMetalCost + makingCost;

  // Conversions for badges
  const gramsVal = totalGramsInUnit;
  const tensVal = totalGramsInUnit / 10;
  const kgVal = totalGramsInUnit / 1000;
  const tolaVal = totalGramsInUnit / 11.6638038;
  const ounceVal = totalGramsInUnit / 31.1034768;

  // Calculate Jewellery Estimator totals — only meaningful once live rates
  // have loaded; renders a loading state otherwise rather than a guess.
  const activeRateForPurity = rates?.gold?.[purity] ?? null;
  const rawGoldCost = activeRateForPurity !== null ? metalWeight * activeRateForPurity : 0;
  const totalMakingCharge = metalWeight * MAKING_CHARGE_PER_GRAM;
  const subtotal = rawGoldCost + totalMakingCharge;
  const gst = subtotal * 0.03; // 3% GST
  const grandTotal = subtotal + gst;

  return (
    <div className={`rounded-2xl ${embedded ? "border-0 shadow-none bg-transparent p-2 sm:p-4" : "border border-gold/40 bg-gradient-to-b from-ink-panel via-black/95 to-ink-panel p-6 md:p-8 shadow-2xl"}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-[0.65rem] uppercase tracking-[0.25em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            Live Bullion Rates
          </div>
          <h3 className="mt-2 font-serif text-2xl md:text-3xl text-bone">
            Live Gold, Silver &amp; Platinum Rate Calculator
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-bone-dim">
            <span className="text-gold font-medium">📍 {location}</span>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={detecting}
              className="text-[0.65rem] px-2 py-0.5 rounded-full border border-gold/30 bg-gold/10 text-gold hover:bg-gold/20 transition-colors disabled:opacity-50"
            >
              {detecting ? "Detecting…" : "Use my location"}
            </button>
            {!loading && (
              <span
                className={`text-[0.65rem] px-2 py-0.5 rounded-full border ${
                  loadError
                    ? "text-rose-300 border-rose-500/30 bg-rose-500/10"
                    : "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                }`}
              >
                {loadError ? "Rates unavailable" : "Live"}
              </span>
            )}
          </div>
          <p className="mt-1 text-[0.65rem] text-bone-faint leading-relaxed max-w-md">
            Gold, silver and platinum trade on one live international spot
            market, so the rate shown is the same real-time price wherever
            you are — we simply label it with your detected city.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-ink/80 p-1.5 rounded-xl border border-gold/30">
          <button
            type="button"
            onClick={() => setActiveTab("converter")}
            className={`px-4 py-2 text-xs rounded-lg font-serif transition-all ${
              activeTab === "converter"
                ? "bg-gold text-black font-semibold shadow-md"
                : "text-bone-dim hover:text-bone"
            }`}
          >
            Unit Converter
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("jewellery")}
            className={`px-4 py-2 text-xs rounded-lg font-serif transition-all ${
              activeTab === "jewellery"
                ? "bg-gold text-black font-semibold shadow-md"
                : "text-bone-dim hover:text-bone"
            }`}
          >
            Jewellery Estimator
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: GOLD / SILVER UNIT CONVERTER (Matches User Screenshot) */}
      {/* ============================================================ */}
      {activeTab === "converter" && (
        <div className="space-y-6">
          <div>
            <h4 className="font-serif text-lg text-bone">Gold/Silver Unit Converter</h4>
            <p className="text-xs text-bone-faint mt-0.5">
              Prefilled from today&rsquo;s live rate at page load. Editable rate per gram.
            </p>
          </div>

          {/* Form Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Amount */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-bone-faint mb-1.5">
                Amount
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/60 border border-line-soft rounded-xl px-4 py-2.5 text-sm text-bone font-mono focus:outline-none focus:border-gold"
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-bone-faint mb-1.5">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-black/60 border border-line-soft rounded-xl px-4 py-2.5 text-sm text-bone focus:outline-none focus:border-gold"
              >
                {UNITS.map((u) => (
                  <option key={u.id} value={u.id} className="bg-ink-panel text-bone py-2">
                    {u.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Metal */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-bone-faint mb-1.5">
                Metal
              </label>
              <select
                value={selectedMetal}
                onChange={(e) => handleMetalChange(e.target.value)}
                className="w-full bg-black/60 border border-line-soft rounded-xl px-4 py-2.5 text-sm text-bone focus:outline-none focus:border-gold"
              >
                {METALS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-ink-panel text-bone py-2">
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rate per gram (Editable) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-bone-faint mb-1.5">
                Rate per gram (₹)
              </label>
              <input
                type="number"
                min="0"
                value={customRate ?? ""}
                placeholder={loading ? "Loading…" : "0"}
                onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/60 border border-gold/40 rounded-xl px-4 py-2.5 text-sm text-gold font-mono font-semibold focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={handleResetRate}
              className="text-xs px-3.5 py-1.5 rounded-lg border border-gold/30 bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
            >
              Reset to today&rsquo;s rate
            </button>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-bone-dim hover:text-bone">
              <input
                type="checkbox"
                checked={includeMaking}
                onChange={(e) => setIncludeMaking(e.target.checked)}
                className="accent-gold rounded"
              />
              Include Soni Diamonds Flat Making Charge (+₹850/g)
            </label>
          </div>

          {/* Unit Conversion Badges (Matching Screenshot) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="bg-ink/70 border border-line-soft rounded-xl p-3 text-center">
              <span className="text-xs text-bone-faint block">Gram</span>
              <span className="font-mono text-sm text-bone font-medium mt-0.5 block">
                {gramsVal.toFixed(3)}
              </span>
            </div>

            <div className="bg-ink/70 border border-line-soft rounded-xl p-3 text-center">
              <span className="text-xs text-bone-faint block">10g</span>
              <span className="font-mono text-sm text-bone font-medium mt-0.5 block">
                {tensVal.toFixed(3)}
              </span>
            </div>

            <div className="bg-ink/70 border border-line-soft rounded-xl p-3 text-center">
              <span className="text-xs text-bone-faint block">Kg</span>
              <span className="font-mono text-sm text-bone font-medium mt-0.5 block">
                {kgVal.toFixed(3)}
              </span>
            </div>

            <div className="bg-ink/70 border border-line-soft rounded-xl p-3 text-center">
              <span className="text-xs text-bone-faint block">Tola</span>
              <span className="font-mono text-sm text-bone font-medium mt-0.5 block">
                {tolaVal.toFixed(3)}
              </span>
            </div>

            <div className="bg-ink/70 border border-line-soft rounded-xl p-3 text-center col-span-2 sm:col-span-1">
              <span className="text-xs text-bone-faint block">Ounce</span>
              <span className="font-mono text-sm text-bone font-medium mt-0.5 block">
                {ounceVal.toFixed(3)}
              </span>
            </div>
          </div>

          {/* Estimated Value Output */}
          <div className="rounded-xl border border-gold/40 bg-gold/10 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-bone-faint uppercase tracking-wider block">Total Calculation</span>
              <span className="text-sm text-bone font-medium">
                {amount} {unit} of {METALS.find((m) => m.id === selectedMetal)?.label} @ ₹{effectiveRate.toLocaleString("en-IN")}/g
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-bone-faint block">Estimated value</span>
              <span className="font-serif text-2xl md:text-3xl text-gold font-bold">
                ₹{Math.round(estimatedValue).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: JEWELLERY PRICE ESTIMATOR */}
      {/* ============================================================ */}
      {activeTab === "jewellery" && (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Metal Purity */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-bone-faint mb-2">
                Select Gold Purity (Live Rate: {activeRateForPurity !== null ? `₹${activeRateForPurity.toLocaleString("en-IN")}/g` : "loading…"})
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["18k", "14k", "22k", "24k"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurity(p)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-serif transition-all ${
                      purity === p
                        ? "border-gold bg-gold/15 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        : "border-line-soft bg-black/40 text-bone-dim hover:text-bone"
                    }`}
                  >
                    {p.toUpperCase()} Gold
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Weight */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="uppercase tracking-wider text-bone-faint">Gold Weight (Grams)</span>
                <span className="text-gold font-medium">{metalWeight} g</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="50"
                step="0.5"
                value={metalWeight}
                onChange={(e) => setMetalWeight(parseFloat(e.target.value))}
                className="w-full accent-gold bg-ink/60 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[0.65rem] text-bone-faint mt-1">
                <span>0.5g (Light Ring)</span>
                <span>10g (Chain / Pendant)</span>
                <span>50g (Heavy Bangle / Set)</span>
              </div>
            </div>
          </div>

          {/* Live Calculation Output Column */}
          <div className="lg:col-span-5 bg-black/60 rounded-xl border border-gold/30 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-line-soft pb-3 mb-4">
                <span className="font-serif text-lg text-bone">Jewellery Price Breakdown</span>
                <span className="text-[0.65rem] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  {location} · Live Rates
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-bone-dim">
                  <span>Gold Cost ({purity.toUpperCase()} · {metalWeight}g @ {activeRateForPurity !== null ? `₹${activeRateForPurity.toLocaleString("en-IN")}/g` : "loading…"}):</span>
                  <span className="text-bone font-mono">₹{Math.round(rawGoldCost).toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-gold font-medium bg-gold/10 p-2 rounded-lg border border-gold/20">
                  <span>Flat Making Charges ({metalWeight}g × ₹850/g):</span>
                  <span className="font-mono">₹{Math.round(totalMakingCharge).toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-bone-faint">
                  <span>GST (3%):</span>
                  <span className="font-mono">₹{Math.round(gst).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-line-soft mt-6">
              <div className="text-xs text-bone-faint uppercase tracking-wider">Estimated Total Price</div>
              <div className="font-serif text-3xl text-gold font-semibold mt-1">
                ₹{Math.round(grandTotal).toLocaleString("en-IN")}
              </div>
              <p className="text-[0.65rem] text-bone-faint mt-2 leading-relaxed">
                *Live international spot gold rate, refreshed every few minutes. Soni Diamonds atelier: LB Char Rasta, Mahidharpura, Surat.
              </p>

              <a
                href={`/contact?subject=custom_quote&details=${encodeURIComponent(
                  `Quote Request: ${purity.toUpperCase()} Gold (${metalWeight}g). Est total: ₹${Math.round(grandTotal)}`
                )}`}
                className="mt-4 w-full btn-gold text-xs py-3 text-center block"
              >
                Request Custom Quote with Lokesh Soni →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
