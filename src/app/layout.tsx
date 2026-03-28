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

export const metadata: Metadata = {
  title: "Cogenly - AI Systems That Replace Manual Work",
  description:
    "Cogenly builds AI systems for businesses. Voice agents, workflow automation, internal tools. If your team is doing it on autopilot, we can automate it.",
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
