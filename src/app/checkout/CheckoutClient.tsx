"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";

export default function CheckoutClient() {
  const { items, subtotal, count } = useCart();
  const tax = Math.round(subtotal * 0.03); // GST 3% on gold & diamond jewellery
  const total = subtotal + tax;

  return (
    <section className="container-luxe pt-14 pb-28 md:pt-20">
      <div className="flex items-center justify-between">
        <Link
          href="/bag"
          className="link-underline text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint"
        >
          ← Return to Bag
        </Link>
      </div>

      <Reveal>
        <div className="mx-auto mt-10 max-w-xl text-center">
          <p className="eyebrow">Online Checkout</p>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl text-bone">
            Coming Soon
          </h1>
          <p className="mt-6 leading-relaxed text-bone-dim">
            Secure online payment is being finished and will open shortly.
            In the meantime, Lokesh Soni will happily complete your order
            directly over phone or WhatsApp — every diamond is set to order,
            so this personal step ensures your exact stone and sizing are
            confirmed before anything is made.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="btn-gold">
              Call {site.phone}
            </a>
            <Link href="/contact?subject=appointment" className="btn-ghost">
              Message Us
            </Link>
          </div>
        </div>
      </Reveal>

      {count > 0 && (
        <Reveal delay={100}>
          <div className="mx-auto mt-16 max-w-xl border border-line-soft bg-ink-soft p-8">
            <p className="eyebrow">Your Bag, Ready to Quote</p>
            <ul className="mt-6 space-y-5">
              {items.map((item) => (
                <li key={`${item.slug}-${item.variantId}`} className="flex gap-4">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-ink-panel">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 justify-between gap-3 text-sm">
                    <div>
                      <p className="text-bone">{item.name}</p>
                      <p className="text-xs text-bone-faint">
                        {item.variantLabel} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-bone whitespace-nowrap">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hairline my-6" />

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-bone-dim">Subtotal</dt>
                <dd className="text-bone">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-bone-dim">GST (3%)</dt>
                <dd className="text-bone">{formatPrice(tax)}</dd>
              </div>
              <div className="hairline my-1" />
              <div className="flex justify-between text-base">
                <dt className="font-serif text-bone">Estimated Total</dt>
                <dd className="font-serif text-gold-gradient">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-xs leading-relaxed text-bone-faint">
              Mention these pieces when you call or message us and we&rsquo;ll
              confirm final pricing against the day&rsquo;s gold rate.
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}
