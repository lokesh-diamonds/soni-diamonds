"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { primaryNav, site } from "@/data/site";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-ink/95 backdrop-blur-md -webkit-backdrop-blur-md border-b border-line-soft shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-luxe flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6">
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1 -ml-1 text-bone focus:outline-none"
        >
          <span
            className={`h-px bg-bone transition-all duration-300 ${
              menuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px bg-bone transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px bg-bone transition-all duration-300 ${
              menuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>

        <nav className="hidden md:flex items-center gap-6 lg:gap-9">
          {primaryNav.slice(0, 3).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="link-underline text-[0.7rem] uppercase tracking-[0.2em] text-bone-dim hover:text-bone transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-base sm:text-xl md:text-2xl tracking-[0.18em] sm:tracking-[0.3em] text-bone hover:text-gold transition-colors whitespace-nowrap"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            {primaryNav.slice(3).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="link-underline text-[0.7rem] uppercase tracking-[0.2em] text-bone-dim hover:text-bone transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/bag"
            className="relative text-[0.68rem] sm:text-[0.7rem] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-bone-dim hover:text-bone transition-colors py-1 px-1"
          >
            Bag
            <span className="ml-1 text-gold font-semibold">({count})</span>
          </Link>
          <Link
            href="/"
            className="relative h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 transition-transform duration-300 hover:scale-110"
            title="Soni Diamonds"
          >
            <Image
              src="/images/logo-transparent.png"
              alt="Soni Diamonds Emblem"
              fill
              priority
              className="object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]"
            />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-ink-panel/95 backdrop-blur-xl border-b border-gold/20 ${
          menuOpen ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className="container-luxe flex flex-col gap-1 pb-4">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="py-3 border-b border-line-soft/60 text-xs sm:text-sm uppercase tracking-[0.2em] text-bone-dim hover:text-gold transition-colors flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-gold text-xs">→</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
