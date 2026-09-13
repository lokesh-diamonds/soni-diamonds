"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

const SHIPPING = 0;

export default function BagClient() {
  const { items, subtotal, setQuantity, removeItem, count } = useCart();
  const estimatedTax = Math.round(subtotal * 0.03); // GST 3% on gold & diamond jewellery
  const total = subtotal + SHIPPING + estimatedTax;

  return (
    <section className="container-luxe pt-16 pb-28 md:pt-24">
      <Reveal>
        <p className="eyebrow">Shopping Bag</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl text-bone">
          Your selection
        </h1>
        <p className="mt-5 text-bone-dim">
          {count === 0
            ? "Your bag is currently empty."
            : `${count} piece${count === 1 ? "" : "s"} reserved in the workshop queue.`}
        </p>
      </Reveal>

      <div className="hairline mt-10" />

      {items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-bone">Nothing here yet.</p>
          <p className="mt-3 text-bone-faint">
            Every piece is set to order around a certified diamond. Begin with
            the collection.
          </p>
          <Link href="/shop" className="btn-gold mt-8">
            Explore the Diamonds
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_380px]">
          {/* Line items */}
          <ul className="divide-y divide-line-soft border-y border-line-soft">
            {items.map((item, i) => (
              <Reveal
                as="li"
                key={`${item.slug}-${item.variantId}`}
                delay={i * 70}
              >
                <div className="flex gap-6 py-8">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="relative h-32 w-28 shrink-0 overflow-hidden bg-ink-panel"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="eyebrow">{item.collection}</p>
                        <Link
                          href={`/shop/${item.slug}`}
                          className="mt-1 block font-serif text-xl text-bone link-underline"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-bone-faint">
                          {item.variantLabel}
                        </p>
                      </div>
                      <p className="font-serif text-lg text-gold-gradient whitespace-nowrap">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-5">
                      <div className="flex items-center border border-line">
                        <button
                          onClick={() =>
                            setQuantity(
                              item.slug,
                              item.variantId,
                              item.quantity - 1
                            )
                          }
                          className="h-9 w-9 text-bone-dim hover:text-gold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className="w-10 text-center text-sm text-bone">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(
                              item.slug,
                              item.variantId,
                              item.quantity + 1
                            )
                          }
                          className="h-9 w-9 text-bone-dim hover:text-gold transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug, item.variantId)}
                        className="text-[0.65rem] uppercase tracking-[0.2em] text-bone-faint hover:text-gold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Sticky summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-line-soft bg-ink-soft p-8">
              <p className="eyebrow">Order Summary</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-bone-dim">Subtotal</dt>
                  <dd className="text-bone">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-bone-dim">Insured Shipping</dt>
                  <dd className="text-bone">Complimentary</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-bone-dim">GST (3%)</dt>
                  <dd className="text-bone">{formatPrice(estimatedTax)}</dd>
                </div>
                <div className="hairline my-2" />
                <div className="flex justify-between text-base">
                  <dt className="font-serif text-bone">Total</dt>
                  <dd className="font-serif text-gold-gradient">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              <Link href="/checkout" className="btn-gold mt-8 w-full">
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="mt-4 block text-center link-underline text-[0.7rem] uppercase tracking-[0.2em] text-bone-dim"
              >
                Continue Browsing
              </Link>

              <p className="mt-8 text-xs leading-relaxed text-bone-faint">
                Made-to-order pieces enter production once payment is confirmed.
                See our{" "}
                <Link href="/shipping-returns" className="link-underline">
                  Shipping &amp; Returns
                </Link>{" "}
                policy.
              </p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
