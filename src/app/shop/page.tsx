import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop — Diamond Collections",
  description:
    "Browse the full Soni Diamonds catalogue of diamond engagement rings, solitaires, tennis necklaces, studs, pendants, bracelets and bangles. Filter by collection, category, diamond setting and metal.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-luxe py-32 text-bone-faint">Loading…</div>}>
      <ShopClient />
    </Suspense>
  );
}
