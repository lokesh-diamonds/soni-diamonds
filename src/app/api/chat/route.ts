import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages, userLocation } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const lastUserMessage: string =
      messages[messages.length - 1]?.content?.toLowerCase() || "";

    // Bullion trades on one real international spot market — there is no
    // genuine per-city Indian retail premium available without a paid
    // bullion-association data feed, so we never fabricate one. "Location"
    // is purely a DISPLAY LABEL: if the user names a city in their message
    // ("gold rate in Mumbai"), or has a detected location saved from the
    // site, we quote them the exact same live spot rate, labelled with that
    // city — never a different number.
    const KNOWN_CITIES = [
      "surat", "mumbai", "delhi", "new delhi", "ahmedabad", "bangalore",
      "bengaluru", "kolkata", "chennai", "hyderabad", "pune", "jaipur",
      "lucknow", "nagpur", "indore", "kochi", "chandigarh", "coimbatore",
      "london", "dubai", "new york", "singapore", "tokyo",
    ];
    const namedCity = KNOWN_CITIES.find((c) => lastUserMessage.includes(c));
    const city: string = namedCity
      ? namedCity.replace(/\b\w/g, (ch) => ch.toUpperCase())
      : userLocation || "Surat";

    let liveRates = {
      city,
      gold24k: 0,
      gold22k: 0,
      gold18k: 0,
      gold14k: 0,
      silver999: 0,
      platinum950: 0,
      makingChargesPerGram: 850,
      ratesAvailable: false,
    };

    try {
      const ratesRes = await fetch(
        `${new URL(request.url).origin}/api/rates?city=${encodeURIComponent(city)}`,
        { cache: "no-store" }
      );
      if (ratesRes.ok) {
        const r = await ratesRes.json();
        liveRates = {
          city,
          gold24k: r.gold["24k"],
          gold22k: r.gold["22k"],
          gold18k: r.gold["18k"],
          gold14k: r.gold["14k"],
          silver999: r.silver["999"],
          platinum950: r.platinum["950"],
          makingChargesPerGram: r.makingChargesPerGram,
          ratesAvailable: true,
        };
      }
    } catch (e) {
      console.warn("Chat route could not fetch live rates from /api/rates:", e);
    }

    const MASTER_KNOWLEDGE_BASE_SYSTEM_PROMPT = `
You are the official Senior AI Diamond Specialist & Consultant for SONI DIAMONDS, an elite diamond jewellery manufacturer, wholesaler & retailer headquartered at LB Char Rasta, Mahidharpura, Surat, Gujarat, India.

YOUR MANDATE & PERSONA:
- Act as a warm, highly refined, professional, and knowledgeable diamantaire consultant.
- Speak with authority, transparency, and elegance.
- STRICT GROUNDING DIRECTIVE: You MUST ONLY answer using facts, figures, product specifications, rates, and policies from the SONI DIAMONDS website & atelier records below. Do NOT fabricate outside details, generic advice, or non-website information. If asked about unrelated topics (e.g. weather, sports, generic non-jewellery items), politely bring the user back to Soni Diamonds' offerings.

${
  liveRates.ratesAvailable
    ? `REAL-TIME LIVE BULLION & METAL RATES (${liveRates.city.toUpperCase()} MARKET):
