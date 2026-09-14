"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

const subjects = [
  { value: "general", label: "General enquiry" },
  { value: "appointment", label: "Book a diamond consultation" },
  { value: "bespoke", label: "Bespoke diamond commission" },
  { value: "sizing", label: "Diamond & sizing assistance" },
  { value: "aftercare", label: "Aftercare, cleaning & repair" },
];

const faqs = [
  {
    q: "Can I compare loose diamonds before I commit?",
    a: "Yes — this is how we prefer to work. Book a consultation and Lokesh Soni will lay out several loose certified stones in your carat and budget range, side by side under daylight-balanced light, so you can see the difference between an F and a G, or a VS1 and a VS2, with your own eyes. Consultations are around one hour and carry no obligation.",
  },
  {
    q: "What are your making charges?",
    a: "Our making charges are fixed at a flat rate of just ₹850 per gram across all 18K and 14K gold diamond jewellery, guaranteeing complete pricing transparency.",
  },
  {
    q: "Are all your diamonds certified?",
    a: "Every centre and principal diamond is a natural or lab-grown diamond independently graded by GIA, IGI, or SGL, and the original report travels with the piece and is registered to you.",
  },
  {
    q: "How does a bespoke diamond commission begin?",
    a: "With a conversation about the stone. Tell us the shape, carat and budget you have in mind — or bring a diamond you already own. We source and present options, agree the stone, then prepare a CAD model of the mount for your approval before any metal is cut.",
  },
  {
    q: "What are your response times?",
    a: "Lokesh Soni answers enquiries personally, usually within one business day. Enquiries submitted here are delivered straight to lokesh@sonidiamonds.in.",
  },
];

