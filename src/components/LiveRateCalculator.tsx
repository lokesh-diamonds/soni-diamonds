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
  makingChargesPerGram: number;
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
  { id: "Gold-24K", label: "Gold (24K Pure)", defaultRate: 7450 },
  { id: "Gold-22K", label: "Gold (22K Standard)", defaultRate: 6830 },
  { id: "Gold-18K", label: "Gold (18K Hallmark)", defaultRate: 5590 },
  { id: "Gold-14K", label: "Gold (14K Custom)", defaultRate: 4350 },
  { id: "Silver", label: "Silver (999 Fine)", defaultRate: 88 },
  { id: "Platinum", label: "Platinum (950 Fine)", defaultRate: 3400 },
];

export default function LiveRateCalculator() {
  const [location, setLocation] = useState("Surat");
  const [rates, setRates] = useState<RateData | null>(null);
  const [loading, setLoading] = useState(true);

  // Tab State: "converter" (matches user screenshot) or "jewellery"
  const [activeTab, setActiveTab] = useState<"converter" | "jewellery">("converter");

  // -------------------------------------------------------------
  // UNIT CONVERTER STATE (User Screenshot Feature)
  // -------------------------------------------------------------
  const [amount, setAmount] = useState<number>(10);
  const [unit, setUnit] = useState<string>("Gram");
  const [selectedMetal, setSelectedMetal] = useState<string>("Gold-24K");
  const [customRate, setCustomRate] = useState<number>(7450); // editable rate per gram
  const [includeMaking, setIncludeMaking] = useState<boolean>(false);

  // -------------------------------------------------------------
  // JEWELLERY CALCULATOR STATE
  // -------------------------------------------------------------
  const [purity, setPurity] = useState<"18k" | "14k" | "22k" | "24k">("18k");
  const [metalWeight, setMetalWeight] = useState<number>(5.0); // grams

  const MAKING_CHARGE_PER_GRAM = 850; // INR per gram fixed rate

  const CITIES = [
    "Surat",
    "Mumbai",
    "Delhi",
    "Ahmedabad",
    "Bangalore",
    "Nagpur",
    "Kolkata",
    "International",
  ];

  const fetchRates = async (city: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rates?city=${encodeURIComponent(city)}`);
      if (res.ok) {
        const data = await res.json();
        setRates(data);
        // Set initial custom rate from live 24K gold rate for selected city
        if (data.gold?.["24k"]) {
          setCustomRate(data.gold["24k"]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch live rates for calculator", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLoc = localStorage.getItem("soni_user_location") || "Surat";
    setLocation(savedLoc);
    fetchRates(savedLoc);

    const handleLocChange = (e: CustomEvent) => {
      if (e.detail) {
        setLocation(e.detail);
        fetchRates(e.detail);
      }
    };

    window.addEventListener("soni_location_changed" as any, handleLocChange);
    return () => window.removeEventListener("soni_location_changed" as any, handleLocChange);
  }, []);

  const handleCityChange = (city: string) => {
    setLocation(city);
    localStorage.setItem("soni_user_location", city);
    window.dispatchEvent(new CustomEvent("soni_location_changed", { detail: city }));
    fetchRates(city);
  };

  // Sync custom rate when metal selection changes
  const handleMetalChange = (metalId: string) => {
    setSelectedMetal(metalId);
    if (rates && rates.gold) {
      if (metalId === "Gold-24K") setCustomRate(rates.gold["24k"]);
      else if (metalId === "Gold-22K") setCustomRate(rates.gold["22k"]);
      else if (metalId === "Gold-18K") setCustomRate(rates.gold["18k"]);
      else if (metalId === "Gold-14K") setCustomRate(rates.gold["14k"]);
      else if (metalId === "Silver") setCustomRate(88);
      else if (metalId === "Platinum") setCustomRate(3400);
    } else {
      const metalObj = METALS.find((m) => m.id === metalId);
      if (metalObj) setCustomRate(metalObj.defaultRate);
    }
  };

  const handleResetRate = () => {
    handleMetalChange(selectedMetal);
  };

  // Unit converter calculation logic
  const selectedUnitObj = UNITS.find((u) => u.id === unit) || UNITS[0];
  const totalGrams = (amount || 0) * selectedUnitObj.factor;

  const effectiveRatePerGram = customRate + (includeMaking ? MAKING_CHARGE_PER_GRAM : 0);
  const estimatedValue = totalGrams * effectiveRatePerGram;

  // Conversions for badges
  const gramsVal = totalGrams;
  const tensVal = totalGrams / 10;
  const kgVal = totalGrams / 1000;
  const tolaVal = totalGrams / 11.6638038;
  const ounceVal = totalGrams / 31.1034768;

  // Jewellery Calculator calculation logic
  const goldRatePerGram = rates ? rates.gold[purity] : purity === "18k" ? 5590 : purity === "14k" ? 4350 : purity === "22k" ? 6830 : 7450;
  const rawGoldCost = metalWeight * goldRatePerGram;
  const totalMakingCharge = metalWeight * MAKING_CHARGE_PER_GRAM;
  const subtotal = rawGoldCost + totalMakingCharge;
  const gst = subtotal * 0.03; // 3% GST
  const grandTotal = subtotal + gst;

  return (
    <div className="rounded-2xl border border-gold/40 bg-gradient-to-b from-ink-panel via-black/95 to-ink-panel p-6 md:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-[0.65rem] uppercase tracking-[0.25em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            Live User Location Pricing Hub
          </div>
          <h3 className="mt-2 font-serif text-2xl md:text-3xl text-bone">
            Live Gold &amp; Silver Rate Calculator
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-bone-dim">
            <span>📍 Calculating for location:</span>
            <select
              value={location}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-black/80 border border-gold/40 text-gold text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-gold font-medium"
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-ink-panel text-bone py-1">
                  {c} {c === "Surat" ? "(Wholesale Hub)" : "Market"}
                </option>
              ))}
            </select>
            <span className="text-bone-faint text-[0.7rem]">
              · Soni Atelier: LB Char Rasta, Mahidharpura, Surat
            </span>
          </div>
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
                value={customRate}
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
                {amount} {unit} of {METALS.find((m) => m.id === selectedMetal)?.label} @ ₹{effectiveRatePerGram.toLocaleString("en-IN")}/g
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
                Select Gold Purity (Surat Live Rate: ₹{goldRatePerGram.toLocaleString("en-IN")}/g)
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
                  Surat Live Rates
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-bone-dim">
                  <span>Gold Cost ({purity.toUpperCase()} · {metalWeight}g @ ₹{goldRatePerGram.toLocaleString("en-IN")}/g):</span>
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
                *Gold rates updated dynamically for LB Char Rasta, Mahidharpura, Surat.
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
