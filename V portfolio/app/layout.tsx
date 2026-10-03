import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { PERSON } from "@/lib/data";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";
const title = `${PERSON.name} — ${PERSON.role}`;
const description = "Retail sales professional in jewellery and diamond retail, store visual merchandising and customer relationship management. Based in Erode, Tamil Nadu.";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title, description,
  openGraph: { title, description, type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${PERSON.name}, ${PERSON.role}` }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};
export const viewport: Viewport = { themeColor: "#f8f4ec", colorScheme: "light", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: PERSON.name, jobTitle: PERSON.role,
  email: PERSON.email, telephone: PERSON.phone, address: { "@type": "PostalAddress", addressLocality: "Erode", addressRegion: "Tamil Nadu" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
