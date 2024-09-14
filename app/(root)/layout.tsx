"use client";

import Navbar from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <div className="grid items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 [&>.centered]:!flex [&>.centered]:justify-center [&>.centered]:items-center [&>.centered]:col-span-full [&>.centered]:h-full">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}