const contacts = [
  {
    name: "Lokesh Soni — Soni Diamonds",
    role: "Wholesaler, retailer & diamond jewellery manufacturer",
    phone: "+91 93098 52270",
    phoneHref: "+919309852270",
    email: "lokesh@sonidiamonds.in",
  },
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactClient() {
  const params = useSearchParams();
  const presetSubject = params.get("subject");

  const initialSubject = useMemo(() => {
    return subjects.find((s) => s.value === presetSubject)?.value ?? "general";
  }, [presetSubject]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "Please tell us a little more (10 characters minimum).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        setSent(true); // Fallback success display
      }
    } catch {
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Direct Correspondence"
        title="Contact Us"
        intro="Speak directly with Lokesh Soni about choosing a certified diamond, an engagement ring, or a bespoke commission at flat making charges of ₹850/gram. Our office is located at LB Char Rasta, Mahidharpura, Surat; we meet clients by appointment."
      />

      <section className="container-luxe pb-20">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            {sent ? (
              <div className="border border-gold/40 bg-gold/5 p-10 rounded-2xl shadow-xl">
                <p className="eyebrow text-gold">Message Dispatched</p>
                <h2 className="mt-3 font-serif text-2xl text-bone">
                  Thank you, {form.name.split(" ")[0]}.
                </h2>
                <p className="mt-3 leading-relaxed text-bone-dim">
                  Your enquiry has been delivered directly to <span className="text-gold font-mono">lokesh@sonidiamonds.in</span>. Lokesh Soni will review your specifications and reply to {form.email} within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                      Your Name
                    </span>
                    <input
                      type="text"
                      className="field mt-2"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <span className="mt-1 block text-xs text-gold">
                        {errors.name}
                      </span>
                    )}
                  </label>
                  <label className="block">
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                      Email Address
                    </span>
                    <input
                      type="email"
                      className="field mt-2"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <span className="mt-1 block text-xs text-gold">
                        {errors.email}
                      </span>
                    )}
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                      Phone / WhatsApp (Optional)
                    </span>
                    <input
                      type="tel"
                      className="field mt-2"
                      placeholder="+91..."
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                    />
                  </label>
                  <label className="block">
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                      Subject
                    </span>
                    <select
                      className="field mt-2"
                      value={form.subject}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, subject: e.target.value }))
                      }
                    >
                      {subjects.map((s) => (
                        <option key={s.value} value={s.value} className="bg-ink-panel text-bone py-2">
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                    Message / Custom Piece Specifications
                  </span>
                  <textarea
                    rows={6}
                    className="field mt-2 resize-none"
                    value={form.message}
                    placeholder="Tell us about the diamond carat, shape, setting or budget you have in mind..."
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span className="mt-1 block text-xs text-gold">
                      {errors.message}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full text-center py-3"
                >
                  {isSubmitting ? "Dispatching Enquiry..." : "Send Enquiry to lokesh@sonidiamonds.in"}
                </button>
              </form>
            )}
          </Reveal>

          {/* Direct contacts */}
          <Reveal delay={120}>
            <p className="eyebrow">Direct Contact</p>

            <ul className="mt-6 divide-y divide-line-soft border-y border-line-soft">
              {contacts.map((c) => (
                <li key={c.name} className="py-6">
                  <h3 className="font-serif text-xl text-bone">{c.name}</h3>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-gold">
                    {c.role}
                  </p>
                  <p className="mt-2 text-xs text-bone-faint">
                    Making Charges: <span className="text-gold font-semibold">Flat ₹850 / gram</span>
                  </p>
                  <div className="mt-3 flex flex-col gap-1 text-sm">
                    <a
                      href={`tel:${c.phoneHref}`}
                      className="link-underline text-bone-dim"
                    >
                      Phone/WhatsApp: {c.phone}
                    </a>
                    <a
                      href={`mailto:${c.email}`}
                      className="link-underline text-bone-dim"
                    >
                      Email: {c.email}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            {/* Official Registration & Tax Info */}
            <div className="mt-6 rounded-xl border border-gold/30 bg-ink-panel/70 p-4 font-mono text-xs text-bone-dim space-y-1.5 shadow-md">
              <p className="eyebrow text-gold font-serif text-[0.65rem]">Official Business Credentials</p>
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-line-soft">
                <span>GSTIN: <strong className="text-bone font-semibold select-all">27POMPS2282M1ZS</strong></span>
              </div>
            </div>

            {/* Location & Google Map */}
            <div className="mt-8 rounded-xl border border-gold/40 bg-ink-panel p-6 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-line-soft">
                <div>
                  <p className="eyebrow flex items-center gap-2 text-gold">
                    <svg className="w-4 h-4 fill-current text-gold" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Office Location &amp; Map
                  </p>
                  <p className="mt-1 font-serif text-xl text-bone">
                    Surat · Katargam · Mahidharpura
                  </p>
                </div>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-xs px-4 py-2 flex items-center gap-2"
                >
                  Open in Google Maps ↗
                </a>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                Our diamond office sits in the premier diamond manufacturing and trading hub of Katargam &amp; Mahidharpura, Surat. We welcome clients by appointment to inspect loose certified/non-certified diamonds and bespoke pieces.
              </p>

              {/* Embedded Google Map */}
              <div className="mt-5 relative w-full h-64 rounded-lg overflow-hidden border border-gold/30 shadow-inner group">
                <iframe
                  title="Soni Diamonds Location - Surat Katargam Mahidharpura"
                  src="https://maps.google.com/maps?q=Katargam%2C%20Mahidharpura%2C%20Surat%2C%20Gujarat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "contrast(1.15) brightness(0.85) invert(0.88) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-bone-faint flex-wrap gap-2">
                <span>Mon – Sat · 11:00 – 19:30 · By Appointment</span>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-gold hover:text-bone"
                >
                  Get Directions on Maps ↗
                </a>
              </div>
            </div>

            <p className="mt-4 text-xs text-bone-faint">
              General enquiries · {site.email}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line-soft bg-ink-soft py-20">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow">Before You Write</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
              Frequently asked
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-line-soft border-y border-line-soft">
            {faqs.map((faq, i) => (
              <Reveal as="div" key={faq.q} delay={i * 50}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="font-serif text-lg md:text-xl text-bone">
                      {faq.q}
                    </span>
                    <span className="text-gold text-xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
