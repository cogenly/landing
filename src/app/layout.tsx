import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const openSauceSans = localFont({
  src: [
    { path: "./fonts/OpenSauceSansVF.woff2", style: "normal" },
    { path: "./fonts/OpenSauceSansVF-Italic.woff2", style: "italic" },
  ],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = "https://cogenly.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cogenly - AI Systems That Replace Manual Work",
    template: "%s | Cogenly",
  },
  description:
    "Cogenly builds custom AI systems for businesses. Voice agents, workflow automation, document processing, internal tools. If your team is doing it manually, we can automate it.",
  keywords: [
    "AI automation",
    "voice agents",
    "workflow automation",
    "document processing",
    "AI systems",
    "business automation",
    "custom AI",
    "internal tools",
  ],
  authors: [{ name: "Cogenly" }],
  creator: "Cogenly",
  publisher: "Cogenly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Cogenly",
    title: "Cogenly - AI Systems That Replace Manual Work",
    description:
      "Custom AI systems for businesses. Voice agents, workflow automation, document processing, internal tools. Live in 2-4 weeks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cogenly - AI Systems That Replace Manual Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogenly - AI Systems That Replace Manual Work",
    description:
      "Custom AI systems for businesses. Voice agents, workflow automation, document processing, internal tools. Live in 2-4 weeks.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSauceSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader color="oklch(0.62 0.18 250)" showSpinner={false} />
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