- 24K Pure Gold: ₹${liveRates.gold24k.toLocaleString("en-IN")} / gram
- 22K Gold: ₹${liveRates.gold22k.toLocaleString("en-IN")} / gram
- 18K Hallmark Gold: ₹${liveRates.gold18k.toLocaleString("en-IN")} / gram
- 14K Gold: ₹${liveRates.gold14k.toLocaleString("en-IN")} / gram
- 999 Fine Silver: ₹${liveRates.silver999.toLocaleString("en-IN")} / gram
- 950 Platinum: ₹${liveRates.platinum950.toLocaleString("en-IN")} / gram
- FIXED FLAT MAKING CHARGES: Exactly ₹850 INR per gram on all 18K & 14K gold diamond jewellery!
- GST: 3% standard tax applied to net metal + making charges + diamond value.
- Location: ${liveRates.city}.
- IMPORTANT: Gold, silver and platinum trade on ONE real international spot market. There is no genuine city-to-city price difference in India for bullion — the rate above IS the correct rate for ${liveRates.city} or any other city the user names. If the user asks for a rate "in <some other city>", give them these exact same numbers labelled with that city's name. NEVER invent a different number for a different city — that would be fabricated data.`
    : `LIVE BULLION RATES ARE TEMPORARILY UNAVAILABLE. If asked for today's gold/silver/platinum rate, for any city, tell the user live rates could not be fetched right now and to check the Live Rate Calculator on the Size Guide page or call +91 93098 52270. Do NOT invent or guess a rate for any city.`
}

JEWELLERY COST CALCULATION FORMULA AT SONI DIAMONDS:
When asked how price or rate is calculated for a piece:
Total Price = (Gold Weight in grams × Metal Rate for Karat) + (Metal Weight in grams × ₹850 Making Charge) + (Diamond Stone Value based on GIA/IGI carat & clarity) + 3% GST.
${
  liveRates.ratesAvailable
    ? `Example for 5g 18K Gold ring: (5g × ₹${liveRates.gold18k.toLocaleString("en-IN")}) + (5g × ₹850) + Diamond Price + 3% GST.`
    : ""
}

ATELIER & CONTACT DETAILS:
- Founder & Managing Director: Lokesh Soni
- Atelier & Wholesale Address: LB Char Rasta, Mahidharpura, Surat, Gujarat, India
- Official GSTIN: 27POMPS2282M1ZS
- Direct Phone / WhatsApp: +91 93098 52270
- Email: lokesh@sonidiamonds.in
- Website: https://sonidiamonds.in
- Instagram: https://instagram.com/sonidharpura / https://instagram.com/sonidiamonds
- Atelier Hours: Monday – Saturday, 11:00 AM – 7:30 PM (Meetings by prior appointment)

OUR 7 SIGNATURE COLLECTIONS:
1. The Solitaire: 1.00ct to 5.00ct certified D-F colour, VVS-VS clarity solitaires (Round Brilliant, Oval, Emerald, Cushion, Pear, Radiant, Princess).
2. The Halo: Pavé diamond halos expanding visual stone presence by half a carat.
3. The Three Stone: Past, Present, Future trilogy diamond engagement rings.
4. The Rivière: Classic tennis necklaces (e.g. 10.00ctw), tennis bracelets, and full eternity diamond bangles.
5. Everyday Brilliance: Bezel & prong solitaire studs, hoops, minimalist diamond pendants in 18k gold & platinum.
6. Bridal Sets: Diamond mangalsutras, heavy bridal chokers, and traditional/modern wedding sets (e.g. Meridian 8.60ctw, Nakshatra 1.85ctw).
7. Gentleman: Men's diamond bands (Sovereign 0.50ct flush set, Regent 0.90ctw pavé), signet rings, and curb-link bracelets.

CERTIFICATIONS & QUALITY GUARANTEES:
- Independent Certification: All solitaires are certified by GIA (Gemological Institute of America), IGI (International Gemological Institute), or SGL. Original physical certificates provided with laser-inscribed girdle numbers.
- Diamond Types: We craft both Certified Natural Earth-Mined Diamonds (Kimberley Process compliant) and Certified Lab-Grown Diamonds.
- In-person Atelier Experience: Side-by-side stone inspection under 100% daylight-balanced lamps in our Surat atelier with Lokesh Soni.
- Bespoke Commissions: CAD 3D modeling and photorealistic render approval before forging any metal.
- Lifetime Diamond Upgrade Credit: 100% original diamond value credited toward a higher-value diamond upgrade at any time.

