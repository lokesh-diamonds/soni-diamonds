export type ProductVariant = {
  id: string;
  label: string;
  priceDelta: number;
};

export type DiamondSpec = {
  shape: string;
  carat: string;
  colour: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  certification: string;
};

export type PriceLine = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: "Rings" | "Necklaces" | "Earrings" | "Bracelets" | "Bangles" | "Pendants";
  metal: "18k Yellow Gold" | "18k White Gold" | "18k Rose Gold" | "Platinum 950";
  setting:
    | "Solitaire"
    | "Halo"
    | "Three Stone"
    | "Pavé"
    | "Tennis"
    | "Cluster"
    | "Bezel"
    | "Nakshatra";
  gender: "Women" | "Men" | "Unisex";
  occasion: string[];
  price: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  story: string;
  diamond: DiamondSpec;
  specs: { label: string; value: string }[];
  priceBreakdown: PriceLine[];
  care: string[];
  delivery: string;
  variants: ProductVariant[];
  isNew?: boolean;
  isFeatured?: boolean;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

// Indian retail pricing is quoted in INR and is inclusive of 3% GST on the
// value of gold + diamonds. Figures are indicative market prices for
// Surat / Mumbai wholesale-to-retail (Katargam, Mahidharpura belt).

export const products: Product[] = [
  // ── 1 ────────────────────────────────────────────────────────────────
  {
    slug: "aurelia-solitaire-engagement-ring",
    name: "Aurelia 2.01ct Solitaire Engagement Ring",
    collection: "The Solitaire",
    category: "Rings",
    metal: "Platinum 950",
    setting: "Solitaire",
    gender: "Women",
    occasion: ["Engagement", "Anniversary", "Milestone"],
    price: 2185000,
    image: img("photo-1605100804763-247f67b3557e"),
    gallery: [
      img("photo-1605100804763-247f67b3557e"),
      img("photo-1515562141207-7a88fb7ce338"),
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1596944924616-7b38e7cfac36"),
    ],
    shortDescription:
      "A 2.01ct round brilliant, D colour, IF clarity, GIA triple-excellent, held aloft by six hand-forged platinum prongs.",
    story:
      "Aurelia is our definitive solitaire. The centre diamond is a 2.01ct round brilliant of D colour and IF (Internally Flawless) clarity with a GIA triple-Excellent grade for cut, polish and symmetry — the top 3% of round diamonds by light return. Our setters spend around eleven hours aligning the six platinum prongs so the stone appears to float. The band is milled from a single ingot of 950 platinum and finished with a hand-polished knife edge that keeps the eye on the diamond alone. Supplied with its original GIA dossier and a laser-inscribed girdle you can read under 10x loupe.",
    diamond: {
      shape: "Round Brilliant",
      carat: "2.01 ct",
      colour: "D (Colourless)",
      clarity: "IF (Internally Flawless)",
      cut: "Excellent / Ideal",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      certification: "GIA — full grading report, laser-inscribed",
    },
    specs: [
      { label: "Centre stone", value: "2.01ct round brilliant, D / IF, GIA 3EX" },
      { label: "Measurements", value: "8.13 – 8.17 × 4.98 mm" },
      { label: "Metal", value: "950 platinum, approx. 4.2 g" },
      { label: "Setting", value: "Six-prong basket, hand-forged" },
      { label: "Band width", value: "1.9 mm knife-edge" },
      { label: "Certification", value: "GIA report no. supplied with piece" },
      { label: "Origin", value: "Natural diamond, Kimberley Process compliant" },
    ],
    priceBreakdown: [
      { label: "Centre diamond (2.01ct D/IF)", value: "₹19,60,000" },
      { label: "Platinum mount & labour", value: "₹1,61,650" },
      { label: "GST (3%)", value: "₹63,350" },
      { label: "Total", value: "₹21,85,000" },
    ],
    care: [
      "Store separately in the supplied pouch — platinum is soft and scratches other metals.",
      "Clean at home with warm water, mild dish soap and a soft brush behind the stone.",
      "Bring in every 12 months for a complimentary prong check and professional clean.",
    ],
    delivery: "Made to order · dispatched in 4–5 weeks · insured door delivery across India",
    variants: [
      { id: "1ct", label: "1.01ct · D / VVS1", priceDelta: -1180000 },
      { id: "1-5ct", label: "1.51ct · D / VVS2", priceDelta: -560000 },
      { id: "2ct", label: "2.01ct · D / IF", priceDelta: 0 },
      { id: "3ct", label: "3.02ct · E / VS1", priceDelta: 1720000 },
    ],
    isFeatured: true,
    isNew: true,
  },

  // ── 2 ────────────────────────────────────────────────────────────────
  {
    slug: "north-star-halo-engagement-ring",
    name: "North Star 1.00ct Cushion Halo Ring",
    collection: "The Halo",
    category: "Rings",
    metal: "18k White Gold",
    setting: "Halo",
    gender: "Women",
    occasion: ["Engagement", "Proposal", "Anniversary"],
    price: 585000,
    image: img("photo-1603561591411-07134e71a2a9"),
    gallery: [
      img("photo-1603561591411-07134e71a2a9"),
      img("photo-1598560917505-59a3ad559071"),
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1605100804763-247f67b3557e"),
    ],
    shortDescription:
      "A 1.00ct cushion-cut centre (E / VS1, GIA) ringed by 32 pavé diamonds, with pavé running halfway down the shoulders.",
    story:
      "North Star wraps a 1.00ct cushion-cut centre in a tight halo of 32 micro-pavé diamonds, then carries the pavé halfway down the shoulders. The halo lifts the apparent size of the centre by roughly half a carat and throws a continuous ring of scintillation. Every pavé diamond is bright-cut set by hand under a microscope. Rhodium-finished 18k white gold; re-plating is complimentary for the first two years.",
    diamond: {
      shape: "Cushion Brilliant centre + Round pavé",
      carat: "1.00 ct centre + 0.46 ct halo & shoulders (1.46 ctw)",
      colour: "E centre / F–G pavé",
      clarity: "VS1 centre / VS–SI pavé",
      cut: "Excellent",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "GIA (centre) + in-house pavé grading",
    },
    specs: [
      { label: "Centre stone", value: "1.00ct cushion brilliant, E / VS1, GIA" },
      { label: "Halo & shoulders", value: "52 pavé diamonds, 0.46ct total" },
      { label: "Metal", value: "18k white gold, rhodium finish, approx. 3.8 g" },
      { label: "Setting", value: "Four-prong centre, bright-cut pavé halo" },
      { label: "Certification", value: "GIA report for centre diamond" },
    ],
    priceBreakdown: [
      { label: "Centre diamond (1.00ct E/VS1)", value: "₹4,45,000" },
      { label: "Pavé diamonds (0.46ct)", value: "₹78,000" },
      { label: "18k white gold & labour", value: "₹44,950" },
      { label: "GST (3%)", value: "₹17,050" },
      { label: "Total", value: "₹5,85,000" },
    ],
    care: [
      "Avoid knocks to the pavé edge — bright-cut beads are delicate.",
      "Remove before gym, gardening or applying hand cream.",
      "Complimentary rhodium re-plate within 24 months keeps the white bright.",
    ],
    delivery: "Made to order · dispatched in 3–4 weeks · insured courier",
    variants: [
      { id: "070", label: "0.70ct centre · E / VS", priceDelta: -160000 },
      { id: "100", label: "1.00ct centre · E / VS1", priceDelta: 0 },
      { id: "150", label: "1.51ct centre · E / VS2", priceDelta: 320000 },
      { id: "200", label: "2.01ct centre · F / VS1", priceDelta: 890000 },
    ],
    isFeatured: true,
    isNew: true,
  },

  // ── 3 ────────────────────────────────────────────────────────────────
  {
    slug: "trilogy-three-stone-ring",
    name: "Trilogy Three-Stone Ring · 2.20ctw",
    collection: "The Three Stone",
    category: "Rings",
    metal: "18k Yellow Gold",
    setting: "Three Stone",
    gender: "Women",
    occasion: ["Anniversary", "Engagement", "Vow renewal"],
    price: 985000,
    image: img("photo-1596944924616-7b38e7cfac36"),
    gallery: [
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1605100804763-247f67b3557e"),
      img("photo-1598560917505-59a3ad559071"),
      img("photo-1515562141207-7a88fb7ce338"),
    ],
    shortDescription:
      "Past, present, future — a 1.20ct centre flanked by two matched 0.50ct round brilliants, all D–E colour, on a tapered gold band.",
    story:
      "The three-stone ring, understood by jewellers as past, present and future. Trilogy sets a 1.20ct round brilliant between two perfectly matched 0.50ct stones, all D–E colour, on a tapered 18k yellow-gold band. The side stones sit slightly lower so the centre reads first and the eye then travels outward. Each of the three diamonds carries its own GIA report.",
    diamond: {
      shape: "Round Brilliant (three-stone)",
      carat: "1.20 ct centre + 2 × 0.50 ct = 2.20 ctw",
      colour: "D – E",
      clarity: "VVS2 – VS1",
      cut: "Excellent / Ideal",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      certification: "GIA — three matched reports",
    },
    specs: [
      { label: "Centre stone", value: "1.20ct round brilliant, D / VVS2" },
      { label: "Side stones", value: "2 × 0.50ct round brilliant, E / VS1" },
      { label: "Metal", value: "18k yellow gold, approx. 5.1 g" },
      { label: "Setting", value: "Four-prong centre, three-prong sides" },
      { label: "Certification", value: "Three matched GIA reports" },
    ],
    priceBreakdown: [
      { label: "Centre diamond (1.20ct D/VVS2)", value: "₹6,10,000" },
      { label: "Side diamonds (2 × 0.50ct E/VS1)", value: "₹3,00,000" },
      { label: "18k gold & labour", value: "₹46,300" },
      { label: "GST (3%)", value: "₹28,700" },
      { label: "Total", value: "₹9,85,000" },
    ],
    care: [
      "Yellow gold is soft — take the ring off before heavy manual work.",
      "Rinse in warm soapy water weekly and dry with a lint-free cloth.",
      "Annual prong tightening keeps all three diamonds secure.",
    ],
    delivery: "Made to order · dispatched in 4 weeks · insured door delivery",
    variants: [
      { id: "small", label: "1.50ctw total", priceDelta: -360000 },
      { id: "mid", label: "2.20ctw total", priceDelta: 0 },
      { id: "large", label: "3.00ctw total", priceDelta: 640000 },
    ],
  },

  // ── 4 ────────────────────────────────────────────────────────────────
  {
    slug: "atlas-emerald-cut-ring",
    name: "Atlas Emerald-Cut Diamond Ring · 2.50ct",
    collection: "The Solitaire",
    category: "Rings",
    metal: "Platinum 950",
    setting: "Three Stone",
    gender: "Women",
    occasion: ["Engagement", "Milestone", "Investment piece"],
    price: 2960000,
    image: img("photo-1611591437281-460bfbe1220a"),
    gallery: [
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1605100804763-247f67b3557e"),
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1515562141207-7a88fb7ce338"),
    ],
    shortDescription:
      "A 2.50ct emerald-cut centre (F / VS1, GIA) with tapered baguette sides in platinum — architectural, cool, deliberate.",
    story:
      "Atlas is for those who prefer the long, stepped lines of an emerald cut to the fire of a brilliant. The 2.50ct centre is F colour, VS1, with an open table that rewards a high clarity grade. Two tapered baguettes frame it in platinum. Emerald cuts hide nothing, so we buy only eye-clean stones with even step facets and a 1.45:1 ratio.",
    diamond: {
      shape: "Emerald Cut centre + Tapered Baguette sides",
      carat: "2.50 ct centre + 0.60 ct baguettes (3.10 ctw)",
      colour: "F",
      clarity: "VS1",
      cut: "Excellent proportions",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      certification: "GIA — full report, centre diamond",
    },
    specs: [
      { label: "Centre stone", value: "2.50ct emerald cut, F / VS1, ratio 1.45:1" },
      { label: "Side stones", value: "2 tapered baguettes, 0.60ct total" },
      { label: "Metal", value: "950 platinum, approx. 5.4 g" },
      { label: "Setting", value: "Four double-prong centre, channel-set baguettes" },
      { label: "Certification", value: "GIA full grading report" },
    ],
    priceBreakdown: [
      { label: "Centre diamond (2.50ct F/VS1 emerald)", value: "₹26,40,000" },
      { label: "Baguette side stones (0.60ct)", value: "₹1,80,000" },
      { label: "Platinum mount & labour", value: "₹53,600" },
      { label: "GST (3%)", value: "₹86,400" },
      { label: "Total", value: "₹29,60,000" },
    ],
    care: [
      "Emerald-cut corners are the weak point — avoid sharp knocks.",
      "Clean gently behind the open table where dust settles.",
      "Yearly inspection of the four double prongs is included for life.",
    ],
    delivery: "Made to order · dispatched in 5 weeks · fully insured",
    variants: [
      { id: "150", label: "1.51ct centre · F / VS1", priceDelta: -1080000 },
      { id: "250", label: "2.50ct centre · F / VS1", priceDelta: 0 },
      { id: "400", label: "4.01ct centre · F / VS2", priceDelta: 2640000 },
    ],
    isFeatured: true,
  },

  // ── 5 ────────────────────────────────────────────────────────────────
  {
    slug: "juno-oval-solitaire-ring",
    name: "Juno Oval Solitaire Ring · 1.50ct",
    collection: "The Solitaire",
    category: "Rings",
    metal: "18k Rose Gold",
    setting: "Solitaire",
    gender: "Women",
    occasion: ["Engagement", "Proposal"],
    price: 895000,
    image: img("photo-1515562141207-7a88fb7ce338"),
    gallery: [
      img("photo-1515562141207-7a88fb7ce338"),
      img("photo-1605100804763-247f67b3557e"),
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1611591437281-460bfbe1220a"),
    ],
    shortDescription:
      "A 1.50ct oval brilliant (F / VS2, IGI) in a slim four-prong rose-gold setting — the oval reads larger than its carat weight.",
    story:
      "The oval brilliant carries the fire of a round but with 10–15% more spread face-up, so a 1.50ct oval wears like a 1.75ct round. Juno holds it in a slender four-claw rose-gold setting with a hidden diamond on the bridge — a gift to the wearer only. We select ovals with a tight ratio (1.38:1) and no visible bow-tie.",
    diamond: {
      shape: "Oval Brilliant",
      carat: "1.50 ct",
      colour: "F (Near-colourless)",
      clarity: "VS2",
      cut: "Excellent (spread & symmetry)",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "Faint",
      certification: "IGI — full grading report",
    },
    specs: [
      { label: "Centre stone", value: "1.50ct oval brilliant, F / VS2, ratio 1.38:1" },
      { label: "Measurements", value: "9.1 × 6.6 × 4.0 mm" },
      { label: "Metal", value: "18k rose gold, approx. 3.4 g" },
      { label: "Setting", value: "Four-claw with concealed bridge diamond" },
      { label: "Certification", value: "IGI report supplied" },
    ],
    priceBreakdown: [
      { label: "Centre diamond (1.50ct F/VS2 oval)", value: "₹8,15,000" },
      { label: "18k rose gold & labour", value: "₹53,900" },
      { label: "GST (3%)", value: "₹26,100" },
      { label: "Total", value: "₹8,95,000" },
    ],
    care: [
      "Elongated stones catch more — remove before sport and heavy lifting.",
      "Warm soapy soak weekly; check the east–west prongs monthly.",
      "Rose gold keeps its colour and needs no re-plating.",
    ],
    delivery: "Made to order · dispatched in 3–4 weeks · insured courier",
    variants: [
      { id: "100", label: "1.00ct · F / VS1", priceDelta: -290000 },
      { id: "150", label: "1.50ct · F / VS2", priceDelta: 0 },
      { id: "200", label: "2.01ct · F / VS2", priceDelta: 520000 },
    ],
    isNew: true,
  },

  // ── 6 ────────────────────────────────────────────────────────────────
  {
    slug: "constance-eternity-band",
    name: "Constance Full Eternity Band · 2.00ctw",
    collection: "The Rivière",
    category: "Rings",
    metal: "Platinum 950",
    setting: "Tennis",
    gender: "Women",
    occasion: ["Wedding band", "Anniversary", "Push present"],
    price: 545000,
    image: img("photo-1598560917505-59a3ad559071"),
    gallery: [
      img("photo-1598560917505-59a3ad559071"),
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1605100804763-247f67b3557e"),
      img("photo-1611591437281-460bfbe1220a"),
    ],
    shortDescription:
      "A full circle of 22 channel-set round brilliants — 2.00 total carats, F / VS — in machined platinum.",
    story:
      "Constance is a full eternity band: 22 matched round brilliants totalling 2.00 carats, F/VS, held in a machined platinum channel that protects every girdle. Worn alone as a wedding band or stacked above a solitaire. Because it is a full circle, resizing is limited — order half a size down if you are between sizes.",
    diamond: {
      shape: "Round Brilliant (channel-set)",
      carat: "2.00 ct total, 22 stones",
      colour: "F",
      clarity: "VS1 – VS2",
      cut: "Excellent",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      certification: "IGI eternity-band report",
    },
    specs: [
      { label: "Diamonds", value: "22 round brilliant, 2.00ct total, F / VS" },
      { label: "Metal", value: "950 platinum, approx. 5.6 g" },
      { label: "Setting", value: "Channel, full eternity" },
      { label: "Width", value: "2.8 mm" },
      { label: "Certification", value: "IGI report supplied" },
    ],
    priceBreakdown: [
      { label: "Diamonds (2.00ctw F/VS)", value: "₹4,80,000" },
      { label: "Platinum & channel-setting labour", value: "₹48,700" },
      { label: "GST (3%)", value: "₹15,900" },
      { label: "Total", value: "₹5,45,000" },
    ],
    care: [
      "Full eternity bands can only be resized ±half a size — choose carefully.",
      "Channel setting protects the stones; simply rinse and dry.",
      "Bring in yearly so we can check the channel walls have not lifted.",
    ],
    delivery: "Made to order in your exact size · dispatched in 3 weeks",
    variants: [
      { id: "150", label: "1.50ctw · F / VS", priceDelta: -145000 },
      { id: "200", label: "2.00ctw · F / VS", priceDelta: 0 },
      { id: "300", label: "3.00ctw · F / VS", priceDelta: 255000 },
    ],
  },

  // ── 7 ────────────────────────────────────────────────────────────────
  {
    slug: "verona-diamond-cluster-ring",
    name: "Verona Seven-Stone Cluster Ring · 1.10ctw",
    collection: "The Halo",
    category: "Rings",
    metal: "18k Rose Gold",
    setting: "Cluster",
    gender: "Women",
    occasion: ["Everyday", "Gift", "Birthday"],
    price: 268000,
    image: img("photo-1601121141461-9d6647bca1ed"),
    gallery: [
      img("photo-1601121141461-9d6647bca1ed"),
      img("photo-1611085583191-a3b181a88401"),
      img("photo-1603561591411-07134e71a2a9"),
      img("photo-1598560917505-59a3ad559071"),
    ],
    shortDescription:
      "Seven round brilliants clustered into a single flower head — 1.10ctw, G–H / VS–SI — in warm 18k rose gold.",
    story:
      "Verona clusters seven round brilliants — one centre, six petals — into a domed flower that reads as a single large stone from arm's length. Set in warm 18k rose gold with a scalloped under-gallery. A softer, more affordable alternative to a one-carat solitaire, and our most popular everyday diamond ring.",
    diamond: {
      shape: "Round Brilliant (7-stone cluster)",
      carat: "1.10 ct total",
      colour: "G – H",
      clarity: "VS2 – SI1 (eye-clean)",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None – Faint",
      certification: "Soni Diamonds in-house certificate",
    },
    specs: [
      { label: "Diamonds", value: "7 round brilliant, 1.10ct total, G–H / VS–SI" },
      { label: "Metal", value: "18k rose gold, approx. 4.0 g" },
      { label: "Setting", value: "Claw-set cluster, scalloped gallery" },
      { label: "Head size", value: "9.5 mm across" },
    ],
    priceBreakdown: [
      { label: "Diamonds (1.10ctw G–H / VS–SI)", value: "₹1,98,000" },
      { label: "18k rose gold & labour", value: "₹62,200" },
      { label: "GST (3%)", value: "₹7,800" },
      { label: "Total", value: "₹2,68,000" },
    ],
    care: [
      "Cluster claws are small — have them checked twice a year.",
      "Soak in warm soapy water and brush gently behind the head.",
      "Safe for daily wear; still remove for gym and swimming.",
    ],
    delivery: "Ready to ship in your size within 5 working days",
    variants: [
      { id: "075", label: "0.75ctw cluster", priceDelta: -70000 },
      { id: "110", label: "1.10ctw cluster", priceDelta: 0 },
      { id: "160", label: "1.60ctw cluster", priceDelta: 128000 },
    ],
  },

  // ── 8 ────────────────────────────────────────────────────────────────
  {
    slug: "sovereign-mens-diamond-ring",
    name: "Sovereign Men's Diamond Ring · 0.50ct",
    collection: "Gentleman",
    category: "Rings",
    metal: "18k White Gold",
    setting: "Bezel",
    gender: "Men",
    occasion: ["Wedding band", "Anniversary", "Gift for him"],
    price: 312000,
    image: img("photo-1598560917505-59a3ad559071"),
    gallery: [
      img("photo-1598560917505-59a3ad559071"),
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1605100804763-247f67b3557e"),
      img("photo-1596944924616-7b38e7cfac36"),
    ],
    shortDescription:
      "A single 0.50ct round brilliant (G / VS2) flush-set into a substantial 7mm brushed white-gold band.",
    story:
      "Sovereign is a men's band with weight and presence. A 0.50ct round brilliant sits flush within a 7mm brushed 18k white-gold band, protected below the surface so it survives daily wear. The brushed finish hides micro-scratches; the polished bevelled edges catch light. Comfort-fit interior.",
    diamond: {
      shape: "Round Brilliant (flush / gypsy set)",
      carat: "0.50 ct",
      colour: "G (Near-colourless)",
      clarity: "VS2",
      cut: "Very Good",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI report supplied",
    },
    specs: [
      { label: "Diamond", value: "0.50ct round brilliant, G / VS2, flush-set" },
      { label: "Metal", value: "18k white gold, approx. 11 g" },
      { label: "Band width", value: "7.0 mm, comfort-fit" },
      { label: "Finish", value: "Brushed centre, polished bevels" },
    ],
    priceBreakdown: [
      { label: "Diamond (0.50ct G/VS2)", value: "₹1,55,000" },
      { label: "18k white gold (11g) & labour", value: "₹1,47,900" },
      { label: "GST (3%)", value: "₹9,100" },
      { label: "Total", value: "₹3,12,000" },
    ],
    care: [
      "Flush setting is the toughest there is — safe for most trades.",
      "Re-brush and re-rhodium every 2–3 years to refresh the finish (complimentary first service).",
      "Remove before heavy weightlifting to avoid ring-band pressure.",
    ],
    delivery: "Made to order · dispatched in 3 weeks · insured",
    variants: [
      { id: "030", label: "0.30ct · G / VS", priceDelta: -70000 },
      { id: "050", label: "0.50ct · G / VS2", priceDelta: 0 },
      { id: "075", label: "0.75ct · F / VS2", priceDelta: 118000 },
    ],
    isNew: true,
  },

  // ── 9 ────────────────────────────────────────────────────────────────
  {
    slug: "regent-mens-pave-band",
    name: "Regent Men's Pavé Band · 0.90ctw",
    collection: "Gentleman",
    category: "Rings",
    metal: "Platinum 950",
    setting: "Pavé",
    gender: "Men",
    occasion: ["Wedding band", "Milestone"],
    price: 468000,
    image: img("photo-1611591437281-460bfbe1220a"),
    gallery: [
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1598560917505-59a3ad559071"),
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1605100804763-247f67b3557e"),
    ],
    shortDescription:
      "A 6mm platinum band with a single channel of 15 pavé diamonds — 0.90ctw, F–G / VS — running the full circumference.",
    story:
      "Regent takes the classic men's platinum band and runs a single bright-cut channel of 15 round brilliants around the whole ring. At arm's length it reads as a fine line of light; up close, the platinum weight tells you it is serious. 6mm wide, comfort-fit, milled from solid 950 platinum.",
    diamond: {
      shape: "Round Brilliant (channel pavé)",
      carat: "0.90 ct total, 15 stones",
      colour: "F – G",
      clarity: "VS1 – VS2",
      cut: "Very Good",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI band dossier",
    },
    specs: [
      { label: "Diamonds", value: "15 round brilliant, 0.90ct total, F–G / VS" },
      { label: "Metal", value: "950 platinum, approx. 9 g" },
      { label: "Band width", value: "6.0 mm, comfort-fit" },
      { label: "Setting", value: "Channel-set, full circumference" },
    ],
    priceBreakdown: [
      { label: "Diamonds (0.90ctw F–G / VS)", value: "₹2,16,000" },
      { label: "Platinum (9g) & setting labour", value: "₹2,38,400" },
      { label: "GST (3%)", value: "₹13,600" },
      { label: "Total", value: "₹4,68,000" },
    ],
    care: [
      "Channel protects the diamonds — rinse, dry, wear daily.",
      "Platinum develops a soft patina; we re-polish to high shine on request.",
      "Yearly channel-wall check included for life.",
    ],
    delivery: "Made to order in your size · dispatched in 3–4 weeks",
    variants: [
      { id: "060", label: "0.60ctw", priceDelta: -95000 },
      { id: "090", label: "0.90ctw", priceDelta: 0 },
      { id: "125", label: "1.25ctw", priceDelta: 132000 },
    ],
  },

  // ── 10 ───────────────────────────────────────────────────────────────
  {
    slug: "riviere-tennis-necklace",
    name: "Rivière Tennis Necklace · 10.00ctw",
    collection: "The Rivière",
    category: "Necklaces",
    metal: "18k White Gold",
    setting: "Tennis",
    gender: "Women",
    occasion: ["Bridal", "Reception", "Black tie", "Anniversary"],
    price: 2480000,
    image: img("photo-1599643478518-a784e5dc4c8f"),
    gallery: [
      img("photo-1599643478518-a784e5dc4c8f"),
      img("photo-1611652022419-a9419f74343d"),
      img("photo-1515562141207-7a88fb7ce338"),
      img("photo-1602751584552-8ba73aad10e1"),
    ],
    shortDescription:
      "112 graduated round brilliants — 10.00 total carats, F–G / VS — on an articulated white-gold line with a concealed clasp.",
    story:
      "A continuous line of light that traces the collarbone. Every one of the 112 diamonds is hand-matched for colour (F–G) and clarity (VS), then set into a flexible four-prong cradle so the necklace moves like water. Stones graduate from 0.05ct at the clasp to 0.18ct at the centre. The box clasp is concealed within the line, with a figure-eight safety. Comes in a fitted case with its IGI necklace dossier.",
    diamond: {
      shape: "Round Brilliant (graduated line)",
      carat: "10.00 ct total, 112 stones",
      colour: "F – G",
      clarity: "VS1 – VS2",
      cut: "Very Good – Excellent",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None – Faint",
      certification: "IGI necklace dossier + master selection report",
    },
    specs: [
      { label: "Diamonds", value: "112 round brilliant, 10.00ct total, F–G / VS" },
      { label: "Metal", value: "18k white gold, approx. 20 g" },
      { label: "Length", value: "40 cm, with 42 cm extender" },
      { label: "Clasp", value: "Concealed box clasp, figure-eight safety" },
      { label: "Setting", value: "Four-prong articulated links" },
    ],
    priceBreakdown: [
      { label: "Diamonds (10.00ctw F–G / VS)", value: "₹22,00,000" },
      { label: "18k white gold & articulated setting labour", value: "₹1,87,800" },
      { label: "GST (3%)", value: "₹72,200" },
      { label: "Total", value: "₹24,80,000" },
    ],
    care: [
      "Put the necklace on last and take it off first to protect it from perfume and hairspray.",
      "Lay flat in the case — do not coil, which stresses the links.",
      "Complimentary annual clasp and prong inspection for life.",
    ],
    delivery: "Made to order · dispatched in 5–6 weeks · fully insured, signature on delivery",
    variants: [
      { id: "500", label: "5.00ctw line", priceDelta: -1240000 },
      { id: "1000", label: "10.00ctw line", priceDelta: 0 },
      { id: "1500", label: "15.00ctw line", priceDelta: 1420000 },
    ],
    isFeatured: true,
  },

  // ── 11 ───────────────────────────────────────────────────────────────
  {
    slug: "solene-diamond-pendant",
    name: "Solène Bezel Diamond Pendant · 0.70ct",
    collection: "Everyday Brilliance",
    category: "Pendants",
    metal: "18k White Gold",
    setting: "Bezel",
    gender: "Women",
    occasion: ["Everyday", "Gift", "Bridesmaid"],
    price: 168000,
    image: img("photo-1611652022419-a9419f74343d"),
    gallery: [
      img("photo-1611652022419-a9419f74343d"),
      img("photo-1599643478518-a784e5dc4c8f"),
      img("photo-1515562141207-7a88fb7ce338"),
      img("photo-1573408301185-9146fe634ad0"),
    ],
    shortDescription:
      "A single 0.70ct round brilliant (G / VS1, GIA) in a shaved white-gold bezel on a fine 45cm cable chain.",
    story:
      "Solène is restraint itself. One 0.70ct round brilliant, G colour, held in a bezel shaved to its thinnest possible profile so the diamond reads as pure light against the throat. The 1.1mm cable chain sits at 45cm with a sizing loop at 42cm. The bezel protects the girdle, making this the most knock-resistant way to wear a diamond every day.",
    diamond: {
      shape: "Round Brilliant",
      carat: "0.70 ct",
      colour: "G (Near-colourless)",
      clarity: "VS1",
      cut: "Excellent",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "Faint",
      certification: "GIA report card",
    },
    specs: [
      { label: "Diamond", value: "0.70ct round brilliant, G / VS1, bezel-set" },
      { label: "Metal", value: "18k white gold, approx. 3.1 g including chain" },
      { label: "Chain", value: "1.1 mm cable, 45 cm with 42 cm sizing loop" },
      { label: "Certification", value: "GIA report card supplied" },
    ],
    priceBreakdown: [
      { label: "Diamond (0.70ct G/VS1)", value: "₹1,32,000" },
      { label: "18k white gold bezel & chain", value: "₹31,100" },
      { label: "GST (3%)", value: "₹4,900" },
      { label: "Total", value: "₹1,68,000" },
    ],
    care: [
      "Bezel is the toughest pendant setting — safe for daily wear.",
      "Wipe the back of the stone where skin oils build up.",
      "Check the chain jump-rings every few months.",
    ],
    delivery: "Ready to ship within 5 working days · insured courier",
    variants: [
      { id: "050", label: "0.50ct · G / VS", priceDelta: -52000 },
      { id: "070", label: "0.70ct · G / VS1", priceDelta: 0 },
      { id: "100", label: "1.00ct · F / VS1", priceDelta: 165000 },
    ],
    isFeatured: true,
  },

  // ── 12 ───────────────────────────────────────────────────────────────
  {
    slug: "nakshatra-pendant-set",
    name: "Nakshatra Diamond Pendant Set · 1.85ctw",
    collection: "Bridal Sets",
    category: "Pendants",
    metal: "18k Yellow Gold",
    setting: "Nakshatra",
    gender: "Women",
    occasion: ["Wedding", "Reception", "Festive", "Gift"],
    price: 645000,
    image: img("photo-1611652022419-a9419f74343d"),
    gallery: [
      img("photo-1611652022419-a9419f74343d"),
      img("photo-1573408301185-9146fe634ad0"),
      img("photo-1601121141461-9d6647bca1ed"),
      img("photo-1599643478518-a784e5dc4c8f"),
    ],
    shortDescription:
      "A star-motif pendant with matching studs — 1.85ctw of round and rose-cut diamonds in 18k yellow gold, an Indian bridal staple.",
    story:
      "Nakshatra means 'star'. The pendant is a nine-point star built from a bright round-brilliant centre, a ring of small brilliants and an outer halo of rose-cut diamonds that give an antique, candle-lit sparkle. It comes with matching 0.40ctw studs. Designed for the Indian bride who wants a diamond set that also reads beautifully with a yellow-gold saree border.",
    diamond: {
      shape: "Round Brilliant + Rose Cut",
      carat: "1.45 ct pendant + 0.40 ctw studs = 1.85 ctw",
      colour: "G – H",
      clarity: "VS – SI (eye-clean)",
      cut: "Very Good (brilliants) / Rose cut",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None – Medium",
      certification: "Soni Diamonds in-house certificate + IGI verification",
    },
    specs: [
      { label: "Pendant", value: "Nine-point star, 1.45ctw, 26 mm diameter" },
      { label: "Studs", value: "Matching pair, 0.40ctw total" },
      { label: "Metal", value: "18k yellow gold, approx. 9.5 g the set" },
      { label: "Chain", value: "18k gold rope chain, 42 cm" },
      { label: "Setting", value: "Prong centre, grain-set halo, bezel rose-cuts" },
    ],
    priceBreakdown: [
      { label: "Diamonds (1.85ctw, mixed cut)", value: "₹4,25,000" },
      { label: "18k yellow gold (9.5g) & handwork", value: "₹1,93,200" },
      { label: "GST (3%)", value: "₹18,800" },
      { label: "Total (pendant + studs + chain)", value: "₹6,45,000" },
    ],
    care: [
      "Rose-cut diamonds are shallow — avoid direct knocks to the outer halo.",
      "Store the pendant and studs flat in the fitted box.",
      "Have the grain settings checked once a year.",
    ],
    delivery: "Made to order · dispatched in 4 weeks · insured, signature on delivery",
    variants: [
      { id: "set", label: "Pendant + studs (set)", priceDelta: 0 },
      { id: "pendant", label: "Pendant only", priceDelta: -142000 },
      { id: "large", label: "Set with 2.40ctw pendant", priceDelta: 285000 },
    ],
    isNew: true,
  },

  // ── 13 ───────────────────────────────────────────────────────────────
  {
    slug: "meridian-diamond-necklace-set",
    name: "Meridian Bridal Necklace Set · 8.60ctw",
    collection: "Bridal Sets",
    category: "Necklaces",
    metal: "18k Yellow Gold",
    setting: "Cluster",
    gender: "Women",
    occasion: ["Wedding", "Reception", "Sangeet"],
    price: 1985000,
    image: img("photo-1602751584552-8ba73aad10e1"),
    gallery: [
      img("photo-1602751584552-8ba73aad10e1"),
      img("photo-1599643478518-a784e5dc4c8f"),
      img("photo-1611652022419-a9419f74343d"),
      img("photo-1601121141461-9d6647bca1ed"),
    ],
    shortDescription:
      "A graduated cluster-motif bridal necklace with matching earrings — 8.60ctw of brilliants in 18k yellow gold.",
    story:
      "Meridian is a full bridal necklace: a graduated row of diamond clusters, each a flower of one centre and six petals, rising to a larger pendant motif at the throat. It comes with matching chandelier earrings. Built for the wedding day and the decades of anniversaries after it — the kind of set that is re-worn, re-photographed and passed down.",
    diamond: {
      shape: "Round Brilliant (cluster motifs)",
      carat: "6.90 ct necklace + 1.70 ctw earrings = 8.60 ctw",
      colour: "F – G",
      clarity: "VS – SI1",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None – Faint",
      certification: "IGI set dossier",
    },
    specs: [
      { label: "Necklace", value: "17 graduated cluster motifs, 6.90ctw, 40 cm" },
      { label: "Earrings", value: "Matching chandeliers, 1.70ctw, 32 mm drop" },
      { label: "Metal", value: "18k yellow gold, approx. 34 g the set" },
      { label: "Clasp", value: "Box clasp with fold-over safety" },
      { label: "Setting", value: "Prong-set clusters, hinged links" },
    ],
    priceBreakdown: [
      { label: "Diamonds (8.60ctw F–G / VS–SI)", value: "₹15,90,000" },
      { label: "18k yellow gold (34g) & handwork", value: "₹3,37,200" },
      { label: "GST (3%)", value: "₹57,800" },
      { label: "Total (necklace + earrings)", value: "₹19,85,000" },
    ],
    care: [
      "Put on after hair and make-up; take off before removing them.",
      "Store the necklace flat and the earrings upright in the fitted case.",
      "Annual professional clean and clasp check included for life.",
    ],
    delivery: "Made to order · dispatched in 6 weeks · fully insured, signature required",
    variants: [
      { id: "set", label: "Necklace + earrings (set)", priceDelta: 0 },
      { id: "necklace", label: "Necklace only", priceDelta: -420000 },
      { id: "grand", label: "Grand set · 12.00ctw", priceDelta: 1650000 },
    ],
    isFeatured: true,
  },

  // ── 14 ───────────────────────────────────────────────────────────────
  {
    slug: "lumen-diamond-stud-earrings",
    name: "Lumen Diamond Stud Earrings · 1.50ctw",
    collection: "Everyday Brilliance",
    category: "Earrings",
    metal: "18k White Gold",
    setting: "Solitaire",
    gender: "Women",
    occasion: ["Everyday", "Gift", "Bridal"],
    price: 342000,
    image: img("photo-1535632066927-ab7c9ab60908"),
    gallery: [
      img("photo-1535632066927-ab7c9ab60908"),
      img("photo-1633934542430-0905ccb5f050"),
      img("photo-1629224316810-9d8805b95e76"),
      img("photo-1602751584552-8ba73aad10e1"),
    ],
    shortDescription:
      "A matched pair of 0.75ct round brilliants — 1.50ctw, F / VS2, IGI — in four-prong martini settings with locking backs.",
    story:
      "The pair you never take off. Two 0.75ct round brilliants, hand-matched for colour and cut so they read as identical from every angle, set in low four-prong martini baskets that sit close to the lobe. Secured with locking Guardian backs. This is the single most-requested diamond piece we make.",
    diamond: {
      shape: "Round Brilliant (matched pair)",
      carat: "1.50 ct total (2 × 0.75 ct)",
      colour: "F",
      clarity: "VS2",
      cut: "Excellent",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI matched-pair report",
    },
    specs: [
      { label: "Diamonds", value: "2 × 0.75ct round brilliant, F / VS2, matched" },
      { label: "Metal", value: "18k white gold, approx. 2.4 g the pair" },
      { label: "Setting", value: "Four-prong martini basket" },
      { label: "Backs", value: "Guardian locking backs included" },
    ],
    priceBreakdown: [
      { label: "Diamonds (1.50ctw F/VS2)", value: "₹3,15,000" },
      { label: "18k white gold & setting", value: "₹17,100" },
      { label: "GST (3%)", value: "₹9,900" },
      { label: "Total", value: "₹3,42,000" },
    ],
    care: [
      "Push the locking backs fully home each time you wear them.",
      "Clean weekly — earrings collect the most skin oil and product.",
      "Have the four prongs checked at your annual service.",
    ],
    delivery: "Ready to ship within 5 working days · insured courier",
    variants: [
      { id: "070", label: "0.70ctw · F / VS", priceDelta: -140000 },
      { id: "150", label: "1.50ctw · F / VS2", priceDelta: 0 },
      { id: "200", label: "2.00ctw · F / VS2", priceDelta: 235000 },
      { id: "300", label: "3.00ctw · F / VS2", priceDelta: 620000 },
    ],
    isFeatured: true,
  },

  // ── 15 ───────────────────────────────────────────────────────────────
  {
    slug: "celeste-pear-drop-earrings",
    name: "Céleste Pear Diamond Drop Earrings · 3.00ctw",
    collection: "The Solitaire",
    category: "Earrings",
    metal: "18k White Gold",
    setting: "Three Stone",
    gender: "Women",
    occasion: ["Black tie", "Reception", "Anniversary"],
    price: 1560000,
    image: img("photo-1633934542430-0905ccb5f050"),
    gallery: [
      img("photo-1633934542430-0905ccb5f050"),
      img("photo-1535632066927-ab7c9ab60908"),
      img("photo-1602751584552-8ba73aad10e1"),
      img("photo-1611652022419-a9419f74343d"),
    ],
    shortDescription:
      "Two 1.50ct pear brilliants (E–F / VS1, GIA) suspended beneath diamond-set bails — 3.60ctw total, hinged to swing.",
    story:
      "Céleste hangs a 1.50ct pear-cut brilliant beneath a bail of graduated round diamonds on each ear. The pear stones are matched for outline and length-to-width ratio so they swing in mirror image. Every drop moves freely on a concealed hinge so they catch light with the turn of the head.",
    diamond: {
      shape: "Pear Brilliant + Round bail",
      carat: "3.00 ct pears (2 × 1.50 ct) + 0.60 ct bails = 3.60 ctw",
      colour: "E – F",
      clarity: "VS1",
      cut: "Excellent",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "GIA for both pear diamonds",
    },
    specs: [
      { label: "Drop stones", value: "2 × 1.50ct pear brilliant, E–F / VS1, GIA" },
      { label: "Bails", value: "18 round brilliants, 0.60ct total" },
      { label: "Metal", value: "18k white gold, approx. 4.4 g the pair" },
      { label: "Fitting", value: "Post and locking back, hinged drop" },
    ],
    priceBreakdown: [
      { label: "Pear diamonds (3.00ctw E–F / VS1)", value: "₹13,80,000" },
      { label: "Bail diamonds (0.60ctw)", value: "₹1,44,000" },
      { label: "18k white gold & labour", value: "₹19,200" },
      { label: "GST (3%)", value: "₹16,800" },
      { label: "Total", value: "₹15,60,000" },
    ],
    care: [
      "Pear points are the vulnerable spot — store in the fitted box, not loose.",
      "Fasten locking backs fully; these are heavier than studs.",
      "Yearly hinge and prong check included for life.",
    ],
    delivery: "Made to order · dispatched in 4–5 weeks · fully insured",
    variants: [
      { id: "200", label: "2.00ctw pears", priceDelta: -540000 },
      { id: "300", label: "3.00ctw pears", priceDelta: 0 },
      { id: "400", label: "4.00ctw pears", priceDelta: 680000 },
    ],
    isNew: true,
  },

  // ── 16 ───────────────────────────────────────────────────────────────
  {
    slug: "halo-diamond-hoop-earrings",
    name: "Orbit Diamond Hoop Earrings · 2.00ctw",
    collection: "Everyday Brilliance",
    category: "Earrings",
    metal: "18k Yellow Gold",
    setting: "Pavé",
    gender: "Women",
    occasion: ["Everyday", "Party", "Gift"],
    price: 415000,
    image: img("photo-1629224316810-9d8805b95e76"),
    gallery: [
      img("photo-1629224316810-9d8805b95e76"),
      img("photo-1535632066927-ab7c9ab60908"),
      img("photo-1633934542430-0905ccb5f050"),
      img("photo-1573408301185-9146fe634ad0"),
    ],
    shortDescription:
      "25mm inside-out hoops pavé-set front and inner face with 2.00ctw of round brilliants, F–G / VS, in 18k yellow gold.",
    story:
      "Orbit hoops are set 'inside-out' — diamonds on the outer face and the inner face — so they sparkle whether the hoop turns towards you or away. 25mm diameter, a practical everyday size, with a secure hinged click closure and a safety catch. 2.00ctw across 90 matched stones.",
    diamond: {
      shape: "Round Brilliant (pavé, inside-out)",
      carat: "2.00 ct total, 90 stones",
      colour: "F – G",
      clarity: "VS1 – VS2",
      cut: "Very Good",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI hoop dossier",
    },
    specs: [
      { label: "Diamonds", value: "90 round brilliant, 2.00ct total, F–G / VS" },
      { label: "Metal", value: "18k yellow gold, approx. 7 g the pair" },
      { label: "Diameter", value: "25 mm outside" },
      { label: "Closure", value: "Hinged click with internal safety catch" },
    ],
    priceBreakdown: [
      { label: "Diamonds (2.00ctw F–G / VS)", value: "₹3,60,000" },
      { label: "18k yellow gold (7g) & pavé labour", value: "₹42,900" },
      { label: "GST (3%)", value: "₹12,100" },
      { label: "Total", value: "₹4,15,000" },
    ],
    care: [
      "Close the click fully until you feel the catch engage.",
      "Wipe the inner face — it sits against the neck and collects oil.",
      "Bright-cut pavé beads are fine, but avoid sleeping in them.",
    ],
    delivery: "Ready to ship within 7 working days · insured courier",
    variants: [
      { id: "100", label: "1.00ctw · 20 mm", priceDelta: -175000 },
      { id: "200", label: "2.00ctw · 25 mm", priceDelta: 0 },
      { id: "300", label: "3.00ctw · 30 mm", priceDelta: 245000 },
    ],
  },

  // ── 17 ───────────────────────────────────────────────────────────────
  {
    slug: "aria-diamond-tennis-bracelet",
    name: "Aria Diamond Tennis Bracelet · 5.00ctw",
    collection: "The Rivière",
    category: "Bracelets",
    metal: "18k White Gold",
    setting: "Tennis",
    gender: "Women",
    occasion: ["Anniversary", "Gift", "Everyday luxury"],
    price: 1145000,
    image: img("photo-1573408301185-9146fe634ad0"),
    gallery: [
      img("photo-1573408301185-9146fe634ad0"),
      img("photo-1611085583191-a3b181a88401"),
      img("photo-1601121141461-9d6647bca1ed"),
      img("photo-1599643478518-a784e5dc4c8f"),
    ],
    shortDescription:
      "The classic tennis bracelet — 52 uniform round brilliants, 5.00ctw, F–G / VS, four-prong, with a concealed double-safety clasp.",
    story:
      "Aria is the tennis bracelet done properly: 52 uniform round brilliants, each about 0.096ct, F–G colour and VS clarity, set in individual four-prong links that flex around the wrist. A concealed clasp with a double safety catch means it stays on. Sized to 17cm with removable links, so we can fit it exactly.",
    diamond: {
      shape: "Round Brilliant (uniform line)",
      carat: "5.00 ct total, 52 stones",
      colour: "F – G",
      clarity: "VS1 – VS2",
      cut: "Very Good – Excellent",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI bracelet dossier",
    },
    specs: [
      { label: "Diamonds", value: "52 round brilliant, 5.00ct total, F–G / VS" },
      { label: "Metal", value: "18k white gold, approx. 14 g" },
      { label: "Length", value: "17 cm, removable links for exact sizing" },
      { label: "Clasp", value: "Concealed box clasp, double safety catch" },
    ],
    priceBreakdown: [
      { label: "Diamonds (5.00ctw F–G / VS)", value: "₹10,50,000" },
      { label: "18k white gold & articulated setting", value: "₹61,700" },
      { label: "GST (3%)", value: "₹33,300" },
      { label: "Total", value: "₹11,45,000" },
    ],
    care: [
      "Check the safety catch is closed over the clasp every time.",
      "Take off before sport — the links flex but the clasp can snag.",
      "Complimentary annual clasp service and re-tip of any worn prongs.",
    ],
    delivery: "Made to order to your wrist size · dispatched in 3–4 weeks · insured",
    variants: [
      { id: "300", label: "3.00ctw", priceDelta: -410000 },
      { id: "500", label: "5.00ctw", priceDelta: 0 },
      { id: "700", label: "7.00ctw", priceDelta: 510000 },
      { id: "1000", label: "10.00ctw", priceDelta: 1225000 },
    ],
    isFeatured: true,
  },

  // ── 18 ───────────────────────────────────────────────────────────────
  {
    slug: "eternelle-diamond-bangle",
    name: "Éternelle Diamond Bangle · 3.40ctw",
    collection: "The Rivière",
    category: "Bangles",
    metal: "18k Yellow Gold",
    setting: "Pavé",
    gender: "Women",
    occasion: ["Festive", "Wedding gift", "Anniversary"],
    price: 985000,
    image: img("photo-1611085583191-a3b181a88401"),
    gallery: [
      img("photo-1611085583191-a3b181a88401"),
      img("photo-1601121141461-9d6647bca1ed"),
      img("photo-1573408301185-9146fe634ad0"),
      img("photo-1603561591411-07134e71a2a9"),
    ],
    shortDescription:
      "A rigid 18k yellow-gold bangle pavé-set across the top half with 88 round brilliants — 3.40ctw, F–G / VS — on a concealed hinge.",
    story:
      "Éternelle is a sprung oval bangle in 18k yellow gold, pavé-set across the top half with 88 round brilliants totalling 3.40 carats. The gold underside stays smooth against the wrist. It opens on a concealed hinge with a figure-eight clasp and slides on without catching. Made to an exact inner measurement so it sits without spinning.",
    diamond: {
      shape: "Round Brilliant (pavé, top half)",
      carat: "3.40 ct total, 88 stones",
      colour: "F – G",
      clarity: "VS1 – VS2",
      cut: "Very Good – Excellent",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "In-house grading with IGI verification",
    },
    specs: [
      { label: "Diamonds", value: "88 round brilliant, 3.40ct total, F–G / VS" },
      { label: "Metal", value: "18k yellow gold, approx. 24 g" },
      { label: "Fit", value: "Sprung oval, 58 × 50 mm inner (made to measure)" },
      { label: "Closure", value: "Concealed hinge, figure-eight clasp" },
    ],
    priceBreakdown: [
      { label: "Diamonds (3.40ctw F–G / VS)", value: "₹6,80,000" },
      { label: "18k yellow gold (24g) & pavé labour", value: "₹2,76,300" },
      { label: "GST (3%)", value: "₹28,700" },
      { label: "Total", value: "₹9,85,000" },
    ],
    care: [
      "Open and close at the hinge gently — do not force the bangle over the hand.",
      "Keep the pavé away from hard surfaces; the top half is set with diamonds.",
      "Annual hinge and clasp check included for life.",
    ],
    delivery: "Made to your wrist measurement · dispatched in 4 weeks · insured",
    variants: [
      { id: "s", label: "Small (55 × 48 mm)", priceDelta: 0 },
      { id: "m", label: "Medium (58 × 50 mm)", priceDelta: 0 },
      { id: "l", label: "Large (61 × 53 mm) · +2 stones", priceDelta: 32000 },
      { id: "full", label: "Full pavé (all round) · 6.20ctw", priceDelta: 720000 },
    ],
    isNew: true,
  },

  // ── 19 ───────────────────────────────────────────────────────────────
  {
    slug: "kada-mens-diamond-bracelet",
    name: "Kada Men's Diamond Bracelet · 2.20ctw",
    collection: "Gentleman",
    category: "Bracelets",
    metal: "18k White Gold",
    setting: "Bezel",
    gender: "Men",
    occasion: ["Gift for him", "Anniversary", "Statement"],
    price: 725000,
    image: img("photo-1611085583191-a3b181a88401"),
    gallery: [
      img("photo-1611085583191-a3b181a88401"),
      img("photo-1573408301185-9146fe634ad0"),
      img("photo-1601121141461-9d6647bca1ed"),
      img("photo-1598560917505-59a3ad559071"),
    ],
    shortDescription:
      "A heavy curb-link bracelet in 18k white gold with 11 bezel-set round brilliants — 2.20ctw, G–H / VS-SI — down the centre line.",
    story:
      "Kada is a men's statement bracelet: a solid curb-link chain in 18k white gold, 9mm wide, with 11 round brilliants bezel-set into alternating links so the diamonds sit flush and survive daily wear. Weighs 42 grams — it has real presence on the wrist. Box clasp with a figure-eight and a push-piece safety.",
    diamond: {
      shape: "Round Brilliant (bezel-set)",
      carat: "2.20 ct total, 11 stones",
      colour: "G – H",
      clarity: "VS2 – SI1 (eye-clean)",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None – Faint",
      certification: "IGI bracelet dossier",
    },
    specs: [
      { label: "Diamonds", value: "11 round brilliant, 2.20ct total, G–H / VS–SI" },
      { label: "Metal", value: "18k white gold, approx. 42 g" },
      { label: "Width", value: "9 mm curb link" },
      { label: "Length", value: "20 cm, links removable" },
      { label: "Clasp", value: "Box clasp, figure-eight + push-piece safety" },
    ],
    priceBreakdown: [
      { label: "Diamonds (2.20ctw G–H / VS–SI)", value: "₹3,74,000" },
      { label: "18k white gold (42g) & labour", value: "₹3,29,900" },
      { label: "GST (3%)", value: "₹21,100" },
      { label: "Total", value: "₹7,25,000" },
    ],
    care: [
      "Bezel-set diamonds are very robust — this is built for daily wear.",
      "Have links added or removed by us so the clasp alignment is kept.",
      "Re-polish and re-rhodium every 2–3 years (first service complimentary).",
    ],
    delivery: "Made to order to length · dispatched in 4 weeks · insured",
    variants: [
      { id: "150", label: "1.50ctw · 9 stones", priceDelta: -180000 },
      { id: "220", label: "2.20ctw · 11 stones", priceDelta: 0 },
      { id: "320", label: "3.20ctw · 15 stones", priceDelta: 265000 },
    ],
  },

  // ── 20 ───────────────────────────────────────────────────────────────
  {
    slug: "surya-diamond-mangalsutra",
    name: "Surya Diamond Mangalsutra · 1.10ctw",
    collection: "Bridal Sets",
    category: "Necklaces",
    metal: "18k Yellow Gold",
    setting: "Cluster",
    gender: "Women",
    occasion: ["Wedding", "Daily wear", "Gift for wife"],
    price: 288000,
    image: img("photo-1599643478518-a784e5dc4c8f"),
    gallery: [
      img("photo-1599643478518-a784e5dc4c8f"),
      img("photo-1611652022419-a9419f74343d"),
      img("photo-1602751584552-8ba73aad10e1"),
      img("photo-1601121141461-9d6647bca1ed"),
    ],
    shortDescription:
      "A modern diamond mangalsutra — twin black-bead chains and a diamond sun-motif pendant, 1.10ctw, G–H / VS-SI, in 18k gold.",
    story:
      "Surya updates the mangalsutra for daily wear: two fine strands of black beads in 18k gold meeting at a diamond sun-motif pendant — a round-brilliant centre in a rays-of-light halo. Light enough to wear all day, secure enough not to worry about, and unmistakably a diamond piece. Adjustable from 40 to 46 cm.",
    diamond: {
      shape: "Round Brilliant (sun-motif cluster)",
      carat: "1.10 ct total",
      colour: "G – H",
      clarity: "VS2 – SI1 (eye-clean)",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None – Faint",
      certification: "Soni Diamonds in-house certificate",
    },
    specs: [
      { label: "Pendant", value: "Sun motif, 1.10ctw, 22 mm diameter" },
      { label: "Chain", value: "Twin black-bead strands in 18k gold, 40–46 cm adjustable" },
      { label: "Metal", value: "18k yellow gold, approx. 8 g" },
      { label: "Clasp", value: "Lobster clasp with 3 adjustment loops" },
    ],
    priceBreakdown: [
      { label: "Diamonds (1.10ctw G–H / VS–SI)", value: "₹1,87,000" },
      { label: "18k yellow gold (8g), beads & labour", value: "₹92,600" },
      { label: "GST (3%)", value: "₹8,400" },
      { label: "Total", value: "₹2,88,000" },
    ],
    care: [
      "Black beads are glass over gold thread — avoid sharp tugs.",
      "Wipe the pendant clean of sindoor and skin oils weekly.",
      "Bring the strands in yearly so we can re-string if any thread wears.",
    ],
    delivery: "Ready to ship within 7 working days · insured courier",
    variants: [
      { id: "075", label: "0.75ctw pendant", priceDelta: -62000 },
      { id: "110", label: "1.10ctw pendant", priceDelta: 0 },
      { id: "160", label: "1.60ctw pendant", priceDelta: 118000 },
    ],
    isNew: true,
  },

  // ── 21 ───────────────────────────────────────────────────────────────
  {
    slug: "consort-mens-solitaire-ring",
    name: "Consort Men's Solitaire Ring · 1.00ct",
    collection: "The Solitaire",
    category: "Rings",
    metal: "Platinum 950",
    setting: "Solitaire",
    gender: "Men",
    occasion: ["Engagement", "Anniversary", "Gift for him"],
    price: 685000,
    image: img("photo-1605100804763-247f67b3557e"),
    gallery: [
      img("photo-1605100804763-247f67b3557e"),
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1598560917505-59a3ad559071"),
      img("photo-1596944924616-7b38e7cfac36"),
    ],
    shortDescription:
      "A 1.00ct round brilliant (G / VS1, GIA) in a four-prong platinum setting on a wide 5mm squared band.",
    story:
      "Consort is a men's solitaire with structure. The 1.00ct round brilliant is held in a low, sturdy four-prong head so it survives daily wear, mounted on a wide 5mm band with squared shoulders and a comfort-fit interior. Substantial without being showy — a diamond a man will actually wear.",
    diamond: {
      shape: "Round Brilliant",
      carat: "1.00 ct",
      colour: "G (Near-colourless)",
      clarity: "VS1",
      cut: "Excellent",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "GIA — full grading report",
    },
    specs: [
      { label: "Centre stone", value: "1.00ct round brilliant, G / VS1, GIA" },
      { label: "Metal", value: "950 platinum, approx. 9 g" },
      { label: "Band width", value: "5.0 mm, squared, comfort-fit" },
      { label: "Setting", value: "Low four-prong head" },
      { label: "Certification", value: "GIA report supplied" },
    ],
    priceBreakdown: [
      { label: "Centre diamond (1.00ct G/VS1)", value: "₹4,45,000" },
      { label: "Platinum (9g) & labour", value: "₹2,20,050" },
      { label: "GST (3%)", value: "₹19,950" },
      { label: "Total", value: "₹6,85,000" },
    ],
    care: [
      "The low head is knock-resistant, but still remove for heavy lifting.",
      "Clean weekly in warm soapy water and check the prongs monthly.",
      "Platinum takes a patina — we re-polish to high shine on request.",
    ],
    delivery: "Made to order in your size · dispatched in 4 weeks · insured",
    variants: [
      { id: "070", label: "0.70ct · G / VS", priceDelta: -175000 },
      { id: "100", label: "1.00ct · G / VS1", priceDelta: 0 },
      { id: "150", label: "1.51ct · F / VS2", priceDelta: 380000 },
    ],
    isFeatured: true,
    isNew: true,
  },

  // ── 22 ───────────────────────────────────────────────────────────────
  {
    slug: "baron-mens-three-stone-ring",
    name: "Baron Men's Three-Stone Ring · 1.50ctw",
    collection: "The Three Stone",
    category: "Rings",
    metal: "18k White Gold",
    setting: "Three Stone",
    gender: "Men",
    occasion: ["Anniversary", "Milestone", "Gift for him"],
    price: 545000,
    image: img("photo-1596944924616-7b38e7cfac36"),
    gallery: [
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1598560917505-59a3ad559071"),
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1605100804763-247f67b3557e"),
    ],
    shortDescription:
      "Three flush-set round brilliants — 1.50ctw, G–H / VS — set in a line down a brushed 7mm white-gold band.",
    story:
      "Baron sets three round brilliants — a 0.70ct centre and two 0.40ct sides — flush into a brushed 7mm 18k white-gold band, so the diamonds sit level with the metal surface and shrug off daily wear. Read as three points of light across the finger; feel almost nothing. A men's three-stone that works on site, at the desk and at dinner.",
    diamond: {
      shape: "Round Brilliant (three, flush-set)",
      carat: "0.70 ct centre + 2 × 0.40 ct = 1.50 ctw",
      colour: "G – H",
      clarity: "VS1 – VS2",
      cut: "Very Good",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI three-stone report",
    },
    specs: [
      { label: "Diamonds", value: "3 round brilliant, 1.50ctw, G–H / VS, flush-set" },
      { label: "Metal", value: "18k white gold, approx. 12 g" },
      { label: "Band width", value: "7.0 mm, comfort-fit" },
      { label: "Finish", value: "Brushed centre, polished bevels, rhodium" },
    ],
    priceBreakdown: [
      { label: "Diamonds (1.50ctw G–H / VS)", value: "₹3,00,000" },
      { label: "18k white gold (12g) & labour", value: "₹2,28,700" },
      { label: "GST (3%)", value: "₹16,300" },
      { label: "Total", value: "₹5,45,000" },
    ],
    care: [
      "Flush setting is built for daily wear across most trades.",
      "Re-brush and re-rhodium every 2–3 years (first service complimentary).",
      "Rinse and dry after exposure to sweat, chlorine or seawater.",
    ],
    delivery: "Made to order in your size · dispatched in 3–4 weeks · insured",
    variants: [
      { id: "100", label: "1.00ctw", priceDelta: -160000 },
      { id: "150", label: "1.50ctw", priceDelta: 0 },
      { id: "220", label: "2.20ctw", priceDelta: 245000 },
    ],
  },

  // ── 23 ───────────────────────────────────────────────────────────────
  {
    slug: "monarch-mens-signet-diamond-ring",
    name: "Monarch Men's Diamond Signet Ring · 0.35ct",
    collection: "Gentleman",
    category: "Rings",
    metal: "18k Yellow Gold",
    setting: "Bezel",
    gender: "Men",
    occasion: ["Gift for him", "Statement", "Heirloom"],
    price: 358000,
    image: img("photo-1611591437281-460bfbe1220a"),
    gallery: [
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1603561591411-07134e71a2a9"),
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1598560917505-59a3ad559071"),
    ],
    shortDescription:
      "A heavy 18k yellow-gold signet with a single 0.35ct round brilliant bezel-set into the polished face.",
    story:
      "Monarch is a classic gentleman's signet reworked around a diamond: a solid 18k yellow-gold ring with a domed, polished oval face and one 0.35ct round brilliant bezel-set flush at the centre. The face can be left plain or hand-engraved with initials in our workshop. 14 grams of gold — it has the weight a signet should.",
    diamond: {
      shape: "Round Brilliant (bezel-set)",
      carat: "0.35 ct",
      colour: "G",
      clarity: "VS2",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI report supplied",
    },
    specs: [
      { label: "Diamond", value: "0.35ct round brilliant, G / VS2, bezel-set" },
      { label: "Metal", value: "18k yellow gold, approx. 14 g" },
      { label: "Face", value: "16 × 13 mm oval, engravable" },
      { label: "Finish", value: "High-polish face, polished band" },
    ],
    priceBreakdown: [
      { label: "Diamond (0.35ct G/VS2)", value: "₹98,000" },
      { label: "18k yellow gold (14g) & labour", value: "₹2,50,600" },
      { label: "GST (3%)", value: "₹9,400" },
      { label: "Total", value: "₹3,58,000" },
    ],
    care: [
      "Bezel setting protects the stone — safe for everyday wear.",
      "Re-polish the face yearly to keep it mirror-bright (first year complimentary).",
      "Engraving can be added or refreshed at any time in our workshop.",
    ],
    delivery: "Made to order · dispatched in 4 weeks · engraving adds 5 days",
    variants: [
      { id: "plain", label: "Plain face", priceDelta: 0 },
      { id: "initials", label: "Hand-engraved initials", priceDelta: 8000 },
      { id: "050", label: "0.50ct diamond, plain face", priceDelta: 62000 },
    ],
  },

  // ── 24 ───────────────────────────────────────────────────────────────
  {
    slug: "atlas-mens-eternity-band",
    name: "Atlas Men's Diamond Eternity Band · 1.20ctw",
    collection: "The Rivière",
    category: "Rings",
    metal: "Platinum 950",
    setting: "Tennis",
    gender: "Men",
    occasion: ["Wedding band", "Anniversary"],
    price: 512000,
    image: img("photo-1598560917505-59a3ad559071"),
    gallery: [
      img("photo-1598560917505-59a3ad559071"),
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1605100804763-247f67b3557e"),
    ],
    shortDescription:
      "A 6mm platinum band with 20 channel-set round brilliants — 1.20ctw, F–G / VS — running the full circle.",
    story:
      "Atlas is a men's full-eternity wedding band: 20 round brilliants, F–G / VS, channel-set flush around a solid 6mm platinum ring so nothing catches and nothing is exposed. From a step back it is a clean line of light around the finger; up close, the platinum weight is unmistakable. Because it is a full circle, order to your exact size — resizing is limited.",
    diamond: {
      shape: "Round Brilliant (channel, full eternity)",
      carat: "1.20 ct total, 20 stones",
      colour: "F – G",
      clarity: "VS1 – VS2",
      cut: "Very Good – Excellent",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI eternity-band report",
    },
    specs: [
      { label: "Diamonds", value: "20 round brilliant, 1.20ct total, F–G / VS" },
      { label: "Metal", value: "950 platinum, approx. 9 g" },
      { label: "Band width", value: "6.0 mm, comfort-fit" },
      { label: "Setting", value: "Channel, full eternity" },
    ],
    priceBreakdown: [
      { label: "Diamonds (1.20ctw F–G / VS)", value: "₹2,88,000" },
      { label: "Platinum (9g) & channel-setting labour", value: "₹2,09,100" },
      { label: "GST (3%)", value: "₹14,900" },
      { label: "Total", value: "₹5,12,000" },
    ],
    care: [
      "Full eternity bands resize only ±half a size — choose carefully.",
      "The channel protects the stones; simply rinse and dry.",
      "Yearly channel-wall check included for the life of the ring.",
    ],
    delivery: "Made to order in your exact size · dispatched in 3–4 weeks",
    variants: [
      { id: "080", label: "0.80ctw", priceDelta: -110000 },
      { id: "120", label: "1.20ctw", priceDelta: 0 },
      { id: "180", label: "1.80ctw", priceDelta: 175000 },
    ],
  },

  // ── 25 ───────────────────────────────────────────────────────────────
  {
    slug: "envoy-mens-diamond-stud",
    name: "Envoy Men's Single Diamond Stud · 0.50ct",
    collection: "Everyday Brilliance",
    category: "Earrings",
    metal: "18k White Gold",
    setting: "Bezel",
    gender: "Men",
    occasion: ["Everyday", "Gift for him", "Statement"],
    price: 145000,
    image: img("photo-1535632066927-ab7c9ab60908"),
    gallery: [
      img("photo-1535632066927-ab7c9ab60908"),
      img("photo-1629224316810-9d8805b95e76"),
      img("photo-1633934542430-0905ccb5f050"),
      img("photo-1602751584552-8ba73aad10e1"),
    ],
    shortDescription:
      "A single 0.50ct round brilliant (G / VS2) in a low white-gold bezel with a screw-back post — sold singly.",
    story:
      "Envoy is a single men's stud: one 0.50ct round brilliant, G / VS2, set in a low, close bezel that sits tight to the lobe and won't snag on collars or headphones. Threaded screw-back post so it stays put. Sold as one earring; order two if you wear a pair.",
    diamond: {
      shape: "Round Brilliant",
      carat: "0.50 ct",
      colour: "G",
      clarity: "VS2",
      cut: "Very Good",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI report supplied",
    },
    specs: [
      { label: "Diamond", value: "0.50ct round brilliant, G / VS2, bezel-set" },
      { label: "Metal", value: "18k white gold, approx. 0.9 g" },
      { label: "Fitting", value: "Threaded screw-back post" },
      { label: "Sold as", value: "Single earring" },
    ],
    priceBreakdown: [
      { label: "Diamond (0.50ct G/VS2)", value: "₹1,32,000" },
      { label: "18k white gold & setting", value: "₹8,600" },
      { label: "GST (3%)", value: "₹4,400" },
      { label: "Total (per earring)", value: "₹1,45,000" },
    ],
    care: [
      "Screw the back fully home each time — check it weekly.",
      "The bezel is snag-proof; still remove for contact sport.",
      "Clean behind the setting where oils and product collect.",
    ],
    delivery: "Ready to ship within 5 working days · insured courier",
    variants: [
      { id: "030", label: "0.30ct · single", priceDelta: -62000 },
      { id: "050", label: "0.50ct · single", priceDelta: 0 },
      { id: "pair", label: "0.50ct · matched pair", priceDelta: 138000 },
    ],
    isNew: true,
  },

  // ── 26 ───────────────────────────────────────────────────────────────
  {
    slug: "prospect-mens-diamond-pendant",
    name: "Prospect Men's Diamond Dog-Tag Pendant · 1.00ctw",
    collection: "Gentleman",
    category: "Pendants",
    metal: "18k White Gold",
    setting: "Pavé",
    gender: "Men",
    occasion: ["Gift for him", "Statement", "Everyday"],
    price: 465000,
    image: img("photo-1611652022419-a9419f74343d"),
    gallery: [
      img("photo-1611652022419-a9419f74343d"),
      img("photo-1573408301185-9146fe634ad0"),
      img("photo-1599643478518-a784e5dc4c8f"),
      img("photo-1598560917505-59a3ad559071"),
    ],
    shortDescription:
      "A solid 18k white-gold dog-tag pendant with a diagonal band of pavé diamonds — 1.00ctw, G–H / VS-SI — on a 60cm curb chain.",
    story:
      "Prospect is a substantial men's pendant: a solid brushed 18k white-gold dog tag, 42 × 26 mm, crossed by a diagonal channel of 40 pavé diamonds. Weighs 30 grams with the chain. Worn under or over the shirt; the brushed face hides scratches and the pavé line catches light when it moves.",
    diamond: {
      shape: "Round Brilliant (pavé)",
      carat: "1.00 ct total, 40 stones",
      colour: "G – H",
      clarity: "VS2 – SI1 (eye-clean)",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None – Faint",
      certification: "IGI pendant dossier",
    },
    specs: [
      { label: "Diamonds", value: "40 round brilliant, 1.00ct total, G–H / VS–SI" },
      { label: "Metal", value: "18k white gold, approx. 30 g with chain" },
      { label: "Pendant", value: "42 × 26 mm dog tag, brushed face" },
      { label: "Chain", value: "3 mm curb, 60 cm, box clasp" },
    ],
    priceBreakdown: [
      { label: "Diamonds (1.00ctw G–H / VS–SI)", value: "₹1,70,000" },
      { label: "18k white gold (30g) & labour", value: "₹2,81,400" },
      { label: "GST (3%)", value: "₹13,600" },
      { label: "Total (pendant + chain)", value: "₹4,65,000" },
    ],
    care: [
      "Bright-cut pavé is set in a protected channel — safe for daily wear.",
      "Re-brush the face and re-rhodium every 2–3 years (first service complimentary).",
      "Wipe the chain of skin oils; have jump-rings checked twice a year.",
    ],
    delivery: "Made to order · dispatched in 4 weeks · insured, signature on delivery",
    variants: [
      { id: "060", label: "0.60ctw pavé", priceDelta: -95000 },
      { id: "100", label: "1.00ctw pavé", priceDelta: 0 },
      { id: "150", label: "1.50ctw pavé", priceDelta: 138000 },
    ],
  },

  // ── 27 ───────────────────────────────────────────────────────────────
  {
    slug: "meridian-mens-diamond-chain",
    name: "Meridian Men's Diamond Station Chain · 3.00ctw",
    collection: "The Rivière",
    category: "Necklaces",
    metal: "18k Yellow Gold",
    setting: "Bezel",
    gender: "Men",
    occasion: ["Statement", "Gift for him", "Evening"],
    price: 1285000,
    image: img("photo-1599643478518-a784e5dc4c8f"),
    gallery: [
      img("photo-1599643478518-a784e5dc4c8f"),
      img("photo-1611652022419-a9419f74343d"),
      img("photo-1573408301185-9146fe634ad0"),
      img("photo-1602751584552-8ba73aad10e1"),
    ],
    shortDescription:
      "A heavy 18k yellow-gold franco chain with 15 bezel-set round brilliants — 3.00ctw, G–H / VS-SI — spaced as stations.",
    story:
      "Meridian is a men's station chain: a solid 5 mm 18k yellow-gold franco link, 55 cm, with fifteen round brilliants bezel-set flush into the chain at even intervals so they sit smooth against the collar. 48 grams of gold — a genuine statement piece that still wears comfortably every day.",
    diamond: {
      shape: "Round Brilliant (bezel-set stations)",
      carat: "3.00 ct total, 15 stones (0.20ct each)",
      colour: "G – H",
      clarity: "VS2 – SI1 (eye-clean)",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None – Faint",
      certification: "IGI chain dossier",
    },
    specs: [
      { label: "Diamonds", value: "15 round brilliant, 3.00ct total, G–H / VS–SI" },
      { label: "Metal", value: "18k yellow gold, approx. 48 g" },
      { label: "Chain", value: "5 mm franco link, 55 cm" },
      { label: "Clasp", value: "Box clasp with figure-eight safety" },
    ],
    priceBreakdown: [
      { label: "Diamonds (3.00ctw G–H / VS–SI)", value: "₹5,10,000" },
      { label: "18k yellow gold (48g) & labour", value: "₹7,37,600" },
      { label: "GST (3%)", value: "₹37,400" },
      { label: "Total", value: "₹12,85,000" },
    ],
    care: [
      "Bezel-set stations are flush and robust — safe for daily wear.",
      "Wipe down after wear; have the clasp checked yearly.",
      "Store flat, not coiled, to protect the franco links.",
    ],
    delivery: "Made to order to length · dispatched in 5 weeks · insured, signature required",
    variants: [
      { id: "200", label: "2.00ctw · 50 cm", priceDelta: -320000 },
      { id: "300", label: "3.00ctw · 55 cm", priceDelta: 0 },
      { id: "450", label: "4.50ctw · 60 cm", priceDelta: 465000 },
    ],
  },

  // ── 28 ───────────────────────────────────────────────────────────────
  {
    slug: "vanguard-mens-diamond-cuff",
    name: "Vanguard Men's Diamond Cuff Bracelet · 1.60ctw",
    collection: "Gentleman",
    category: "Bracelets",
    metal: "18k White Gold",
    setting: "Pavé",
    gender: "Men",
    occasion: ["Statement", "Gift for him", "Anniversary"],
    price: 640000,
    image: img("photo-1611085583191-a3b181a88401"),
    gallery: [
      img("photo-1611085583191-a3b181a88401"),
      img("photo-1573408301185-9146fe634ad0"),
      img("photo-1601121141461-9d6647bca1ed"),
      img("photo-1598560917505-59a3ad559071"),
    ],
    shortDescription:
      "An open, rigid 18k white-gold cuff, 10mm wide, with a channel of pavé diamonds — 1.60ctw, G–H / VS-SI — down the centre.",
    story:
      "Vanguard is a men's cuff with weight and restraint: a rigid, brushed 18k white-gold band, 10 mm wide, that slips on at the wrist's narrowest point and springs closed. A single bright-cut channel of pavé diamonds runs the length of the top; the brushed gold does the rest. 40 grams — it stays put and it feels like something.",
    diamond: {
      shape: "Round Brilliant (channel pavé)",
      carat: "1.60 ct total, 32 stones",
      colour: "G – H",
      clarity: "VS2 – SI1 (eye-clean)",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None – Faint",
      certification: "IGI cuff dossier",
    },
    specs: [
      { label: "Diamonds", value: "32 round brilliant, 1.60ct total, G–H / VS–SI" },
      { label: "Metal", value: "18k white gold, approx. 40 g" },
      { label: "Width", value: "10 mm, rigid open cuff" },
      { label: "Fit", value: "Sprung, made to a 55–65 mm inner measurement" },
    ],
    priceBreakdown: [
      { label: "Diamonds (1.60ctw G–H / VS–SI)", value: "₹2,72,000" },
      { label: "18k white gold (40g) & pavé labour", value: "₹3,49,300" },
      { label: "GST (3%)", value: "₹18,700" },
      { label: "Total", value: "₹6,40,000" },
    ],
    care: [
      "Open and close at the natural gap gently — do not over-flex the cuff.",
      "The pave sits in a protected channel; rinse and dry after wear.",
      "Re-brush and re-rhodium every 2–3 years (first service complimentary).",
    ],
    delivery: "Made to your wrist measurement · dispatched in 4 weeks · insured",
    variants: [
      { id: "100", label: "1.00ctw channel", priceDelta: -130000 },
      { id: "160", label: "1.60ctw channel", priceDelta: 0 },
      { id: "240", label: "2.40ctw channel", priceDelta: 210000 },
    ],
  },

  // ── 29 ───────────────────────────────────────────────────────────────
  {
    slug: "halcyon-mens-halo-ring",
    name: "Halcyon Men's Halo Diamond Ring · 1.15ctw",
    collection: "The Halo",
    category: "Rings",
    metal: "18k Yellow Gold",
    setting: "Halo",
    gender: "Men",
    occasion: ["Statement", "Anniversary", "Gift for him"],
    price: 398000,
    image: img("photo-1603561591411-07134e71a2a9"),
    gallery: [
      img("photo-1603561591411-07134e71a2a9"),
      img("photo-1611591437281-460bfbe1220a"),
      img("photo-1596944924616-7b38e7cfac36"),
      img("photo-1601121141461-9d6647bca1ed"),
    ],
    shortDescription:
      "A 0.50ct round brilliant centre in a square halo of pavé, set into a bold 18k yellow-gold band — 1.15ctw total.",
    story:
      "Halcyon frames a 0.50ct round-brilliant centre in a square (cushion-outline) halo of 24 pavé diamonds, then mounts the whole head low and flush into a heavy 8 mm 18k yellow-gold band. The square halo squares off the round centre and pushes the visual size up to roughly a carat. A men's ring for someone who wants the diamond to be seen.",
    diamond: {
      shape: "Round Brilliant centre + square pavé halo",
      carat: "0.50 ct centre + 0.65 ctw halo = 1.15 ctw",
      colour: "G – H",
      clarity: "VS2 – SI1",
      cut: "Very Good",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None",
      certification: "IGI (centre) + in-house pavé grading",
    },
    specs: [
      { label: "Centre stone", value: "0.50ct round brilliant, G / VS2" },
      { label: "Halo", value: "24 pavé diamonds, 0.65ct total" },
      { label: "Metal", value: "18k yellow gold, approx. 13 g" },
      { label: "Band width", value: "8.0 mm, comfort-fit" },
    ],
    priceBreakdown: [
      { label: "Centre + halo diamonds (1.15ctw)", value: "₹1,95,000" },
      { label: "18k yellow gold (13g) & labour", value: "₹1,91,400" },
      { label: "GST (3%)", value: "₹11,600" },
      { label: "Total", value: "₹3,98,000" },
    ],
    care: [
      "Avoid knocks to the halo edge — bright-cut beads are the weak point.",
      "Clean weekly and check the pavé under a loupe at your annual service.",
      "Yellow gold keeps its colour and needs no re-plating.",
    ],
    delivery: "Made to order in your size · dispatched in 4 weeks · insured",
    variants: [
      { id: "080", label: "0.80ctw total", priceDelta: -85000 },
      { id: "115", label: "1.15ctw total", priceDelta: 0 },
      { id: "170", label: "1.70ctw total", priceDelta: 165000 },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.collection === current.collection ? 3 : 0) +
        (p.category === current.category ? 2 : 0) +
        (p.setting === current.setting ? 1 : 0) +
        (p.gender === current.gender ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
}

export const collectionsList = [...new Set(products.map((p) => p.collection))];
export const categoriesList = [...new Set(products.map((p) => p.category))];
export const settingsList = [...new Set(products.map((p) => p.setting))];
export const metalsList = [...new Set(products.map((p) => p.metal))];
export const gendersList = [...new Set(products.map((p) => p.gender))];
