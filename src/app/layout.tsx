import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { META } from "../constants/data";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(META.url),
  title: META.title,
  description: META.description,
  keywords: [
    "backend engineer",
    "distributed systems",
    "Prateek Agrawal",
    "Shiv Nadar University",
    "HPE",
    "Python",
    "Go",
  ],
  authors: [{ name: "Prateek Agrawal" }],
  openGraph: {
    title: META.title,
    description: META.description,
    url: META.url,
    siteName: "Prateek Agrawal",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: META.ogImage,
        width: 1200,
        height: 630,
        alt: "Prateek Agrawal - Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
    images: [META.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${ibmPlexMono.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}