SHIPPING, RETURNS & CLIENT CARE:
- Shipping: Free, fully insured door delivery across India (1–3 business days post-dispatch) and worldwide (UAE, UK, USA, Canada, Singapore 3–8 business days) in discreet packaging with signature required on delivery.
- Timelines: Ready pieces ship within 2 business days. Made-to-order pieces take 4–6 weeks.
- Returns: 15-day full money-back return policy on ready-to-ship unworn items with original certificate. Bespoke, custom engraved, and resized pieces are final sale.
- Resizing & Care: 1st ring resizing within 12 months is complimentary. Annual professional cleaning & prong safety checks are free for life.

CONSULTANT INSTRUCTIONS FOR HANDLING CLIENT QUERIES:
- When asked for rates or pricing: Provide the exact live metal breakdown (24K, 22K, 18K, 14K, Silver, Platinum), highlight the flat ₹850/gram making charge, explain our transparent cost formula, and mention the Live Rate Calculator on the site.
- When asked for contact or visiting info: State Lokesh Soni's name, phone (+91 93098 52270), email (lokesh@sonidiamonds.in), and exact address: LB Char Rasta, Mahidharpura, Surat, Gujarat.
- Format responses cleanly using short paragraphs, bullet points, and elegant tone.
- Do NOT answer anything outside Soni Diamonds website knowledge.
`;

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      const contents = [
        {
          role: "user",
          parts: [{ text: MASTER_KNOWLEDGE_BASE_SYSTEM_PROMPT }],
        },
        ...messages.map((m: any) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
      ];

      // Try active AI models in order
      const modelsToTry = [
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-2.5-flash",
        "gemini-1.5-pro",
      ];

      for (const modelName of modelsToTry) {
        try {
          const aiEndpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

          const res = await fetch(aiEndpointUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
          });

          if (res.ok) {
            const data = await res.json();
            const responseText =
              data.candidates?.[0]?.content?.parts?.[0]?.text ||
              "Thank you for contacting Soni Diamonds. How else can I assist you with your diamond selection today?";

            return NextResponse.json({ reply: responseText });
          }
        } catch (e) {
          console.warn(`Model ${modelName} call failed, trying next...`, e);
        }
      }
    }

    // Comprehensive Grounded Fallback Logic if API key is pending configuration
    let fallbackReply =
      "Namaste! I am Soni Diamonds' Senior Diamond Consultant. We manufacture fine certified & non-certified diamond jewellery at LB Char Rasta, Mahidharpura, Surat. Making charges are flat ₹850/gram across all pieces. You can reach Lokesh Soni at +91 93098 52270 or lokesh@sonidiamonds.in.";

    if (
      lastUserMessage.includes("rate") ||
      lastUserMessage.includes("gold") ||
      lastUserMessage.includes("silver") ||
      lastUserMessage.includes("platinum") ||
      lastUserMessage.includes("price") ||
      lastUserMessage.includes("cost") ||
      lastUserMessage.includes("18k") ||
      lastUserMessage.includes("24k") ||
      lastUserMessage.includes("22k") ||
      lastUserMessage.includes("14k") ||
      lastUserMessage.includes("calculate")
    ) {
      fallbackReply = liveRates.ratesAvailable
        ? `Today's live bullion rates for ${liveRates.city} market:
- 24K Pure Gold: ₹${liveRates.gold24k.toLocaleString("en-IN")} / gram
- 22K Gold: ₹${liveRates.gold22k.toLocaleString("en-IN")} / gram
- 18K Hallmark Gold: ₹${liveRates.gold18k.toLocaleString("en-IN")} / gram
- 14K Gold: ₹${liveRates.gold14k.toLocaleString("en-IN")} / gram
- 999 Fine Silver: ₹${liveRates.silver999.toLocaleString("en-IN")} / gram
- 950 Platinum: ₹${liveRates.platinum950.toLocaleString("en-IN")} / gram

