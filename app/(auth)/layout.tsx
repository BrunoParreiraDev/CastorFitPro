export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex min-h-screen w-full flex-col justify-center items-center">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-1 items-center justify-center w-full p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </div>
    </div>
  );
}
