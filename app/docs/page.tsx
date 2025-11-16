import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Intro */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent mb-4">
            Developer Documentation
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            NewVision is an embeddable feedback widget that captures user feedback from any website 
            and stores it in a Supabase PostgreSQL database. Add one script tag to your site and 
            start collecting feedback instantly.
          </p>
        </section>

        {/* Quickstart */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quickstart</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Add the script tag</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Add the following script tag to your website's HTML, typically in the <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">{"<head>"}</code> or before the closing <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">{"</body>"}</code> tag.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400">
                  <code>{`<script
  src="/embed.js"
  data-project-id="default_project"
></script>`}</code>
                </pre>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-700">Note:</strong> Replace <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">/embed.js</code> with your full domain URL (e.g., <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">https://yourdomain.com/embed.js</code>). 
                  The <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">data-project-id</code> attribute allows you to organize feedback by project.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border-2 border-cyan-200 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">API Endpoint</h3>
              </div>
              <p className="text-gray-700 mb-4">
                The widget automatically sends feedback to the <code className="bg-cyan-100 px-1.5 py-0.5 rounded text-xs font-mono">POST /api/feedback</code> endpoint. 
                You can also call this endpoint directly from your application.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
                      <code>{`POST /api/feedback
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "This is great! I love the new feature.",
  "projectId": "default_project"
}`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Required Fields</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li><code className="bg-cyan-100 px-1.5 py-0.5 rounded text-xs font-mono">name</code> (string, required)</li>
                    <li><code className="bg-cyan-100 px-1.5 py-0.5 rounded text-xs font-mono">email</code> (string, required, valid email format)</li>
                    <li><code className="bg-cyan-100 px-1.5 py-0.5 rounded text-xs font-mono">message</code> (string, required, minimum 10 characters)</li>
                    <li><code className="bg-cyan-100 px-1.5 py-0.5 rounded text-xs font-mono">projectId</code> (string, optional, defaults to "default_project")</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border-2 border-sky-200 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">View data in Supabase</h3>
              </div>
              <p className="text-gray-700 mb-4">
                All feedback is stored in the <code className="bg-sky-100 px-1.5 py-0.5 rounded text-xs font-mono">feedback</code> table in your Supabase database.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Database Schema</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-3 font-semibold text-gray-900">Column</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900">Type</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs bg-sky-50">id</td>
                        <td className="py-2 px-3">UUID</td>
                        <td className="py-2 px-3">Primary key, auto-generated</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs bg-sky-50">name</td>
                        <td className="py-2 px-3">TEXT</td>
                        <td className="py-2 px-3">User's name</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs bg-sky-50">email</td>
                        <td className="py-2 px-3">TEXT</td>
                        <td className="py-2 px-3">User's email address</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs bg-sky-50">message</td>
                        <td className="py-2 px-3">TEXT</td>
                        <td className="py-2 px-3">Feedback message content</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs bg-sky-50">project_id</td>
                        <td className="py-2 px-3">TEXT</td>
                        <td className="py-2 px-3">Project identifier (from data-project-id)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono text-xs bg-sky-50">created_at</td>
                        <td className="py-2 px-3">TIMESTAMP</td>
                        <td className="py-2 px-3">Auto-generated timestamp</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Response Examples */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Response Examples</h2>
          
          <div className="space-y-6">
            {/* Success Response */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-emerald-700 mb-4">Success Response (200)</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400">
                  <code>{`{
  "success": true,
  "reply": "Thank you John Doe! Your feedback has been received and saved! ✅",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is great! I love the new feature.",
    "created_at": "2024-01-15T10:30:00.000Z",
    "project_id": "default_project"
  }
}`}</code>
                </pre>
              </div>
            </div>

            {/* Error Responses */}
            <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-red-700 mb-4">Error Responses</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Validation Error (400)</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-red-400">
                      <code>{`{
  "error": "All fields are required"
}`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Invalid Email (400)</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-red-400">
                      <code>{`{
  "error": "Invalid email format"
}`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Message Too Short (400)</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-red-400">
                      <code>{`{
  "error": "Message must be at least 10 characters long"
}`}</code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Database Error (500)</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-red-400">
                      <code>{`{
  "error": "Failed to save feedback. Please try again.",
  "details": "new row violates row-level security policy",
  "code": "42501"
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORS */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">CORS Support</h2>
          <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-lg">
            <p className="text-gray-700 mb-4">
              The API endpoint supports CORS and can be called from any domain. The following headers are included in all responses:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="text-sm text-gray-800">
                <code>{`Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Next Steps</h2>
          <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-lg">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">→</span>
                <span>Test the widget on the <Link href="/demo" className="text-blue-600 hover:underline font-semibold">live demo page</Link></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">→</span>
                <span>View submitted feedback in the <Link href="/dashboard" className="text-blue-600 hover:underline font-semibold">dashboard</Link></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">→</span>
                <span>Customize the <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">project_id</code> to organize feedback by project</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">→</span>
                <span>Set up your own Supabase database and configure environment variables</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl border-2 border-blue-300 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to integrate?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
              >
                Try Live Demo 🎯
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border-2 border-blue-400 bg-white px-6 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all transform hover:scale-105 shadow-md"
              >
                Back to Home 🏠
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

