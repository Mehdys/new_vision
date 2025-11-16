import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NewVision – Feedback Widget",
  description: "A lightweight feedback widget + dashboard for product teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 text-gray-900 min-h-screen">
        {/* Top Navbar */}
        <header className="border-b border-blue-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
          <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-white">NV</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">NewVision</span>
                <span className="text-[11px] text-blue-500">
                  Feedback widget
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4 text-xs md:text-sm">
              <Link
                href="/"
                className="text-blue-600 hover:text-cyan-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/demo"
                className="text-blue-600 hover:text-cyan-600 font-medium transition-colors"
              >
                Demo
              </Link>
              <Link
                href="/docs"
                className="text-blue-600 hover:text-cyan-600 font-medium transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/dashboard"
                className="text-blue-600 hover:text-cyan-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/docs"
                className="rounded-full border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-1.5 text-xs font-bold text-white hover:from-blue-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started ✨
              </Link>
            </div>
          </nav>
        </header>

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
