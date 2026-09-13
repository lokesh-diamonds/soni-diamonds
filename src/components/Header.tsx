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
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen
          ? "bg-ink/95 backdrop-blur border-b border-line-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-luxe flex items-center justify-between h-20">
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] w-6"
        >
          <span
            className={`h-px bg-bone transition-transform ${
              menuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px bg-bone transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px bg-bone transition-transform ${
              menuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {primaryNav.slice(0, 3).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim hover:text-bone transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-xl md:text-2xl tracking-[0.3em] text-bone hover:text-gold transition-colors"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-9">
            {primaryNav.slice(3).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="link-underline text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim hover:text-bone transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/bag"
            className="relative text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim hover:text-bone transition-colors"
          >
            Bag
            <span className="ml-1 text-gold">({count})</span>
          </Link>
          <Link
            href="/"
            className="relative h-11 w-11 md:h-13 md:w-13 shrink-0 transition-transform duration-300 hover:scale-110"
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
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="container-luxe flex flex-col gap-1 pb-6">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="py-3 border-b border-line-soft text-sm uppercase tracking-[0.22em] text-bone-dim"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
