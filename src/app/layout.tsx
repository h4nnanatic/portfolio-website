import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hannan Rasool Portfolio",
  description: "Explore Hannan Rasool’s work in marketing leadership, brand strategy, graphic design, and creative campaigns.",
  openGraph: {
    title: "Hannan Rasool Portfolio",
    description: "Explore Hannan Rasool’s work in marketing leadership, brand strategy, graphic design, and creative campaigns.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 682,
        alt: "Hannan Rasool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hannan Rasool Portfolio",
    description: "Explore Hannan Rasool’s work in marketing leadership, brand strategy, graphic design, and creative campaigns.",
    images: ["/og-image.jpg"],
  },
};

import FloatingNav from "@/components/FloatingNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#121212] text-[#ededed]`}>
        {children}
        <FloatingNav />
      </body>
    </html>
  );
}
