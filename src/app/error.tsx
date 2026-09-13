"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-luxe flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-6 font-serif text-4xl md:text-5xl text-bone">
        An unexpected fault
      </h1>
      <p className="mt-4 max-w-md text-bone-dim">
        We&rsquo;ve logged the issue. Please try again, or return to the home
        page.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button onClick={reset} className="btn-gold">
          Try Again
        </button>
        <Link href="/" className="btn-ghost">
          Return Home
        </Link>
      </div>
    </section>
  );
}
