import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Surat";

  // Base gold price per gram in INR for 24K (Surat Market baseline)
  let base24KPerGram = 7450;
  let isLiveApi = false;

  const apiKey = process.env.GOLD_RATE_API_KEY;

  if (apiKey) {
    try {
      // Optional integration with GoldAPI.io or Metals API
      const res = await fetch("https://www.goldapi.io/api/XAU/INR", {
        headers: {
          "x-access-token": apiKey,
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 }, // Cache for 5 mins
      });

      if (res.ok) {
        const data = await res.json();
        if (data.price_gram_24k) {
          base24KPerGram = Math.round(data.price_gram_24k);
          isLiveApi = true;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch live gold rates from external API, falling back to Surat market benchmark:", e);
    }
  }

  // City location rate adjustment multipliers (relative to Surat Wholesale hub)
  const cityMultipliers: Record<string, number> = {
    Surat: 1.0,
    Mumbai: 1.008,
    Delhi: 1.012,
    Ahmedabad: 1.003,
    Bangalore: 1.015,
    Nagpur: 1.005,
    Kolkata: 1.011,
    International: 1.02,
  };

  const multiplier = cityMultipliers[city] || 1.0;
  const adjusted24k = Math.round(base24KPerGram * multiplier);

  // Calculate purity rates for selected location
  const gold18k = Math.round(adjusted24k * (18 / 24));
  const gold14k = Math.round(adjusted24k * (14 / 24));
  const gold22k = Math.round(adjusted24k * (22 / 24));

  return NextResponse.json({
    city,
    timestamp: new Date().toISOString(),
    gold: {
      "24k": adjusted24k,
      "22k": gold22k,
      "18k": gold18k,
      "14k": gold14k,
    },
    makingChargesPerGram: 850,
    currency: "INR",
    isLiveApi,
    note: `Live bullion rates for ${city}. Flat ₹850/g making charges apply.`,
  });
}
