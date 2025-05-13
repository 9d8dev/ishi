import { Geist as FontSans, Geist_Mono as FontMono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

import type { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ishi",
  description: "web app starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
