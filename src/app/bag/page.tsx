import type { Metadata } from "next";
import BagClient from "./BagClient";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review the diamond pieces in your Soni Diamonds shopping bag before checkout.",
};

export default function BagPage() {
  return <BagClient />;
}