✨ Making Charges: Fixed flat ₹850 / gram on all gold diamond jewellery!
Formula: Total = (Metal Weight × Metal Rate) + (Metal Weight × ₹850) + Diamond Price + 3% GST.

You can also use our interactive Live Rate Calculator & Unit Converter on our website!`
        : `Live bullion rates could not be fetched right now — please try our Live Rate Calculator on the Size Guide page, or call +91 93098 52270 and Lokesh Soni will quote you today's rate directly.`;
    } else if (
      lastUserMessage.includes("making charge") ||
      lastUserMessage.includes("making") ||
      lastUserMessage.includes("labour")
    ) {
      fallbackReply =
        "At Soni Diamonds, we maintain complete pricing transparency: making charges are fixed at a flat ₹850 per gram across all catalog and custom 18K & 14K gold diamond jewellery!";
    } else if (
      lastUserMessage.includes("contact") ||
      lastUserMessage.includes("phone") ||
      lastUserMessage.includes("email") ||
      lastUserMessage.includes("address") ||
      lastUserMessage.includes("location") ||
      lastUserMessage.includes("where") ||
      lastUserMessage.includes("surat")
    ) {
      fallbackReply =
        "Our manufacturing atelier & office is located at LB Char Rasta, Mahidharpura, Surat, Gujarat, India. You can contact Lokesh Soni directly via Phone/WhatsApp at +91 93098 52270 or Email at lokesh@sonidiamonds.in. Visits are by prior appointment.";
    } else if (
      lastUserMessage.includes("lab") ||
      lastUserMessage.includes("natural") ||
      lastUserMessage.includes("gia") ||
      lastUserMessage.includes("igi") ||
      lastUserMessage.includes("sgl") ||
      lastUserMessage.includes("certif")
    ) {
      fallbackReply =
        "Every solitaire diamond at Soni Diamonds is independently certified by GIA, IGI, or SGL with physical grading dossiers and laser girdle inscriptions. We craft both Earth-mined Natural Certified Diamonds and Certified Lab-Grown Diamonds, offering side-by-side daylight inspection with Lokesh Soni in Surat.";
    } else if (
      lastUserMessage.includes("collection") ||
      lastUserMessage.includes("ring") ||
      lastUserMessage.includes("necklace") ||
      lastUserMessage.includes("stud") ||
      lastUserMessage.includes("bangle") ||
      lastUserMessage.includes("pendant") ||
      lastUserMessage.includes("men")
    ) {
      fallbackReply =
        "We offer 7 signature diamond collections: The Solitaire, The Halo, The Three Stone, The Rivière (tennis necklaces & bangles), Everyday Brilliance (studs & pendants), Bridal Sets (mangalsutras & chokers), and Gentleman (men's bands & cufflinks). All built with flat ₹850/g making charges.";
    } else if (
      lastUserMessage.includes("gst") ||
      lastUserMessage.includes("gstin") ||
      lastUserMessage.includes("pan") ||
      lastUserMessage.includes("tax") ||
      lastUserMessage.includes("regis")
    ) {
      fallbackReply =
        "Soni Diamonds Official Business Credentials:\n• GSTIN: 27POMPS2282M1ZS\n• Address: LB Char Rasta, Mahidharpura, Surat, Gujarat, India\n• Managing Director: Lokesh Soni (lokesh@sonidiamonds.in / +91 93098 52270)";
    } else if (
      lastUserMessage.includes("shipping") ||
      lastUserMessage.includes("delivery") ||
      lastUserMessage.includes("return") ||
      lastUserMessage.includes("upgrade")
    ) {
      fallbackReply =
        "We offer complimentary fully insured shipping across India (1-3 days) and internationally (3-8 days). We provide a 15-day return policy on unworn ready items and a 100% Lifetime Diamond Upgrade Credit toward higher-value diamonds.";
    }

    return NextResponse.json({ reply: fallbackReply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}

