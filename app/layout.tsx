import type { Metadata } from "next";
import { Baloo_2, Quicksand } from "next/font/google";
import "./globals.css";

// Baloo 2: extra-chunky, rounded display face — reads "cute sticker",
// bolder/friendlier than Fredoka at the large headline sizes this app uses.
const displayFont = Baloo_2({
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
