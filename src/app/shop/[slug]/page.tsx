import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { products, getProduct, relatedProducts } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: `${product.shortDescription} From ₹${product.price.toLocaleString("en-IN")}, inclusive of GST. ${product.collection} · Soni Diamonds, Surat.`,
    openGraph: {
      title: `${product.name} | Soni Diamonds`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product.slug);

  return (
    <>
      <nav className="container-luxe pt-10 text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
        <Link href="/shop" className="link-underline">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/shop?collection=${encodeURIComponent(product.collection)}`}
          className="link-underline"
        >
          {product.collection}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-bone-dim">{product.name}</span>
      </nav>

      <ProductDetailClient product={product} />

      {/* Diamond specification — the 4Cs */}
      <section className="border-t border-line-soft bg-ink-soft py-20 md:py-28">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow">The Diamond</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
              Certified. Graded. Traceable.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">
              This piece is built around the diamond below. Its grading report
              travels with the piece and is registered to you on delivery.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Shape / Cut style", product.diamond.shape],
                ["Carat weight", product.diamond.carat],
                ["Colour", product.diamond.colour],
                ["Clarity", product.diamond.clarity],
                ["Cut grade", product.diamond.cut],
                ["Polish", product.diamond.polish],
                ["Symmetry", product.diamond.symmetry],
                ["Fluorescence", product.diamond.fluorescence],
                ["Certification", product.diamond.certification],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-line pt-4">
                  <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-bone-faint">
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-bone">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Story + craftsmanship specs */}
      <section className="border-t border-line-soft py-20 md:py-28">
        <div className="container-luxe grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <Reveal>
            <p className="eyebrow">The Story</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
              Why {product.name.split(" ")[0]}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg leading-relaxed text-bone-dim">
              {product.story}
            </p>
            <dl className="mt-10 divide-y divide-line-soft border-y border-line-soft">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-[140px_1fr] gap-4 py-4 text-sm"
                >
                  <dt className="uppercase tracking-[0.16em] text-[0.7rem] text-bone-faint">
                    {spec.label}
                  </dt>
                  <dd className="text-bone-dim">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Price breakdown + care + delivery */}
      <section className="border-t border-line-soft bg-ink-soft py-20 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-3">
          <Reveal>
            <p className="eyebrow">What You Pay For</p>
            <h3 className="mt-3 font-serif text-2xl text-bone">Price breakdown</h3>
            <dl className="mt-6 divide-y divide-line-soft border-y border-line-soft">
              {product.priceBreakdown.map((line, i) => {
                const isTotal = i === product.priceBreakdown.length - 1;
                return (
                  <div
                    key={line.label}
                    className={`flex items-baseline justify-between gap-4 py-3.5 text-sm ${
                      isTotal ? "text-bone font-medium" : "text-bone-dim"
                    }`}
                  >
                    <dt className={isTotal ? "font-serif text-base" : ""}>
                      {line.label}
                    </dt>
                    <dd
                      className={
                        isTotal
                          ? "font-serif text-base text-gold-gradient whitespace-nowrap"
                          : "whitespace-nowrap"
                      }
                    >
                      {line.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-bone-faint">
              Prices move with prevailing gold rates and diamond prices. A firm
              quote is locked for 7 days from your enquiry.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow">Keeping It Well</p>
            <h3 className="mt-3 font-serif text-2xl text-bone">Care</h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-bone-dim">
              {product.care.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="text-gold">—</span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <p className="eyebrow">Getting It To You</p>
            <h3 className="mt-3 font-serif text-2xl text-bone">Delivery</h3>
            <p className="mt-6 text-sm leading-relaxed text-bone-dim">
              {product.delivery}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-bone-dim">
              <li className="flex gap-3">
                <span className="text-gold">—</span> GIA / IGI report registered
                in your name on delivery
              </li>
              <li className="flex gap-3">
                <span className="text-gold">—</span> Lifetime diamond upgrade
                credit
              </li>
              <li className="flex gap-3">
                <span className="text-gold">—</span> Complimentary first resize
                &amp; annual clean
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {product.occasion.map((o) => (
                <Link
                  key={o}
                  href={`/shop?collection=${encodeURIComponent(product.collection)}`}
                  className="border border-line px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-bone-faint hover:border-gold hover:text-gold transition-colors"
                >
                  {o}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-luxe py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">Client Notes</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
            In their words
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Karan & Meera",
              city: "Ahmedabad",
              text: "We wanted a specific F colour, VS1 emerald cut. Lokesh sourced it in ten days and set it beautifully. The certificate came registered in our name.",
            },
            {
              name: "Ananya R.",
              city: "Mumbai",
              text: "Lokesh showed me four loose stones side by side before I chose. The GIA report matched exactly what he told me across the counter.",
            },
            {
              name: "Priya M.",
              city: "Bengaluru",
              text: "I wear the studs every day and they have not dulled once. The pair is perfectly matched — you cannot tell left from right.",
            },
          ].map((review, i) => (
            <Reveal key={review.name} delay={i * 90}>
              <figure className="border border-line-soft p-8 h-full">
                <div className="text-gold text-sm tracking-[0.3em]">★★★★★</div>
                <blockquote className="mt-5 font-serif text-lg leading-relaxed text-bone">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                  {review.name} — {review.city}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="container-luxe pb-28">
        <Reveal>
          <p className="eyebrow">You May Also Consider</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
            From the same hand
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
