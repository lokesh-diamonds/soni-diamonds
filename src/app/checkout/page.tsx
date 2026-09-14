import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — Coming Soon",
  description:
    "Online checkout is coming soon. Call or message Lokesh Soni to complete your order directly.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
