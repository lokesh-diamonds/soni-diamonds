import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import { products } from "@/data/products";

const featured = products.filter((p) => p.isFeatured).slice(0, 6);

const collections = [
  {
    name: "The Solitaire",
    blurb: "One certified centre diamond, 1–5ct. Round, cushion, emerald and pear cuts.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1100&q=80",
    href: "/shop?collection=The%20Solitaire",
  },
  {
    name: "The Halo",
    blurb: "A pavé halo that lifts the centre stone by half a carat of presence.",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1100&q=80",
    href: "/shop?collection=The%20Halo",
  },
  {
    name: "The Three Stone",
    blurb: "Past, present, future — a centre diamond framed by two matched stones.",
    image:
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1100&q=80",
    href: "/shop?collection=The%20Three%20Stone",
  },
  {
    name: "The Rivière",
    blurb: "Tennis necklaces, bracelets and bangles — an unbroken line of brilliants.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=80",
    href: "/shop?collection=The%20Rivi%C3%A8re",
  },
  {
    name: "Everyday Brilliance",
    blurb: "Diamond studs, hoops and pendants in 18k gold and platinum. The pieces you never remove.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=80",
    href: "/shop?collection=Everyday%20Brilliance",
  },
  {
    name: "Bridal Sets",
    blurb: "Necklace sets, pendant sets and diamond mangalsutras for the Indian wedding.",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1100&q=80",
    href: "/shop?collection=Bridal%20Sets",
  },
  {
    name: "Gentleman",
    blurb: "Men's diamond bands, pavé wedding rings and bold curb-link bracelets.",
    image:
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1100&q=80",
    href: "/shop?for=Men",
  },
];

const fourCs = [
  {
    c: "Cut",
    d: "The one C shaped entirely by human hands. We select only Excellent / Ideal cut grades — the proportions that return the most light to the eye.",
  },
  {
    c: "Colour",
    d: "Graded D to Z. Our solitaires are D–F (colourless to near-colourless); accent stones F–G. The whiter the diamond, the rarer it is.",
  },
  {
    c: "Clarity",
    d: "From Flawless to Included. We work in VVS and VS — inclusions invisible to the naked eye, so the diamond reads perfectly clean.",
  },
  {
    c: "Carat",
    d: "Weight, not size. Two diamonds of equal carat can look very different — which is why cut is chosen first, weight second.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      {/* Marquee */}
      <div className="border-y border-line-soft bg-gold/5 py-4 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap gap-16 text-[0.7rem] uppercase tracking-[0.32em] text-gold">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-16">
              <span className="font-semibold text-bone">Flat Making Charges: ₹850 / Gram</span>
              <span>·</span>
              <span>Certified &amp; Non-Certified Diamonds</span>
              <span>·</span>
              <span>GIA, IGI &amp; SGL Grading</span>
              <span>·</span>
              <span>Direct Manufacturer &amp; Wholesaler</span>
              <span>·</span>
              <span>Surat · Katargam · Mahidharpura</span>
              <span>·</span>
              <span>Lifetime Diamond Upgrade Guarantee</span>
              <span>·</span>

              <span>Bespoke Diamond Commissions</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured pieces */}
      <section className="container-luxe py-20 md:py-28">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected Diamonds</p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl text-bone">
              This season&rsquo;s brilliance
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-block link-underline text-[0.7rem] uppercase tracking-[0.24em] text-bone-dim"
          >
            View All
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* The 4Cs — with rotating diamond motif */}
      <section className="relative overflow-hidden border-y border-line-soft bg-ink-soft py-20 md:py-28">
        {/* Rotating diamond motif */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.12]"
        >
          <svg
            width="440"
            height="440"
            viewBox="0 0 100 100"
            className="animate-spin-slow"
          >
            <g fill="none" stroke="var(--color-gold)" strokeWidth="0.6">
              <path d="M20 38 L50 8 L80 38 L50 92 Z" />
              <path d="M20 38 L80 38" />
              <path d="M50 8 L35 38 L50 92" />
              <path d="M50 8 L65 38 L50 92" />
              <path d="M35 38 L65 38" />
              <path d="M20 38 L35 38 M80 38 L65 38" />
            </g>
          </svg>
        </div>

        <div className="container-luxe relative">
          <Reveal>
            <p className="eyebrow">How We Choose a Diamond</p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl text-bone">
              The Four Cs, our way
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-bone-dim">
              Every Soni Diamonds stone is independently graded by GIA or IGI
              before it is set. Here is what we insist on, and why.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {fourCs.map((item, i) => (
              <Reveal key={item.c} delay={i * 80}>
                <div className="border-t border-line pt-6">
                  <p className="font-serif text-4xl text-gold-gradient">
                    {item.c[0]}
                  </p>
                  <h3 className="mt-3 font-serif text-xl text-bone">{item.c}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link href="/size-guide" className="btn-ghost mt-12">
              Read the Full Diamond Guide
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Collections */}
      <section className="container-luxe py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">The Collections</p>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-bone">
            Seven ways to wear a diamond
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.name} delay={i * 90}>
              <Link href={c.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3 className="font-serif text-2xl text-bone">{c.name}</h3>
                    <p className="mt-2 text-sm text-bone-dim">{c.blurb}</p>
                    <span className="mt-4 inline-block link-underline text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                      Discover
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Engagement banner */}
      <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=80"
          alt="A platinum solitaire engagement ring"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="container-luxe relative flex h-full flex-col items-start justify-center">
          <Reveal>
            <p className="eyebrow">Engagement</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-6xl leading-[1.05] text-bone">
              The ring is forever.
              <br />
              <span className="text-gold-gradient">Choose the diamond first.</span>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-bone-dim">
              Book a private consultation and we will lay out loose certified
              stones for you to compare under proper light, then build the ring
              around the one you choose.
            </p>
            <Link href="/contact?subject=appointment" className="btn-gold mt-9">
              Book a Diamond Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The House */}
      <section id="house" className="container-luxe py-20 md:py-32">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=80"
                alt="A diamond setter at the bench"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src="/images/logo-transparent.png"
                  alt="Soni Diamonds Logo"
                  fill
                  className="object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                />
              </div>
              <p className="eyebrow">The House of Soni</p>
            </div>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl leading-tight text-bone">
              Surat&rsquo;s premier diamond atelier.
            </h2>
            <p className="mt-6 leading-relaxed text-bone-dim">
              Soni Diamonds is led by Lokesh Soni, a third-generation diamantaire based at LB Char Rasta, Mahidharpura in Surat&rsquo;s world-famous diamond manufacturing hub. Every stone carrying our mark is hand-selected at source, independently certified, and meticulously mounted in our workshop.
            </p>
            <p className="mt-4 leading-relaxed text-bone-dim">
              We operate with complete pricing transparency — charging flat making charges of just <span className="text-gold font-semibold">₹850 per gram</span> across all custom 18K/14K gold diamond jewellery. Direct consultations are available with Lokesh Soni by appointment.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link href="/contact?subject=appointment" className="btn-gold">
                Book an Appointment
              </Link>
              <Link href="/contact" className="btn-ghost">
                See Contact Details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-line-soft bg-ink-soft">
        <div className="container-luxe py-16 md:py-20 text-center">
          <Reveal>
            <p className="eyebrow">Correspondence</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
              New diamonds, private viewings, before anyone else
            </h2>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="field"
                aria-label="Email address"
              />
              <button type="submit" className="btn-gold whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs text-bone-faint">
              We correspond rarely. Read our{" "}
              <Link href="/privacy-policy" className="link-underline text-bone-dim">
                Privacy Policy
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
