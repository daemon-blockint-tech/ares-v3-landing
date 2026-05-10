import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARES",
  description:
    "Open-source four-phase analyzer: regex, macro-aware AST, intra-procedural taint, local judge. Runs locally; benchmark harness included.",
  icons: {
    icon: [{ url: "/ARES_LOGO_WHITE.png", type: "image/png" }],
    shortcut: "/ARES_LOGO_WHITE.png",
    apple: "/ARES_LOGO_WHITE.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-landing-canvas text-white [font-family:var(--font-helvetica)]">
        {children}
      </body>
    </html>
  );
}
