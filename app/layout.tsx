import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

// Baloo 2: bold, rounded, and stays legible at small sizes on mobile —
// a better fit for this playful "sticker" style than Archivo Black, which
// is tight/condensed and got hard to read at mobile body-copy sizes.
const displayFont = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const sansFont = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Time Budget",
  description:
    "Allocate your 40-hour week across 7 life blocks and discover your Time Profile character.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-navy">
        {children}
      </body>
    </html>
  );
}
