import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Complimentary insured shipping across India and worldwide, made-to-order timelines, diamond upgrade credit, and the Soni Diamonds returns policy.",
};

const shippingTiers = [
  {
    region: "Within India",
    time: "1–3 business days after dispatch",
    cost: "Complimentary — fully insured, signature required",
  },
  {
    region: "UAE & Gulf",
    time: "3–5 business days after dispatch",
    cost: "Complimentary — duties billed at import",
  },
  {
    region: "UK, Europe & Singapore",
    time: "4–6 business days after dispatch",
    cost: "Complimentary — duties prepaid by Soni Diamonds",
  },
  {
    region: "United States, Canada & Australia",
    time: "5–8 business days after dispatch",
    cost: "Complimentary — duties may apply on arrival",
  },
];

const faqs = [
  {
    q: "When does my piece ship?",
    a: "Ready pieces leave our workshop within two business days. Made-to-order pieces enter production once payment clears and the diamond is confirmed, and dispatch four to six weeks later. We write to you when the diamond is set and again when the piece ships with tracking.",
  },
  {
    q: "How is my order packaged and secured?",
    a: "Every piece travels with its GIA or IGI grading report in a Soni Diamonds case, inside a discreet outer carton, sent by an insured secured courier requiring photo ID and signature on delivery. The parcel carries no indication of its contents or value. All shipments are insured for full value in transit.",
  },
  {
    q: "Can I return a piece?",
    a: "Ready-to-ship pieces may be returned within 15 days of delivery, unworn, with the grading report and all documentation, for a full refund to the original payment method. Made-to-order, bespoke, engraved and resized pieces are final sale, as each is built around a specific stone sourced for you.",
  },
  {
    q: "Do you offer diamond upgrade credit?",
    a: "Yes. At any time you may trade a diamond piece bought from us against a piece with a diamond of higher value, and we credit the full original diamond value paid. The piece must be in original condition with its grading report.",
  },
  {
    q: "How do I arrange a return or service?",
    a: "Write to lokesh@sonidiamonds.in or call +91 93098 52270. We arrange insured pickup. Refunds are issued within five business days of the piece arriving back and passing inspection.",
  },

  {
    q: "Do you offer resizing and cleaning?",
    a: "The first ring resizing within twelve months of purchase is complimentary, including insured shipping both ways. We also offer complimentary professional cleaning and a diamond-security check once a year for the life of the piece.",
  },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Care"
        title="Shipping & Returns"
        intro="Every order travels fully insured, by secured courier, with its diamond grading report, in packaging that gives nothing away. Here is exactly what to expect."
      />

      <section className="container-luxe pb-20">
        <Reveal>
          <h2 className="font-serif text-2xl md:text-3xl text-bone">
            Delivery by region
          </h2>
        </Reveal>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-line text-left text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
                <th className="py-4 pr-6 font-normal">Region</th>
                <th className="py-4 pr-6 font-normal">Transit Time</th>
                <th className="py-4 font-normal">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {shippingTiers.map((tier) => (
                <tr key={tier.region}>
                  <td className="py-5 pr-6 text-bone">{tier.region}</td>
                  <td className="py-5 pr-6 text-bone-dim">{tier.time}</td>
                  <td className="py-5 text-bone-dim">{tier.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-line-soft bg-ink-soft py-20">
        <div className="container-luxe grid gap-12 md:grid-cols-3">
          {[
            {
              t: "Set to order",
              d: "4–6 weeks in the workshop once the diamond is confirmed. You are written to at each stage.",
            },
            {
              t: "15-day returns",
              d: "On ready-to-ship pieces, unworn and complete with the grading report. Bespoke and personalised pieces are final sale.",
            },
            {
              t: "Lifetime diamond upgrade",
              d: "Trade up any time — full original diamond value credited against a higher-value stone.",
            },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 90}>
              <p className="eyebrow">0{i + 1}</p>
              <h3 className="mt-3 font-serif text-2xl text-bone">{item.t}</h3>
              <p className="mt-3 leading-relaxed text-bone-dim">{item.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-luxe py-20">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-bone">
            Shipping &amp; returns, in detail
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-line-soft border-y border-line-soft">
          {faqs.map((faq, i) => (
            <Reveal as="div" key={faq.q} delay={i * 50}>
              <details className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
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
        <Reveal>
          <p className="mt-12 text-sm text-bone-faint">
            Still need help?{" "}
            <Link href="/contact" className="link-underline text-bone-dim">
              Contact Lokesh Soni directly
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}
