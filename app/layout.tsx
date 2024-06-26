import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "CastorFit Pro",
  description: "Treinamento personalizado e suporte contínuo com Henrique Castor.",
  themeColor: "#0D1526",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/logo.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/logo.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/logo.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "800x800", 
      url: "/logo.png",
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
