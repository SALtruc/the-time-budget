import type { Metadata } from "next";
import { Archivo_Black, Nunito } from "next/font/google";
import "./globals.css";

const displayFont = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const sansFont = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
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
