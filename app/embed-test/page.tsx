import Script from "next/script";

export default function EmbedTestPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">NewVision Embed Test</h1>
        <p className="text-sm text-slate-400">
          This page simulates an external website that embeds your NewVision
          feedback widget via a &lt;script&gt; tag.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
          Scroll to the bottom-right corner to see the ✨ Feedback widget.
        </div>
      </div>

      {/* The actual embed script */}
      <Script
        src="/embed.js"
        data-project-id="default_project"
        async
        strategy="afterInteractive"
      />
    </main>
  );
}
