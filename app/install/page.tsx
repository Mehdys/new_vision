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
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Install the NewVision Widget 🚀
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed">
            Paste this script tag into your website&apos;s{" "}
            <code className="rounded-md bg-blue-100 px-2 py-1 text-sm font-mono text-blue-700 border border-blue-300">
              &lt;head&gt;
            </code>{" "}
            or just before{" "}
            <code className="rounded-md bg-cyan-100 px-2 py-1 text-sm font-mono text-cyan-700 border border-cyan-300">
              &lt;/body&gt;
            </code>
            . A floating feedback button will appear automatically! ✨
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-blue-700">
              Current project:{" "}
              <span className="font-mono bg-blue-100 px-2 py-1 rounded text-blue-700 border border-blue-300">
                default_project
              </span>
            </p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center rounded-full border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {copied ? "✅ Copied!" : "📋 Copy Snippet"}
            </button>
          </div>

          <div className="rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-sm shadow-xl">
            <pre className="overflow-x-auto text-gray-800">
              <code className="font-mono">{EMBED_SNIPPET}</code>
            </pre>
          </div>

          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
            <p className="text-sm text-blue-700 font-medium">
              💡 <span className="font-bold">Tip:</span> In a real SaaS, each project would have its own{" "}
              <span className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-700">project_id</span>. 
              For now, this MVP uses{" "}
              <span className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-700">default_project</span> for learning.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
