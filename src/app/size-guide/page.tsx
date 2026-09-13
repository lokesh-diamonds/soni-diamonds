import type { Metadata } from "next";
import SizeGuideClient from "./SizeGuideClient";

export const metadata: Metadata = {
  title: "Diamond & Size Guide",
  description:
    "Understand the Four Cs, see carat-to-millimetre diamond sizes, and find your exact ring, necklace and bracelet size with the Soni Diamonds conversion charts.",
};

export default function SizeGuidePage() {
  return <SizeGuideClient />;
}
