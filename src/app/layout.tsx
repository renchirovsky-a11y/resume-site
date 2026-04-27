import type { Metadata, Viewport } from "next";
import { Unbounded, Onest } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LangProvider from "@/components/LangProvider";
import "./globals.css";

// Display headings — Unbounded is a sharp geometric grotesque with full Cyrillic
// designed for big sizes. Only 600 + 700 used in code.
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

// Body — Onest is Cyrillic-first, very readable, neutral grotesque
const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080a0d" },
    { media: "(prefers-color-scheme: light)", color: "#f4efe5" },
  ],
};

export const metadata: Metadata = {
  title: "Samir Renchirovsky - Head of Link Building & Influencer Marketing",
  description:
    "Results-driven digital marketer with deep expertise in SEO link building and influencer marketing across competitive iGaming environments.",
  keywords: [
    "SEO",
    "Link Building",
    "Influencer Marketing",
    "iGaming",
    "Digital Marketing",
    "Growth Strategy",
  ],
  openGraph: {
    title: "Samir Renchirovsky - SEO & Growth Professional",
    description:
      "Linkbuilder & Influencer Marketing Lead. 90,000+ link placements, $50K+ budgets managed.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${unbounded.variable} ${onest.variable}`} suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
