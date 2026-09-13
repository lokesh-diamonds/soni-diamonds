import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description:
    "Complete your Soni Diamonds order through our secure, encrypted checkout.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
