"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

const steps = ["Contact", "Shipping", "Payment", "Review"] as const;
type Step = (typeof steps)[number];

export default function CheckoutClient() {
  const { items, subtotal, count, clear } = useCart();
  const [stepIndex, setStepIndex] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const tax = Math.round(subtotal * 0.03); // GST 3% on gold & diamond jewellery
  const total = subtotal + tax;
  const current: Step = steps[stepIndex];

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function next() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function placeOrder() {
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <section className="container-luxe py-32 text-center">
        <p className="eyebrow">Order Confirmed</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl text-bone">
          Thank you.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-bone-dim">
          A confirmation is on its way to {form.email || "your inbox"}. Your
          piece now enters the workshop queue — we will write to you at each
          stage of its making.
        </p>
        <p className="mt-3 text-sm text-bone-faint">
          Order reference — SD-{Math.floor(100000 + Math.random() * 899999)}
        </p>
        <Link href="/shop" className="btn-gold mt-10">
          Return to the Diamonds
        </Link>
      </section>
    );
  }

  if (count === 0) {
    return (
      <section className="container-luxe py-32 text-center">
        <h1 className="font-serif text-3xl text-bone">Your bag is empty</h1>
        <p className="mt-3 text-bone-faint">
          Add a piece before proceeding to checkout.
        </p>
        <Link href="/shop" className="btn-gold mt-8">
          Explore the Diamonds
        </Link>
      </section>
    );
  }

  return (
    <section className="container-luxe pt-14 pb-28 md:pt-20">
      <div className="flex items-center justify-between">
        <Link
          href="/bag"
          className="link-underline text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint"
        >
          ← Return to Bag
        </Link>
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
          Secure · Encrypted
        </p>
      </div>

      <h1 className="mt-6 font-serif text-4xl md:text-5xl text-bone">
        Checkout
      </h1>

      {/* Progress */}
      <ol className="mt-10 flex items-center gap-2">
        {steps.map((s, i) => {
          const state =
            i < stepIndex ? "done" : i === stepIndex ? "active" : "upcoming";
          return (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs transition-colors ${
                  state === "done"
                    ? "border-gold bg-gold text-ink"
                    : state === "active"
                      ? "border-gold text-gold"
                      : "border-line text-bone-faint"
                }`}
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              <span
                className={`hidden sm:block text-[0.65rem] uppercase tracking-[0.2em] ${
                  state === "upcoming" ? "text-bone-faint" : "text-bone"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={`h-px flex-1 ${
                    i < stepIndex ? "bg-gold" : "bg-line"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div className="min-h-[380px]">
          <div key={current} className="reveal is-visible">
            {current === "Contact" && (
              <fieldset className="space-y-5">
                <legend className="font-serif text-2xl text-bone mb-2">
                  Contact details
                </legend>
                <Field
                  label="Email address"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  type="email"
                  placeholder="you@example.com"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="First name"
                    value={form.firstName}
                    onChange={(v) => set("firstName", v)}
                  />
                  <Field
                    label="Last name"
                    value={form.lastName}
                    onChange={(v) => set("lastName", v)}
                  />
                </div>
              </fieldset>
            )}

            {current === "Shipping" && (
              <fieldset className="space-y-5">
                <legend className="font-serif text-2xl text-bone mb-2">
                  Shipping address
                </legend>
                <Field
                  label="Street address"
                  value={form.address}
                  onChange={(v) => set("address", v)}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="City"
                    value={form.city}
                    onChange={(v) => set("city", v)}
                  />
                  <Field
                    label="Postal code"
                    value={form.postalCode}
                    onChange={(v) => set("postalCode", v)}
                  />
                </div>
                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                    Country
                  </span>
                  <select
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className="field mt-2"
                  >
                    {["India", "United Arab Emirates", "United Kingdom", "United States", "Singapore", "Australia"].map(
                      (c) => (
                        <option key={c}>{c}</option>
                      )
                    )}
                  </select>
                </label>
              </fieldset>
            )}

            {current === "Payment" && (
              <fieldset className="space-y-5">
                <legend className="font-serif text-2xl text-bone mb-2">
                  Payment
                </legend>
                <p className="text-sm text-bone-faint">
                  This is a demonstration checkout. Do not enter real card
                  details.
                </p>
                <Field
                  label="Name on card"
                  value={form.cardName}
                  onChange={(v) => set("cardName", v)}
                />
                <Field
                  label="Card number"
                  value={form.cardNumber}
                  onChange={(v) => set("cardNumber", v)}
                  placeholder="0000 0000 0000 0000"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Expiry"
                    value={form.expiry}
                    onChange={(v) => set("expiry", v)}
                    placeholder="MM / YY"
                  />
                  <Field
                    label="CVC"
                    value={form.cvc}
                    onChange={(v) => set("cvc", v)}
                    placeholder="123"
                  />
                </div>
              </fieldset>
            )}

            {current === "Review" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-bone">Review order</h2>
                <div className="grid gap-4 border border-line-soft p-6 text-sm">
                  <Row label="Contact" value={form.email || "—"} />
                  <Row
                    label="Ship to"
                    value={
                      [form.address, form.city, form.postalCode, form.country]
                        .filter(Boolean)
                        .join(", ") || "—"
                    }
                  />
                  <Row
                    label="Payment"
                    value={
                      form.cardNumber
                        ? `Card ending ${form.cardNumber.slice(-4)}`
                        : "—"
                    }
                  />
                </div>
                <ul className="divide-y divide-line-soft border-y border-line-soft">
                  {items.map((item) => (
                    <li
                      key={`${item.slug}-${item.variantId}`}
                      className="flex justify-between py-4 text-sm"
                    >
                      <span className="text-bone-dim">
                        {item.name} · {item.variantLabel} × {item.quantity}
                      </span>
                      <span className="text-bone">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={back}
              disabled={stepIndex === 0}
              className="btn-ghost disabled:opacity-30 disabled:pointer-events-none"
            >
              Back
            </button>
            {current === "Review" ? (
              <button onClick={placeOrder} className="btn-gold">
                Place Order — {formatPrice(total)}
              </button>
            ) : (
              <button onClick={next} className="btn-gold">
                Continue
              </button>
            )}
          </div>
        </div>

        {/* Fixed summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-line-soft bg-ink-soft p-8">
            <p className="eyebrow">In Your Bag</p>
            <ul className="mt-6 space-y-5">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.variantId}`}
                  className="flex gap-4"
                >
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
                <dt className="text-bone-dim">Shipping</dt>
                <dd className="text-bone">Complimentary</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-bone-dim">GST (3%)</dt>
                <dd className="text-bone">{formatPrice(tax)}</dd>
              </div>
              <div className="hairline my-1" />
              <div className="flex justify-between text-base">
                <dt className="font-serif text-bone">Total</dt>
                <dd className="font-serif text-gold-gradient">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="field mt-2"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-3">
      <span className="uppercase tracking-[0.16em] text-[0.65rem] text-bone-faint">
        {label}
      </span>
      <span className="text-bone-dim">{value}</span>
    </div>
  );
}
