import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PWARegister } from "@/components/pwa-register";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DoniCargo - Marketplace & Suivi Logistique",
  description: "Sécurisez vos importations de l'océan à Bamako.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DoniCargo",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${jbMono.variable} h-full antialiased text-[16px] md:text-[17px] scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-orange-500/30">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
