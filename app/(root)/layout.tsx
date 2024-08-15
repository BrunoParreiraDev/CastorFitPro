"use client";

import Navbar from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/server/firebase";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
      // Enviar informações do usuário para o servidor
      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: currentUser.uid }),
      });
    }
  }, []);

  if (!user) {
    redirect("/entrar");
    return null; // Garantir que o componente não renderize nada até que o redirecionamento ocorra
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          {children}
        </main>
      </div>
    </div>
  );
}
