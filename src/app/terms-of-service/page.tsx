import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Soni Diamonds website and the purchase of our diamond jewellery.",
};

const sections: LegalSection[] = [
  {
    id: "entity",
    heading: "Business Entity & Registration Details",
    body: [
      "SONI DIAMONDS is an established diamond jewellery manufacturer, wholesaler, and retailer operating out of LB Char Rasta, Mahidharpura, Surat, Gujarat, India under the direct leadership of Managing Director Lokesh Soni.",
      "Official Goods and Services Tax Identification Number (GSTIN): 27POMPS2282M1ZS",
    ],
  },
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    body: [
      "These Terms of Service govern your access to and use of the Soni Diamonds website and the purchase of any diamond jewellery or related services offered through it.",
      "By accessing the site or placing an order, you confirm that you are at least 18 years of age and agree to be bound by these Terms. If you do not agree, you must not use the site.",
    ],
  },
  {
    id: "orders",
    heading: "Orders and Acceptance",
    body: [
      "All orders are an offer to purchase. Your order is accepted only when we send written confirmation that the piece has entered production or dispatch.",
      "Because each piece is set to order around a specific certified diamond, we may decline or cancel an order where a stone of the specified 4C grade is no longer available, where a pricing or description error has occurred, or where we suspect fraudulent activity. In such cases any payment taken will be refunded in full.",
    ],
  },
  {
    id: "diamonds",
    heading: "Diamonds and Certification",
    body: [
      "Every centre and principal diamond supplied by Soni Diamonds is a natural diamond, independently graded by GIA or IGI, and accompanied by its original grading report. Melee and pavé diamonds are graded in-house against GIA master stones.",
      "The 4C grades stated for a piece (carat, colour, clarity, cut) describe the diamond you will receive within normal grading tolerances. Photography and video are indicative; a diamond's appearance varies with lighting.",
      "All diamonds are warranted conflict-free and sourced through the Kimberley Process and the World Diamond Council System of Warranties.",
    ],
  },
  {
    id: "pricing",
    heading: "Pricing and Payment",
    body: [
      "Prices are shown in Indian Rupees (INR) and are inclusive of applicable GST at 3% on the value of gold and diamond jewellery unless stated otherwise. Export orders are quoted net of Indian GST with duties and taxes payable in the destination country.",
      "Payment is taken in full at the time of order. Made-to-order production begins only once payment has cleared.",
      "We reserve the right to adjust prices at any time in line with prevailing gold rates and diamond prices. The price applicable to your order is the price displayed at the moment you place it.",
    ],
  },
  {
    id: "production",
    heading: "Production and Delivery",
    body: [
      "Standard production time for made-to-order pieces is four to six weeks from confirmation of the diamond. Bespoke commissions are quoted individually.",
      "Delivery times stated are estimates and not guarantees. We are not liable for delays caused by customs, carriers or events beyond our reasonable control.",
      "Risk in the goods passes to you on delivery to the address you provide. Title passes once payment has been received in full.",
    ],
  },
  {
    id: "returns",
    heading: "Returns and Cancellation",
    body: [
      "Ready-to-ship pieces may be returned within 30 days of delivery, unworn and in original condition with all documentation, for a full refund.",
      "Made-to-order and bespoke pieces, and any item that has been engraved, resized or otherwise personalised, are final sale and cannot be returned unless faulty.",
      "Full details are set out in our Shipping & Returns policy, which forms part of these Terms.",
    ],
  },
  {
    id: "warranty",
    heading: "Guarantee and Liability",
    body: [
      "Every Soni Diamonds piece carries a lifetime guarantee against manufacturing defects and a lifetime guarantee on the identity and grade of the certified centre diamond. The guarantee does not cover accidental damage, chipped or lost stones from impact, loss, theft, or wear inconsistent with the care instructions provided.",
      "To the fullest extent permitted by law, our total liability arising from any order is limited to the amount you paid for the relevant piece. Nothing in these Terms excludes liability for death or personal injury caused by our negligence, or for fraud.",
    ],
  },
  {
    id: "ip",
    heading: "Intellectual Property",
    body: [
      "All designs, drawings, text, photography and marks on this site are the property of Soni Diamonds or its licensors and are protected by copyright, trade-mark and design law.",
      "You may not reproduce, distribute or create derivative works from any part of the site without our prior written consent.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    body: [
      "These Terms are governed by the laws of India. The courts of Gujarat have exclusive jurisdiction over any dispute, save that we retain the right to bring proceedings in the country of your domicile.",
      "If any provision of these Terms is held unenforceable, the remaining provisions remain in full effect.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      updated="1 September 2026"
      sections={sections}
    />
  );
}
