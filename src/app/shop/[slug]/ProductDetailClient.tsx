"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [added, setAdded] = useState(false);

  // Hover-zoom on the main image
  const ZOOM = 2.4;
  const [zoom, setZoom] = useState<{ x: number; y: number; on: boolean }>({
    x: 50,
    y: 50,
    on: false,
  });
  const frameRef = useRef<HTMLDivElement>(null);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const price = product.price + (variant?.priceDelta ?? 0);

  function onZoomMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setZoom({ x, y, on: true });
  }

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      collection: product.collection,
      image: product.image,
      variantId: variant?.id ?? "default",
      variantLabel: variant?.label ?? "Standard",
      unitPrice: price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2600);
  }

  return (
    <section className="container-luxe pt-10 pb-20 md:pb-24">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Gallery + hover zoom */}
        <div>
          <div
            ref={frameRef}
            onMouseEnter={() => setZoom((z) => ({ ...z, on: true }))}
            onMouseMove={onZoomMove}
            onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
            className="group relative aspect-[4/5] overflow-hidden bg-ink-panel md:cursor-zoom-in"
          >
            <Image
              src={activeImage}
              alt={`${product.name} — ${product.diamond.carat} ${product.diamond.shape} diamond in ${product.metal}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-200 ease-out will-change-transform"
              style={{
                transform: zoom.on ? `scale(${ZOOM})` : "scale(1)",
                transformOrigin: `${zoom.x}% ${zoom.y}%`,
              }}
            />
            {/* hint pill */}
            <span className="pointer-events-none absolute right-4 top-4 hidden rounded-full border border-gold/50 bg-ink/80 px-3 py-1 text-[0.6rem] uppercase tracking-[0.24em] text-gold backdrop-blur transition-opacity duration-300 md:block group-hover:opacity-0">
              Hover to zoom
            </span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.gallery.map((src) => (
              <button
                key={src}
                type="button"
                onMouseEnter={() => setActiveImage(src)}
                onClick={() => setActiveImage(src)}
                className={`relative aspect-square overflow-hidden border transition-colors ${
                  activeImage === src
                    ? "border-gold"
                    : "border-line-soft hover:border-bone-faint"
                }`}
                aria-label="View image"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Purchase panel */}
        <div className="md:pt-4">
          <p className="eyebrow">{product.collection}</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl leading-tight text-bone">
            {product.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-bone-dim">
            {product.shortDescription}
          </p>

          {/* Quick diamond summary */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              product.diamond.shape.split("(")[0].trim(),
              product.diamond.carat.split(",")[0],
              product.diamond.colour.split("(")[0].trim(),
              product.diamond.clarity,
              product.diamond.cut,
            ].map((chip) => (
              <span
                key={chip}
                className="border border-line px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-bone-dim"
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="mt-8 font-serif text-3xl text-gold-gradient">
            {formatPrice(price)}
          </p>
          <p className="mt-1 text-xs text-bone-faint">
            Inclusive of 3% GST. Diamond grading report included.
          </p>

          {product.variants.length > 0 && (
            <div className="mt-10">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                {product.category === "Rings"
                  ? "Centre diamond / Option"
                  : "Diamond weight / Option"}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.variants.map((v) => {
                  const vPrice = product.price + v.priceDelta;
                  const isActive = v.id === variantId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setVariantId(v.id)}
                      className={`border px-4 py-3 text-left transition-colors ${
                        isActive
                          ? "border-gold bg-gold/10"
                          : "border-line hover:border-bone-faint"
                      }`}
                    >
                      <span className="block text-sm text-bone">{v.label}</span>
                      <span className="block text-[0.7rem] text-bone-faint">
                        {formatPrice(vPrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-3">
            <button onClick={handleAdd} className="btn-gold w-full">
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <Link
              href="/contact?subject=appointment"
              className="btn-ghost w-full"
            >
              Request a Private Viewing
            </Link>
          </div>

          <ul className="mt-10 space-y-3 border-t border-line-soft pt-8 text-sm text-bone-dim">
            <li className="flex gap-3">
              <span className="text-gold">—</span> GIA / IGI diamond grading
              report included &amp; registered to you
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span> Set to order in 4–6 weeks
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span> Complimentary insured shipping
              across India &amp; worldwide
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span> Lifetime guarantee, free first
              resizing &amp; annual clean
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span>{" "}
              <Link href="/size-guide" className="link-underline">
                Consult the diamond &amp; size guide
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-ink/95 backdrop-blur p-4 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-bone-faint">{variant?.label}</p>
            <p className="font-serif text-lg text-gold-gradient">
              {formatPrice(price)}
            </p>
          </div>
          <button onClick={handleAdd} className="btn-gold flex-1 max-w-[220px]">
            {added ? "Added ✓" : "Add to Bag"}
          </button>
        </div>
      </div>
    </section>
  );
}
