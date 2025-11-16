// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Hero */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-blue-300 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            ✨ Live: Embeddable feedback widget powered by Next.js & Supabase
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Capture user feedback{" "}
              <span className="block">from any website</span> in seconds! 🚀
            </h1>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed">
              NewVision is a drop-in feedback widget. Add one{" "}
              <code className="rounded-md bg-blue-100 px-2 py-1 text-sm font-mono text-blue-700 border border-blue-300">
                &lt;script&gt;
              </code>{" "}
              tag to your site, and feedback flows straight into your dashboard,
              backed by a real PostgreSQL database.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
            >
              View Dashboard 📊
            </Link>
            <Link
              href="/install"
              className="inline-flex items-center justify-center rounded-full border-2 border-blue-400 bg-white px-6 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all transform hover:scale-105 shadow-md"
            >
              Get Install Snippet ✨
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">1️⃣</div>
            <h2 className="text-lg font-bold text-blue-700 mb-2">Embed</h2>
            <p className="text-sm text-gray-700">
              Paste a small script tag in your website. NewVision adds a floating
              feedback button automatically.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-50 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">2️⃣</div>
            <h2 className="text-lg font-bold text-cyan-700 mb-2">Collect</h2>
            <p className="text-sm text-gray-700">
              Visitors submit feedback. The widget calls your{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 text-[11px] text-blue-700 font-mono">/api/feedback</code>{" "}
              endpoint.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">3️⃣</div>
            <h2 className="text-lg font-bold text-sky-700 mb-2">Analyze</h2>
            <p className="text-sm text-gray-700">
              All feedback is stored in Supabase and visible in your dashboard.
              Ready for future AI summarization and tagging.
            </p>
          </div>
        </section>

        {/* Code snippet preview */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">
            One-line install snippet 🎯
          </h2>
          <div className="rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-xs shadow-lg">
            <pre className="overflow-x-auto text-gray-800">
              <code className="font-mono">{`<script
  src="https://YOUR_DOMAIN/embed.js"
  data-project-id="default_project"
  async
></script>`}</code>
            </pre>
            <p className="mt-4 text-sm text-gray-600">
              Replace <span className="font-bold text-blue-600">YOUR_DOMAIN</span> with your
              Vercel URL. Each project can have its own{" "}
              <span className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-700">project_id</span>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
