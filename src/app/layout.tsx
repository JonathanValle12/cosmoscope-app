import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-[#020307] text-white">
        <Sidebar />

        <main className="ml-[250px] min-h-screen">
          <div className="mx-auto w-full p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}