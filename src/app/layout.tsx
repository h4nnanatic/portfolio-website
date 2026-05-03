import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hannan Rasool Portfolio",
  description: "A high-end scrollytelling personal portfolio",
  openGraph: {
    title: "Hannan Rasool Portfolio",
    description: "A high-end scrollytelling personal portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "Hannan Rasool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hannan Rasool Portfolio",
    description: "A high-end scrollytelling personal portfolio",
    images: ["/og-image.jpg"],
  },
};

import CustomCursor from "@/components/CustomCursor";
import FloatingNav from "@/components/FloatingNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#121212] text-[#ededed]`}>
        <CustomCursor />
        {children}
        <FloatingNav />
      </body>
    </html>
  );
}
