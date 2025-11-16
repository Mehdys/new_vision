import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NewVision – Embeddable Feedback Widget",
  description: "Drop-in feedback widget for modern websites, powered by Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 text-sm font-semibold">
                NV
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">NewVision</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                  Feedback widget
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4 text-xs md:text-sm text-slate-300">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Home
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-sky-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/install"
                className="hover:text-sky-400 transition-colors"
              >
                Install
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
