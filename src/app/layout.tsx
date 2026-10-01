import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hydroflow.app";

export const viewport: Viewport = {
  themeColor: "#EAECEE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HYDROFLOW ✦ Tokenizing Hydration",
    template: "%s | HYDROFLOW",
  },
  description: "Ultra-modern Web3 hydration product landing page. Blockchain-powered pure zero sugar hydration on Solana.",
  keywords: [
    "HYDROFLOW",
    "Solana Splash",
    "Tokenized Hydration",
    "Web3 Energy Drink",
    "Alpine Spring Water",
    "Zero Sugar",
    "Solana Ecosystem",
    "NFC Authentication",
    "Crypto Hydration",
  ],
  authors: [{ name: "HydroFlow Protocol Team" }],
  creator: "HydroFlow Protocol",
  publisher: "HydroFlow Protocol",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HYDROFLOW ✦ Tokenizing Hydration",
    description: "World's first tokenized energy drink on Solana. Pure alpine spring water, zero sugar, and cryptographic provenance.",
    url: siteUrl,
    siteName: "HYDROFLOW",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "HYDROFLOW Solana Splash 3D Can",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HYDROFLOW ✦ Tokenizing Hydration",
    description: "World's first tokenized energy drink on Solana.",
    creator: "@hydroflow_app",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "HYDROFLOW Solana Splash",
    image: `${siteUrl}/og-image.jpg`,
    description: "Tokenized Web3 energy drink with pure alpine spring water, zero sugar, and Solana blockchain NFC provenance.",
    brand: {
      "@type": "Brand",
      name: "HYDROFLOW",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "3.49",
      availability: "https://schema.org/PreOrder",
      url: siteUrl,
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${mono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-white antialiased selection:bg-solana-purple selection:text-white">
        {children}
      </body>
    </html>
  );
}
