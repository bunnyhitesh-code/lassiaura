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
  title: "Lassi Aura — Premium Lassi Catering for Your Event",
  description: "Authentic, freshly made lassi brought to your gathering. Live premium booth, artistic pour techniques, statewide service. Book your event today.",
  keywords: "lassi catering, indian drink catering, event catering, wedding catering, lassi booth",
  openGraph: {
    title: "Lassi Aura — Premium Lassi Catering",
    description: "Authentic lassi catering for weddings, corporate events, house parties and cultural gatherings. Statewide service.",
    url: "https://lassiaura.com",
    siteName: "Lassi Aura",
    images: [
      {
        url: "https://lassiaura.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lassi Aura — Premium Lassi Catering",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lassi Aura — Premium Lassi Catering",
    description: "Authentic lassi catering for your event. Live booth, artistic pour, statewide service.",
    images: ["https://lassiaura.com/og-image.jpg"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
