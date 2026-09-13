import Image from "next/image";
import Link from "next/link";
import { footerNav, site } from "@/data/site";
import VisitingCard from "./VisitingCard";
import FooterLiveRates from "./FooterLiveRates";

export default function Footer() {
  return (
    <footer className="border-t border-line-soft bg-ink-soft mt-24">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand Info & Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="relative h-14 w-14 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo-transparent.png"
                  alt="Soni Diamonds Logo"
                  fill
                  className="object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                />
              </div>
              <div>
                <p className="font-serif text-2xl tracking-[0.25em] text-bone group-hover:text-gold transition-colors">
                  {site.name}
                </p>
                <p className="eyebrow text-[0.65rem] text-gold tracking-[0.2em]">
                  {site.tagline}
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone-faint">
              Fine diamond jewellery manufacturer, wholesaler &amp; retailer in Surat.
              We craft certified and non-certified diamond solitaires and jewellery at flat making charges of just <span className="text-gold font-semibold">₹850 per gram</span>.
            </p>

            <div className="mt-6 space-y-1.5 text-sm text-bone-dim">
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold inline-block" />
                <a href="tel:+919309852270" className="link-underline">
                  +91 93098 52270
                </a>{" "}
                <span className="text-bone-faint">· Lokesh Soni</span>
              </p>
              <p className="pt-1 text-xs text-bone-faint">
                <a href="mailto:lokesh@sonidiamonds.in" className="link-underline">
                  lokesh@sonidiamonds.in
                </a>
              </p>
              <p className="pt-1 text-xs text-bone-faint">
                LB Char Rasta · Mahidharpura · Surat ·{" "}
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Instagram
                </a>
              </p>
              <p className="pt-1.5 text-[0.72rem] text-gold/80 flex flex-wrap gap-x-3 gap-y-1 font-mono">
                <span>GSTIN: <strong className="text-bone-dim">27POMPS2282M1ZS</strong></span>
                <span>PAN: <strong className="text-bone-dim">AGAFS7226G</strong></span>
              </p>
            </div>
          </div>

          {/* Navigation links */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <p className="eyebrow">{heading}</p>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-bone-dim hover:text-bone transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Live Surat Rates Puller */}
        <FooterLiveRates />

        {/* Visiting Card — view only */}
        <div className="mt-8">
          <VisitingCard variant="panel" />
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-bone-faint flex items-center gap-2">
            <span>
              © {new Date().getFullYear()} {site.name} {site.tagline}. Making charges fixed at ₹850/g. All rights reserved.
            </span>
          </p>
          <div className="flex gap-6 text-xs text-bone-faint">
            <Link href="/privacy-policy" className="hover:text-bone transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-bone transition-colors">
              Terms
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-bone transition-colors"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

