"use client";

import { useState } from "react";

const EMBED_SNIPPET = `<script
  src="https://newvision-dkd5znbqd-mehdigrs-projects-89e94f9c.vercel.app/embed.js"
  data-project-id="default_project"
  async
></script>`;

export default function InstallPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMBED_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Failed to copy snippet", e);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Install the NewVision widget
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Paste this script tag into your website&apos;s{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px] text-sky-300">
              &lt;head&gt;
            </code>{" "}
            or just before{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px] text-sky-300">
              &lt;/body&gt;
            </code>
            . A floating feedback button will appear automatically.
          </p>
        </header>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              Current project:{" "}
              <span className="font-mono text-slate-200">
                default_project
              </span>
            </p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-300 transition-colors"
            >
              {copied ? "Copied ✅" : "Copy snippet"}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
            <pre className="overflow-x-auto">
              <code>{EMBED_SNIPPET}</code>
            </pre>
          </div>

          <p className="text-[11px] text-slate-500">
            In a real SaaS, each project would have its own{" "}
            <span className="font-mono">project_id</span>. For now, this MVP uses{" "}
            <span className="font-mono">default_project</span> for learning.
          </p>
        </section>
      </div>
    </main>
  );
}
