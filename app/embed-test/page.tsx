// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Hero */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live: embeddable feedback widget powered by Next.js & Supabase
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Capture user feedback{" "}
              <span className="text-sky-400">from any website</span> in seconds.
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl">
              NewVision is a drop-in feedback widget. Add one{" "}
              <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px] text-sky-300">
                &lt;script&gt;
              </code>{" "}
              tag to your site, and feedback flows straight into your dashboard,
              backed by a real PostgreSQL database.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-colors"
            >
              View feedback dashboard
            </Link>
            <Link
              href="/install"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 hover:border-sky-500 hover:text-sky-300 transition-colors"
            >
              Get install snippet
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold mb-2">1. Embed</h2>
            <p className="text-xs text-slate-400">
              Paste a small script tag in your website. NewVision adds a floating
              feedback button automatically.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold mb-2">2. Collect</h2>
            <p className="text-xs text-slate-400">
              Visitors submit feedback. The widget calls your{" "}
              <code className="text-[11px] text-sky-300">/api/feedback</code>{" "}
              endpoint.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold mb-2">3. Analyze</h2>
            <p className="text-xs text-slate-400">
              All feedback is stored in Supabase and visible in your dashboard.
              Ready for future AI summarization and tagging.
            </p>
          </div>
        </section>

        {/* Code snippet preview */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-200">
            One-line install snippet
          </h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
            <pre className="overflow-x-auto">
              <code>{`<script
  src="https://YOUR_DOMAIN/embed.js"
  data-project-id="default_project"
  async
></script>`}</code>
            </pre>
            <p className="mt-3 text-[11px] text-slate-500">
              Replace <span className="text-sky-300">YOUR_DOMAIN</span> with your
              Vercel URL. Each project can have its own{" "}
              <span className="font-mono">project_id</span>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
