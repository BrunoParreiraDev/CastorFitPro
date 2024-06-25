import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
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
  description:
    "Treinamento personalizado e suporte contínuo com Henrique Castor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
