import type { Metadata } from "next";
import { Chewy, Quicksand } from "next/font/google";
import "./globals.css";

// Chewy: bubble-letter display face — unmistakably playful/"cute" rather
// than just bold, matching the hand-drawn sticker illustrations. Swapped
// in after feedback that Baloo 2 still read as a fairly plain bold font.
const displayFont = Chewy({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
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
