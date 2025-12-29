import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import QueryProvider from '@/lib/transtack-query/provide'
import "@/style/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nepal Election 2026 - Official Countdown & Updates",
  description: "Stay informed about Nepal's 2026 election. Get daily countdown reminders and important updates delivered to your inbox. A community-driven initiative for civic engagement.",
  keywords: ["Nepal", "Election", "2026", "Voting", "Democracy", "Countdown"],
  openGraph: {
    title: "Nepal Election 2026 Countdown",
    description: "Every vote shapes our future. Stay informed with daily reminders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
