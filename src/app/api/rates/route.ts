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
 * varies by jeweller, and Soni Diamonds' is a flat ₹850/g everywhere.
 *
 * RESILIENCE: each upstream call gets a short timeout and one retry. If both
 * attempts fail (e.g. a transient DNS/network blip), we serve the last
 * successfully fetched rates from an in-memory cache rather than a hard
 * error — clearly marked `isLiveApi: false, stale: true` with the age of
 * that data, so the UI can show it honestly instead of breaking outright.
 * Only if there has NEVER been a successful fetch since the server started
 * do we return a real error.
 */

export const revalidate = 300; // cache each response for 5 minutes

const TROY_OUNCE_IN_GRAMS = 31.1034768;
const MAKING_CHARGE_PER_GRAM = 850;
const FETCH_TIMEOUT_MS = 6000;
const MAX_STALE_AGE_MS = 6 * 60 * 60 * 1000; // 6 hours

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

type ComputedRates = {
  usdToInr: number;
  gold: { "24k": number; "22k": number; "18k": number; "14k": number };
  silver: { "999": number };
  platinum: { "950": number };
};

// In-memory last-known-good cache. Persists for the life of the server
// process/lambda instance — not a database, just a resilience buffer.
let lastGoodRates: { data: ComputedRates; fetchedAt: number } | null = null;

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 300 },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(
  url: string,
  attempts = 2,
  timeoutMs = FETCH_TIMEOUT_MS
) {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetchWithTimeout(url, timeoutMs);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

async function fetchMetalSpotUsdPerOunce(symbol: "XAU" | "XAG" | "XPT") {
  const res = await fetchWithRetry(`https://api.gold-api.com/price/${symbol}`);
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
    const res = await fetchWithRetry("https://open.er-api.com/v6/latest/USD");
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
  const res = await fetchWithRetry(
    "https://api.frankfurter.dev/v1/latest?from=USD&to=INR"
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

async function computeLiveRates(): Promise<ComputedRates> {
  const [goldUsdOz, silverUsdOz, platinumUsdOz, usdToInr] = await Promise.all([
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

  return {
    usdToInr,
    gold: {
      "24k": round(gold24kPerGram),
      "22k": round(gold24kPerGram * (22 / 24)),
      "18k": round(gold24kPerGram * (18 / 24)),
      "14k": round(gold24kPerGram * (14 / 24)),
    },
    silver: { "999": round(silverPerGram) },
    platinum: { "950": round(platinumPerGram * 0.95) },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // City param is a display label only — see file header. Bullion price
  // itself does not vary by Indian city; it's one live spot market.
  const city = searchParams.get("city") || "Surat";

  try {
    const computed = await computeLiveRates();
    lastGoodRates = { data: computed, fetchedAt: Date.now() };

    return NextResponse.json({
      city,
      timestamp: new Date().toISOString(),
      source: {
        metals: "gold-api.com (live spot, XAU/XAG/XPT, USD/oz)",
        fx: "open.er-api.com (USD→INR, with frankfurter.dev fallback)",
      },
      usdToInr: computed.usdToInr,
      gold: computed.gold,
      silver: computed.silver,
      platinum: computed.platinum,
      makingChargesPerGram: MAKING_CHARGE_PER_GRAM,
      currency: "INR",
      isLiveApi: true,
      stale: false,
      note: `Live spot bullion rates converted to INR per gram. Flat ₹${MAKING_CHARGE_PER_GRAM}/g making charges apply on top at Soni Diamonds.`,
    });
  } catch (error) {
    console.error("Failed to fetch live bullion rates:", error);

    // Serve the last successfully fetched rates rather than a hard error,
    // as long as they're not too old to be a reasonable stand-in.
    if (lastGoodRates && Date.now() - lastGoodRates.fetchedAt < MAX_STALE_AGE_MS) {
      const ageMinutes = Math.round(
        (Date.now() - lastGoodRates.fetchedAt) / 60000
      );
      return NextResponse.json({
        city,
        timestamp: new Date().toISOString(),
        source: {
          metals: "gold-api.com (live spot, XAU/XAG/XPT, USD/oz)",
          fx: "open.er-api.com (USD→INR, with frankfurter.dev fallback)",
        },
        usdToInr: lastGoodRates.data.usdToInr,
        gold: lastGoodRates.data.gold,
        silver: lastGoodRates.data.silver,
        platinum: lastGoodRates.data.platinum,
        makingChargesPerGram: MAKING_CHARGE_PER_GRAM,
        currency: "INR",
        isLiveApi: false,
        stale: true,
        staleAgeMinutes: ageMinutes,
        note: `Live rate sources are temporarily unreachable — showing the last confirmed rate from ${ageMinutes} minute${ageMinutes === 1 ? "" : "s"} ago.`,
      });
    }

    return NextResponse.json(
      {
        error:
          "Live rate sources are temporarily unavailable and no recent rate is cached yet. Please try again shortly.",
        isLiveApi: false,
        stale: false,
      },
      { status: 502 }
    );
  }
}
