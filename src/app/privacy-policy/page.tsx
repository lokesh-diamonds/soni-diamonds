import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Soni Diamonds collects, uses and protects your personal information.",
};

const sections: LegalSection[] = [
  {
    id: "overview",
    heading: "Overview",
    body: [
      "This Privacy Policy explains how Soni Diamonds (“Soni Diamonds”, “we”, “us”) collects, uses, discloses and safeguards your personal information when you visit our website, correspond with us, book an appointment, or commission a diamond piece.",
      "By using our website or services, you consent to the practices described here. If you do not agree, please discontinue use of the site.",
    ],
  },
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    body: [
      "Information you provide directly: name, contact details, shipping and billing addresses, ring and bracelet sizes, diamond preferences (shape, carat range, budget), appointment preferences, and the content of your correspondence with us.",
      "Payment information: card details are transmitted directly to our PCI-DSS compliant payment processor and are never stored on our servers.",
      "Information collected automatically: device type, browser, pages viewed, referring URL, and approximate location derived from your IP address. This is gathered through cookies and similar technologies.",
    ],
  },
  {
    id: "how-we-use",
    heading: "How We Use Your Information",
    body: [
      "To process and deliver orders, arrange insured shipping, and provide after-sales service including resizing and repair.",
      "To respond to enquiries, schedule private viewings, and manage bespoke commissions.",
      "To send you correspondence about new collections and private events, where you have opted in. You may withdraw consent at any time via the link in each message.",
      "To detect and prevent fraud, and to comply with legal and regulatory obligations.",
    ],
  },
  {
    id: "sharing",
    heading: "Sharing and Disclosure",
    body: [
      "We share personal information only with: shipping and logistics partners; our payment processor; providers of IT, hosting and analytics services acting on our instructions; and professional advisers, regulators and law-enforcement bodies where required by law.",
      "We do not sell your personal information. We do not permit our service providers to use your data for their own purposes.",
    ],
  },
  {
    id: "retention",
    heading: "Data Retention",
    body: [
      "We retain order and correspondence records for as long as necessary to provide our lifetime guarantee and to meet accounting and tax obligations, typically ten years from the date of purchase.",
      "Marketing preferences are retained until you unsubscribe. Analytics data is retained in aggregated form for up to 26 months.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    body: [
      "Depending on your jurisdiction, you may have the right to access, correct, delete or port your personal data, to object to or restrict certain processing, and to lodge a complaint with a data protection authority (in India, under the Digital Personal Data Protection Act 2023).",
      "To exercise any of these rights, write to lokesh@sonidiamonds.in. We will respond within one month.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: [
      "Strictly necessary cookies keep your shopping bag and session active and cannot be disabled. Analytics and preference cookies are optional and set only with your consent.",
      "You can manage non-essential cookies through the banner presented on your first visit, or through your browser settings.",
    ],
  },
  {
    id: "contact",
    heading: "Contact Us",
    body: [
      "Soni Diamonds — Data Protection, LB Char Rasta, Mahidharpura, Surat, Gujarat, India. Meetings are by prior appointment.",
      "Email: lokesh@sonidiamonds.in — Telephone: +91 93098 52270 (Lokesh Soni).",
    ],
  },

];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="1 September 2026"
      sections={sections}
    />
  );
}
