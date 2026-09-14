import { NextResponse } from "next/server";

/**
 * Live bullion rates for gold, silver and platinum — Surat by default.
 *
 * Every number here comes from a real, currently-live source. Nothing is
 * hardcoded or fabricated:
 *
 *   - Spot price per troy ounce (USD): https://api.gold-api.com
 *     Free, no API key, no quota. Backed by live market data. Symbols used:
 *     XAU (gold), XAG (silver), XPT (platinum).
 *   - USD → INR exchange rate: https://open.er-api.com (primary),
 *     falling back to https://api.frankfurter.dev (ECB rates) if that's down.
 *     Both are free and require no API key.
 *
 * From there:
 *   - troy ounce → gram is a fixed physical constant (1 oz t = 31.1034768 g).
 *   - 24k/22k/18k/14k purity fractions are definitions (18k IS 18/24 parts
 *     pure gold by law/assay standard), not a market "multiplier" — these
 *     are not guesses, they're what those karat labels mean.
 *
 * There is no per-city price adjustment: bullion (gold/silver/platinum) is a
 * single national/international spot market — the *making charge* is what
 * varies by jeweller, and Soni Diamonds' is a flat ₹850/g everywhere. A
 * fabricated "Mumbai is 0.8% pricier than Surat" multiplier was removed —
 * that was never real data.
 */

export const revalidate = 300; // cache each response for 5 minutes

const TROY_OUNCE_IN_GRAMS = 31.1034768;
const MAKING_CHARGE_PER_GRAM = 850;

type MetalPriceResponse = {
  price?: number;
  updatedAt?: string;
};

type FxResponse = {
  result?: string;
  rates?: { INR?: number };
};

type FrankfurterResponse = {
  rates?: { INR?: number };
};

async function fetchMetalSpotUsdPerOunce(symbol: "XAU" | "XAG" | "XPT") {
  const res = await fetch(`https://api.gold-api.com/price/${symbol}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`gold-api.com returned ${res.status} for ${symbol}`);
  }
  const data: MetalPriceResponse = await res.json();
  if (typeof data.price !== "number") {
    throw new Error(`gold-api.com response for ${symbol} had no price`);
  }
  return data.price;
}

async function fetchUsdToInr(): Promise<number> {
  // Primary: open.er-api.com — free, no key, updates daily.
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data: FxResponse = await res.json();
      if (data.result === "success" && typeof data.rates?.INR === "number") {
        return data.rates.INR;
      }
    }
  } catch {
    // fall through to backup source
  }

  // Fallback: Frankfurter (ECB rates) — also free, no key.
  const res = await fetch(
    "https://api.frankfurter.dev/v1/latest?from=USD&to=INR",
    { next: { revalidate: 300 } }
  );
  if (!res.ok) {
    throw new Error(`Frankfurter FX fallback returned ${res.status}`);
  }
  const data: FrankfurterResponse = await res.json();
  if (typeof data.rates?.INR !== "number") {
    throw new Error("Frankfurter FX fallback response had no INR rate");
  }
  return data.rates.INR;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // City param is accepted for forward-compatibility with per-location
  // display (e.g. showing "for Mumbai" in the UI), but bullion price itself
  // does not vary by Indian city — it's one spot market. Only Surat is
  // supported as a display label today.
  const city = searchParams.get("city") || "Surat";

  try {
    const [goldUsdOz, silverUsdOz, platinumUsdOz, usdToInr] =
      await Promise.all([
        fetchMetalSpotUsdPerOunce("XAU"),
        fetchMetalSpotUsdPerOunce("XAG"),
        fetchMetalSpotUsdPerOunce("XPT"),
        fetchUsdToInr(),
      ]);

    const usdOzToInrGram = (usdOz: number) =>
      (usdOz * usdToInr) / TROY_OUNCE_IN_GRAMS;

    const gold24kPerGram = usdOzToInrGram(goldUsdOz);
    const silverPerGram = usdOzToInrGram(silverUsdOz);
    const platinumPerGram = usdOzToInrGram(platinumUsdOz);

    const round = (n: number) => Math.round(n);

    return NextResponse.json({
      city,
      timestamp: new Date().toISOString(),
      source: {
        metals: "gold-api.com (live spot, XAU/XAG/XPT, USD/oz)",
        fx: "open.er-api.com (USD→INR, with frankfurter.dev fallback)",
      },
      usdToInr,
      gold: {
        "24k": round(gold24kPerGram),
        "22k": round(gold24kPerGram * (22 / 24)),
        "18k": round(gold24kPerGram * (18 / 24)),
        "14k": round(gold24kPerGram * (14 / 24)),
      },
      silver: {
        "999": round(silverPerGram),
      },
      platinum: {
        "950": round(platinumPerGram * 0.95),
      },
      makingChargesPerGram: MAKING_CHARGE_PER_GRAM,
      currency: "INR",
      isLiveApi: true,
      note: `Live spot bullion rates converted to INR per gram. Flat ₹${MAKING_CHARGE_PER_GRAM}/g making charges apply on top at Soni Diamonds.`,
    });
  } catch (error) {
    console.error("Failed to fetch live bullion rates:", error);
    return NextResponse.json(
      {
        error: "Live rate sources are temporarily unavailable. Please try again shortly.",
        isLiveApi: false,
      },
      { status: 502 }
    );
  }
}
