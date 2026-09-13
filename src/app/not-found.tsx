import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="container-luxe flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div className="relative h-16 w-16 mb-4">
        <Image src="/images/logo-transparent.png" alt="Soni Diamonds Logo" fill className="object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" />
      </div>
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-serif text-6xl md:text-8xl text-gold-gradient">
        404
      </h1>
      <h2 className="mt-4 font-serif text-2xl md:text-3xl text-bone">
        This stone has been mislaid
      </h2>
      <p className="mt-4 max-w-md text-bone-dim">
        The page you are looking for has moved, or never existed. Let us guide
        you back to the diamonds.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-gold">
          Return Home
        </Link>
        <Link href="/shop" className="btn-ghost">
          Browse the Diamonds
        </Link>
      </div>
      <div className="hairline mt-16 w-full max-w-sm" />
      <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[0.7rem] uppercase tracking-[0.2em] text-bone-faint">
        <Link href="/size-guide" className="link-underline">
          Diamond &amp; Size Guide
        </Link>
        <Link href="/shipping-returns" className="link-underline">
          Shipping &amp; Returns
        </Link>
        <Link href="/contact" className="link-underline">
          Contact
        </Link>
      </div>
    </section>
  );
}
