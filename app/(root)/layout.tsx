import Navbar from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import AuthCheck from "@/components/AuthCheck";

export const metadata = {
  title: 'CastorFit Pro | Dashboard'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthCheck>
      <div className="flex min-h-screen w-full flex-col">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Navbar />
          <main className="flex-1 p-4 sm:px-6 sm:py-0">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </AuthCheck>
  );
}