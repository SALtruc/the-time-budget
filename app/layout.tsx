import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";

// The Figma reference's headline font is "Museo" — a paid font not on
// Google Fonts, and not actually loaded even by the sibling reference
// app itself (it silently falls back to system Trebuchet MS there).
// Poppins is the standard free look-alike for Museo Sans: same
// geometric-rounded construction, without the licensing problem.
const displayFont = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// Quicksand: soft, rounded body face that pairs with Baloo 2 without
// competing with it — replaces Nunito, which read as too plain/neutral.
const sansFont = Quicksand({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Time Budget",
  description:
    "Allocate your 168-hour week across 7 life blocks and discover your Time Profile character.",
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
