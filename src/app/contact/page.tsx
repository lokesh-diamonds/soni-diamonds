import type { Metadata } from "next";
import { Suspense } from "react";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Speak directly with Lokesh Soni. Book a diamond consultation or begin a bespoke commission at flat making charges of ₹850/gram. Phone +91 93098 52270.",
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container-luxe py-32 text-bone-faint">Loading…</div>}>
      <ContactClient />
    </Suspense>
  );
}

