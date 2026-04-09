import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body>

        <div className="min-h-screen bg-[#020307] text-white">
          <div className="grid min-h-screen grid-cols-[240px_1fr]">
            <Sidebar />
            <main className="overflow-y-auto">
              <div className="mx-auto w-full p-6 lg:p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
