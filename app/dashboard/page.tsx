"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type FeedbackRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  project_id: string;
  created_at: string;
};

type FeedbackTag = "Bug" | "Feature" | "Praise" | "Other";

function classifyFeedback(message: string): FeedbackTag {
  const m = message.toLowerCase();

  if (
    m.includes("bug") ||
    m.includes("error") ||
    m.includes("doesn't work") ||
    m.includes("doesnt work") ||
    m.includes("crash") ||
    m.includes("broken")
  ) {
    return "Bug";
  }

  if (
    m.includes("would love") ||
    m.includes("feature") ||
    m.includes("could you add") ||
    m.includes("add an option") ||
    m.includes("it would be great if")
  ) {
    return "Feature";
  }

  if (
    m.includes("love") ||
    m.includes("great") ||
    m.includes("exactly what we needed") ||
    m.includes("super") ||
    m.includes("amazing") ||
    m.includes("smooth")
  ) {
    return "Praise";
  }

  return "Other";
}

export default function DashboardPage() {
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Dashboard Supabase error:", error);
          setError(error.message || "Error loading feedback");
          setRows([]);
          return;
        }

        setRows((data || []) as FeedbackRow[]);
      } catch (err) {
        console.error("Unexpected dashboard error:", err);
        setError("Unexpected error while loading feedback");
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const projectOptions = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((row) => {
      if (row.project_id) set.add(row.project_id);
    });
    return Array.from(set);
  }, [rows]);

  const tagStats = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        const tag = classifyFeedback(row.message);
        acc[tag] += 1;
        return acc;
      },
      { Bug: 0, Feature: 0, Praise: 0, Other: 0 } as Record<FeedbackTag, number>
    );
  }, [rows]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesProject =
        selectedProject === "all" || row.project_id === selectedProject;

      if (!matchesProject) return false;

      if (!term) return true;

      const haystack = (
        (row.name || "") +
        " " +
        (row.email || "") +
        " " +
        (row.message || "") +
        " " +
        (row.project_id || "")
      ).toLowerCase();

      return haystack.includes(term);
    });
  }, [rows, selectedProject, searchTerm]);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Feedback Dashboard 📊
          </h1>
          <p className="text-base text-gray-700 max-w-xl">
            This page shows how NewVision stores and displays feedback from your
            widget. Filter by project, search messages, and see an automatic
            breakdown of bugs, feature requests and praise.
          </p>
        </header>

        {/* Summary cards */}
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 px-5 py-4 shadow-lg">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Total feedback</p>
            <p className="text-3xl font-bold mt-2 text-blue-600">{rows.length}</p>
          </div>
          <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50 px-5 py-4 shadow-lg">
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">🐞 Bugs</p>
            <p className="text-3xl font-bold mt-2 text-red-600">{tagStats.Bug}</p>
          </div>
          <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 px-5 py-4 shadow-lg">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">💡 Features</p>
            <p className="text-3xl font-bold mt-2 text-amber-600">{tagStats.Feature}</p>
          </div>
          <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 px-5 py-4 shadow-lg">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">💙 Praise</p>
            <p className="text-3xl font-bold mt-2 text-emerald-600">{tagStats.Praise}</p>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 px-5 py-4 flex flex-col gap-4 shadow-lg">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                  Project
                </span>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="bg-white border-2 border-blue-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                >
                  <option value="all">All projects</option>
                  {projectOptions.map((projectId) => (
                    <option key={projectId} value={projectId}>
                      {projectId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm font-medium text-blue-700">
                Showing{" "}
                <span className="font-bold text-cyan-600">
                  {filteredRows.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-blue-600">
                  {rows.length}
                </span>{" "}
                feedback entr{rows.length === 1 ? "y" : "ies"} ✨
              </div>
            </div>

            <div className="flex-1 max-w-sm">
              <label className="block text-xs font-bold text-blue-700 mb-1 uppercase tracking-wide">
                Search 🔍
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to filter feedback..."
                className="w-full bg-white border-2 border-blue-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        {loading ? (
          <section className="mt-4">
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 px-8 py-10 text-center shadow-lg">
              <p className="text-base font-semibold text-blue-700 mb-2">Loading feedback… ⏳</p>
              <p className="text-sm text-blue-600">
                Fetching data from Supabase.
              </p>
            </div>
          </section>
        ) : error ? (
          <section className="mt-4">
            <div className="rounded-2xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-rose-50 px-5 py-4 text-sm font-medium text-red-800 shadow-lg">
              ⚠️ {error}
            </div>
          </section>
        ) : filteredRows.length === 0 ? (
          <section className="mt-4">
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 px-8 py-10 text-center shadow-lg">
              <h2 className="text-lg font-bold text-blue-700 mb-2">
                No feedback matches your filters 👀
              </h2>
              <p className="text-sm text-blue-600">
                Try clearing the search or selecting &quot;All projects&quot;.
              </p>
            </div>
          </section>
        ) : (
          <section className="space-y-4">
            {filteredRows.map((row) => {
              const tag = classifyFeedback(row.message);

              return (
                <article
                  key={row.id}
                  className="rounded-2xl border-2 border-blue-200 bg-white px-5 py-4 shadow-lg hover:shadow-xl hover:border-cyan-300 transition-all"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-base text-gray-900">
                          {row.name || "Anonymous"}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-300">
                          {row.email ? "👤 User" : "👋 Guest"}
                        </span>
                      </div>
                      {row.email && (
                        <a
                          href={`mailto:${row.email}`}
                          className="block text-xs text-blue-600 hover:text-cyan-600 font-medium transition-colors mt-1"
                        >
                          {row.email}
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span className="text-xs font-medium text-blue-600">
                        {new Date(row.created_at).toLocaleString()}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-300">
                          🏷️ {row.project_id || "default_project"}
                        </span>
                        <span
                          className={
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold border-2 " +
                            (tag === "Bug"
                              ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-300"
                              : tag === "Feature"
                              ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-300"
                              : tag === "Praise"
                              ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-300"
                              : "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-300")
                          }
                        >
                          {tag === "Bug" && "🐞 Bug"}
                          {tag === "Feature" && "💡 Feature"}
                          {tag === "Praise" && "💙 Praise"}
                          {tag === "Other" && "📝 Feedback"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap font-medium">
                    {row.message}
                  </p>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}
