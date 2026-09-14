# Soni Diamonds — Fine Diamond Jewellery

A luxury, diamond-focused e-commerce site built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS v4**.

Dark minimal aesthetic · champagne-gold accents · editorial typography (Cormorant Garamond + Jost).

Led by **Lokesh Soni** — diamond jewellery manufacturer, wholesaler & retailer in **Surat (Katargam / Mahidharpura)**. Trades in certified and non-certified diamonds at **flat making charges of ₹850 per gram**.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Contact details wired into the site

| | Phone | Email | Making Charges |
| --- | --- | --- | --- |
| Lokesh Soni (Soni Diamonds) | +91 93098 52270 | lokesh@sonidiamonds.in | Flat ₹850 / gram |

Location shown site-wide is **Surat · Katargam · Mahidharpura**; the exact street/door number is deliberately withheld ("shared on appointment").

The scanned **visiting card** (`public/images/visiting-card.jpeg`) is processed without background and shown view-only in the footer and modal.

## New Major Features

1. **AI Chatbot**: Floating AI assistant in the bottom-right corner, embedded with Soni Diamonds Knowledge Base.
2. **Live Rate Calculator**: Interactive real-time gold (18K, 14K, 22K) & diamond calculator on the Size Guide page and chatbot header with flat ₹850/g making charges.
3. **Surat Live Rate Puller**: Live ticker in the footer pulling 18K/14K gold and diamond rates specifically for Surat via `/api/rates`.
4. **Location Detection**: Auto-detects or prompts user location to personalize gold and diamond rates on landing.
5. **Email Inquiry Integration**: Contact form submissions are dispatched via `/api/contact` straight to `lokesh@sonidiamonds.in`.


## Screens

| Route | Screen |
| --- | --- |
| `/` | Home — **rotating hero carousel** (4 diamond slides, auto-advancing, Ken Burns drift, animated progress bars, crossfading copy), marquee, featured diamonds, **the Four Cs** section with a slowly-rotating diamond motif, seven collections, engagement banner, "The House of Soni", newsletter |
| `/shop` | Shop / Diamond Collections — sticky filter sidebar (Collection / Category / **For** (Women/Men) / **Diamond Setting** / Metal / **Price band**), multi-select, sort, staggered grid. Reads `?collection=`, `?for=Men`, `?filter=new` |
| `/shop/[slug]` | Product detail — image magnifier, diamond spec chips, variant selector with live price, **full 4C / certification spec table**, story, craftsmanship specs, **line-item price breakdown**, **care instructions**, **delivery estimate**, occasion tags, India-based reviews, related pieces, mobile sticky CTA |
| `/bag` | Shopping Bag — line items, quantity steppers, sticky summary (GST 3%, INR) |
| `/checkout` | Secure Checkout — 4-step flow, animated progress, fixed order summary, `SD-` order reference, India-first country list |
| `/size-guide` | Diamond & Size Guide — **the Four Cs explained**, carat-to-millimetre table, ring/necklace/bracelet conversion tabs, measuring guides, Size Finder quiz |
| `/shipping-returns` | Shipping & Returns — regional delivery table (India-first), diamond upgrade credit, FAQ accordion |
| `/privacy-policy` | Privacy Policy — sticky TOC + scroll-spy, DPDP Act 2023 reference |
| `/terms-of-service` | Terms of Service — sticky TOC, dedicated **Diamonds & Certification** clause, INR/GST pricing, India governing law |
| `/contact` | Contact — validated form ("Speak with Akshar / Lokesh"), direct phone + email for both brothers, Surat "Office" card, diamond-focused FAQ |
| `*` (not found) | 404 — "This stone has been mislaid" |

## Data & money

- **Products** — `src/data/products.ts`: **20 fully-detailed diamond pieces** across 7 collections (The Solitaire, The Halo, The Three Stone, The Rivière, Everyday Brilliance, Gentleman, Bridal Sets) and 6 categories (Rings, Necklaces, Earrings, Bracelets, Bangles, Pendants), for Women and Men. Every product carries:
  - a full `diamond` object — shape, carat, colour, clarity, cut, polish, symmetry, fluorescence, certification
  - `specs` (measurements, metal weight, setting, band width, …)
  - `priceBreakdown` — line items (diamond value / metal & labour / GST / total) with real-world INR figures
  - `care` instructions, a `delivery` estimate, `occasion` tags, `gender`
  - carat/option `variants` with live price deltas
  - Helpers exported: `getProduct`, `relatedProducts`, and `collectionsList` / `categoriesList` / `settingsList` / `metalsList` / `gendersList`.
- **Currency** — Indian Rupees (`en-IN` / `INR`), prices shown inclusive of **3% GST**. Figures are indicative Surat / Mumbai wholesale-to-retail prices.
- **Cart** persists to `localStorage` (`lumiere.cart.v1`). Checkout is a UI demo — no real payment processing.

## Motion

- Hero carousel auto-advances every 6s with a slow Ken Burns zoom on the active slide, crossfading images, staggered copy entrance, and per-slide progress bars (click a bar to jump).
- Rotating SVG diamond motif behind the Four Cs section.
- Footer visiting card auto-scrolls horizontally (`animate-card-scroll`, two-copy `-50%` loop), pausing on hover.
- Scroll-reveal on section content via `src/components/Reveal.tsx` (IntersectionObserver).
- All of the above respect `prefers-reduced-motion`.

## Images

Placeholder photography is served from `images.unsplash.com` (allow-listed in `next.config.ts`). Replace the URLs in `src/data/products.ts` (`image`, `gallery`) and in `src/app/page.tsx` / `src/components/HeroCarousel.tsx` with your own diamond and jewellery photography — ideally files under `public/images/` referenced as `/images/...`.

## Project structure

```
src/
  app/
    layout.tsx            Root layout — fonts, header, footer, CartProvider
    page.tsx              Home (uses HeroCarousel)
    globals.css           Design tokens + animations (kenburns, progress, spin, float, sparkle)
    not-found.tsx  loading.tsx  error.tsx  sitemap.ts
    shop/                 Shop + [slug] product detail (+ ProductDetailClient)
    bag/ checkout/        Cart + checkout (client components)
    size-guide/ contact/  Interactive client screens
    privacy-policy/ terms-of-service/ shipping-returns/
  components/
    Header.tsx  Footer.tsx  (brothers' phone/email in the footer)
    HeroCarousel.tsx      Rotating diamond hero
    ProductCard.tsx  PageHero.tsx  Reveal.tsx  LegalLayout.tsx
  data/
    products.ts          20 diamond products (full detail) + helpers + facet lists
    site.ts              Brand constants, nav, footer nav, Soni contacts, Surat location
  lib/
    cart-context.tsx     localStorage-backed cart
    format.ts            INR currency formatting
```
