'use client';

import { useEffect } from 'react';

export default function DemoPage() {
  useEffect(() => {
    // Wait for body to be ready before loading script
    const loadScript = () => {
      // Check if widget already exists
      if (document.getElementById('newvision-widget-root')) {
        console.log('[Demo] Widget already exists');
        return;
      }

      const script = document.createElement('script');
      script.src = '/embed.js';
      script.setAttribute('data-project-id', 'default_project');
      script.async = true;
      script.onload = () => {
        console.log('[Demo] Widget script loaded successfully');
      };
      script.onerror = (error) => {
        console.error('[Demo] Error loading widget script:', error);
      };
      
      if (document.body) {
        document.body.appendChild(script);
      } else {
        // Wait for body to be ready
        const observer = new MutationObserver((mutations, obs) => {
          if (document.body) {
            document.body.appendChild(script);
            obs.disconnect();
          }
        });
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }
    };

    // Load script when component mounts
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadScript);
    } else {
      loadScript();
    }

    return () => {
      // Cleanup: remove the widget when component unmounts
      const widget = document.getElementById('newvision-widget-root');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Live Widget Demo
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              This page demonstrates the NewVision feedback widget in action. 
              The widget sends data to <code className="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-700">/api/feedback</code> 
              and saves it to your Supabase database.
            </p>
          </div>

          {/* Demo Card */}
          <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-blue-300 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Widget Active
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Try the feedback widget
                </h2>
                <p className="text-gray-700 max-w-xl mx-auto">
                  Look at the <strong className="text-blue-600">bottom-right corner</strong> of this page. 
                  You'll see a floating "✨ Feedback" button. Click it to open the feedback form.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">👇</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-700 mb-2">How to test:</h3>
                    <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                      <li>Find the floating button in the bottom-right corner</li>
                      <li>Click it to open the feedback form</li>
                      <li>Fill in your name, email, and message</li>
                      <li>Submit the form</li>
                      <li>Check the <a href="/dashboard" className="text-blue-600 hover:underline font-semibold">dashboard</a> to see your feedback saved</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">Technical Details</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <strong className="text-gray-900">Widget Script:</strong>
                    <pre className="mt-1 bg-gray-900 rounded p-3 text-green-400 text-xs overflow-x-auto">
                      <code>{`<script
  src="/embed.js"
  data-project-id="default_project"
></script>`}</code>
                    </pre>
                  </div>
                  <div>
                    <strong className="text-gray-900">API Endpoint:</strong>
                    <code className="ml-2 bg-blue-100 px-2 py-1 rounded text-xs font-mono text-blue-700">
                      POST /api/feedback
                    </code>
                  </div>
                  <div>
                    <strong className="text-gray-900">Database:</strong>
                    <span className="ml-2 text-gray-600">Supabase PostgreSQL → feedback table</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <a
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-full border-2 border-blue-400 bg-white px-6 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all shadow-md"
                >
                  Read Integration Docs 📚
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}

