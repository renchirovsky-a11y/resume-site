import type { Metadata, Viewport } from "next";
import { Sora, Manrope } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LangProvider from "@/components/LangProvider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06070b" },
    { media: "(prefers-color-scheme: light)", color: "#f9f8fc" },
  ],
};

export const metadata: Metadata = {
  title: "Samir Renchirovsky — Head of Link Building & Influencer Marketing",
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
    title: "Samir Renchirovsky — SEO & Growth Professional",
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
    <html lang="en" className={`${sora.variable} ${manrope.variable}`} suppressHydrationWarning>
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
