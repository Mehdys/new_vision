'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Feedback = {
  id: string;
  name: string;
  email: string;
  message: string;
  project_id: string;
  created_at: string;
};

export default function TryItPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
  });
  const [loading, setLoading] = useState(true);

  // Load widget
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/embed.js';
    script.setAttribute('data-project-id', 'demo_project');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const widget = document.getElementById('newvision-widget-root');
      if (widget) {
        widget.remove();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Fetch feedbacks and update in real-time
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/feedback');
        const json = await res.json();
        if (json.data) {
          setFeedbacks(json.data);
          
          // Calculate stats
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          
          const todayCount = json.data.filter((f: Feedback) => {
            const date = new Date(f.created_at);
            return date >= today;
          }).length;
          
          const weekCount = json.data.filter((f: Feedback) => {
            const date = new Date(f.created_at);
            return date >= weekAgo;
          }).length;
          
          setStats({
            total: json.data.length,
            today: todayCount,
            thisWeek: weekCount,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
    
    // Poll every 3 seconds for real-time updates
    const interval = setInterval(fetchFeedbacks, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
            Try It Live - Real-Time Feedback
          </h1>
          <p className="text-lg text-gray-700">
            Submit feedback using the widget button in the bottom-right corner. 
            Watch it appear here in real-time! ⚡
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-xl">
            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">
              Total Feedback
            </div>
            <div className="text-4xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-500 mt-2">All time</div>
          </div>
          
          <div className="bg-white rounded-2xl border-2 border-cyan-200 p-6 shadow-xl">
            <div className="text-sm font-semibold text-cyan-700 uppercase tracking-wide mb-2">
              Today
            </div>
            <div className="text-4xl font-bold text-cyan-600">{stats.today}</div>
            <div className="text-xs text-gray-500 mt-2">Last 24 hours</div>
          </div>
          
          <div className="bg-white rounded-2xl border-2 border-sky-200 p-6 shadow-xl">
            <div className="text-sm font-semibold text-sky-700 uppercase tracking-wide mb-2">
              This Week
            </div>
            <div className="text-4xl font-bold text-sky-600">{stats.thisWeek}</div>
            <div className="text-xs text-gray-500 mt-2">Last 7 days</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl border-2 border-blue-300 p-6 mb-8 text-center">
          <div className="text-3xl mb-3">👇</div>
          <p className="text-blue-700 font-semibold text-lg">
            Click the floating button in the bottom-right corner to submit feedback!
          </p>
          <p className="text-blue-600 text-sm mt-2">
            New submissions will appear here automatically ⚡
          </p>
        </div>

        {/* Live Feedbacks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Live Feedbacks {loading && <span className="text-sm text-gray-500">(Loading...)</span>}
          </h2>
          
          {feedbacks.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-12 text-center shadow-xl">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-700 font-semibold text-lg mb-2">
                No feedback yet
              </p>
              <p className="text-gray-600 text-sm">
                Be the first to submit feedback using the widget button!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.slice(0, 10).map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-lg hover:shadow-xl transition-all animate-in fade-in"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-lg">
                          {feedback.name}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                          New ✨
                        </span>
                      </div>
                      <div className="text-sm text-blue-600">{feedback.email}</div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {formatTime(feedback.created_at)}
                    </div>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{feedback.message}</p>
                  <div className="mt-3 pt-3 border-t border-blue-100">
                    <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full font-semibold">
                      Project: {feedback.project_id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-700">Ready to add this to your website?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/install"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105"
            >
              Get Install Code ✨
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border-2 border-blue-400 bg-white px-6 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all transform hover:scale-105 shadow-md"
            >
              View Full Dashboard 📊
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
