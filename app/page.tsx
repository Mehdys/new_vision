import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-blue-300 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            ✨ Production-ready feedback widget powered by Next.js & Supabase
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
            Collect user feedback
            <span className="block">without the chaos</span>
      </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            NewVision is an embeddable feedback widget that captures, stores, and organizes user feedback 
            in one place. One script tag. Zero configuration. Real database.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
            >
              Try Live Demo 🎯
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border-2 border-blue-400 bg-white px-8 py-4 text-base font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all transform hover:scale-105 shadow-md"
            >
              View Docs 📚
            </Link>
          </div>
          
          {/* Widget + Dashboard Preview Card */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border-2 border-blue-100">
                  <div className="text-sm font-semibold text-blue-700 mb-3">Widget Preview</div>
                  <div className="space-y-3">
                    <div className="h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-blue-700 font-mono">✨ Feedback Button</span>
                    </div>
                    <div className="h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Floating Form</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-blue-100">
                  <div className="text-sm font-semibold text-blue-700 mb-3">Dashboard Preview</div>
                  <div className="space-y-2">
                    <div className="h-4 bg-blue-100 rounded w-3/4"></div>
                    <div className="h-4 bg-cyan-100 rounded w-1/2"></div>
                    <div className="h-4 bg-sky-100 rounded w-5/6"></div>
                    <div className="h-4 bg-blue-100 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Built for teams who care about user feedback
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border-2 border-blue-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-blue-700 mb-3">SaaS Founders</h3>
            <p className="text-gray-700">
              Stop losing feedback in email threads. Capture it directly from your product 
              and make data-driven decisions.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-cyan-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-cyan-700 mb-3">Indie Hackers</h3>
            <p className="text-gray-700">
              Ship faster with a feedback system that works out of the box. No backend setup, 
              no database management.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-sky-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-sky-700 mb-3">Product Teams</h3>
            <p className="text-gray-700">
              Centralize feedback from multiple sources. Track priorities, categorize requests, 
              and build what users actually want.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white/50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          The feedback problem
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-6">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-lg font-bold text-red-700 mb-2">Scattered everywhere</h3>
            <p className="text-sm text-gray-700">
              Feedback lives in emails, Slack messages, Twitter DMs, and support tickets. 
              Impossible to track and prioritize.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
            <div className="text-3xl mb-3">📥</div>
            <h3 className="text-lg font-bold text-amber-700 mb-2">Goes unread</h3>
            <p className="text-sm text-gray-700">
              Important feedback gets buried in inboxes. By the time you find it, 
              the context is lost and the user has moved on.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
            <div className="text-3xl mb-3">❓</div>
            <h3 className="text-lg font-bold text-orange-700 mb-2">No clear priorities</h3>
            <p className="text-sm text-gray-700">
              Without a system, you can't tell which feedback is urgent, which features 
              are most requested, or what bugs affect the most users.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          The NewVision solution
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 p-8 shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Collect</h3>
            <p className="text-gray-700 mb-4">
              Add one script tag to your website. The embeddable widget creates a floating 
              feedback button that works on any page.
            </p>
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <code className="text-xs font-mono text-gray-800">
                &lt;script src="/embed.js" data-project-id="..."&gt;&lt;/script&gt;
              </code>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-50 p-8 shadow-lg">
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-2xl font-bold text-cyan-700 mb-4">Store</h3>
            <p className="text-gray-700 mb-4">
              All feedback is automatically saved to your Supabase PostgreSQL database via 
              the <code className="bg-cyan-100 px-1.5 py-0.5 rounded text-xs font-mono">/api/feedback</code> endpoint.
            </p>
            <div className="bg-white rounded-lg p-3 border border-cyan-200">
              <code className="text-xs font-mono text-gray-800">
                POST /api/feedback
              </code>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-8 shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-sky-700 mb-4">Understand</h3>
            <p className="text-gray-700 mb-4">
              View all feedback in your dashboard. Filter by project, search messages, 
              and get automatic categorization (coming soon: AI-powered insights).
            </p>
            <div className="bg-white rounded-lg p-3 border border-sky-200">
              <code className="text-xs font-mono text-gray-800">
                Dashboard → /dashboard
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white/50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-2xl font-bold mb-6 shadow-lg">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Add script tag</h3>
            <p className="text-gray-700 mb-6">
              Copy and paste the embed script into your website's HTML. 
              The widget appears automatically.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-left">
              <pre className="text-xs text-green-400 overflow-x-auto">
                <code>{`<script
  src="/embed.js"
  data-project-id="default_project"
></script>`}</code>
              </pre>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white text-2xl font-bold mb-6 shadow-lg">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Users send feedback</h3>
            <p className="text-gray-700 mb-6">
              Visitors click the floating button, fill out the form, and submit. 
              The widget handles everything.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="text-sm text-gray-700">
                ✨ Feedback button → Form → Submit
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-2xl font-bold mb-6 shadow-lg">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Stored in database</h3>
            <p className="text-gray-700 mb-6">
              Feedback is saved to Supabase with metadata (name, email, message, project_id, timestamp).
            </p>
            <div className="bg-cyan-50 rounded-lg p-4 border-2 border-cyan-200">
              <div className="text-sm text-gray-700 font-mono">
                Supabase → feedback table
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview Teaser */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See it in action
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Try the live widget demo. Submit feedback and watch it appear in real-time. 
            No signup required.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
          >
            Try Live Demo 🎯
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-blue-200">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Try the live demo or read the documentation to integrate NewVision into your website.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
            >
              Try Live Demo 🎯
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border-2 border-blue-400 bg-white px-8 py-4 text-base font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all transform hover:scale-105 shadow-md"
            >
              View Docs 📚
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
