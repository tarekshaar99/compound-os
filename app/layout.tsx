import type { Metadata } from "next";
import { Suspense } from "react";
import { Newsreader, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AdsPixels from "./components/AdsPixels";
import PageViewTracker from "./components/PageViewTracker";
import "./globals.css";

/**
 * Newsreader — display serif for headlines + editorial pull-quotes.
 * Stand-in for GT Sectra per the design brief. Loaded with italic +
 * weight 300 (display) and 400/500 (h1–h3, body emphasis).
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Inter — body, labels, UI. Stand-in for Söhne.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://thecompoundsystem.com";
const SITE_NAME = "Compound OS";
const SITE_DESCRIPTION =
  "The operating system for a compounding life. Three pillars, one system: Markets, Fitness, Mindset.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Tarek Shaar" }],
  creator: "Tarek Shaar",
  publisher: SITE_NAME,
  keywords: [
    "investing",
    "options trading",
    "wheel strategy",
    "covered calls",
    "cash secured puts",
    "hybrid athlete",
    "fitness program",
    "mindset training",
    "personal operating system",
    "compound",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    // Google Search Console verification token. Set via Vercel env var
    // so we can verify without shipping a new deploy.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0b0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${inter.variable} antialiased`}
      >
        {children}
        {/* Ad-platform conversion pixels (Meta, Google, TikTok). Each is
            gated on its NEXT_PUBLIC_* env var; missing = no script loaded. */}
        <AdsPixels />
        {/* PageViewTracker uses useSearchParams; must be in Suspense per
            Next.js App Router rules. */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
