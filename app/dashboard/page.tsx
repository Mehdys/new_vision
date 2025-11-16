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

  // Unique project IDs
  const projectOptions = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((row) => {
      if (row.project_id) set.add(row.project_id);
    });
    return Array.from(set);
  }, [rows]);

  // Tag stats
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

  // Apply filters
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
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Feedback Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Explore all feedback captured by your{" "}
              <span className="font-semibold text-sky-400">NewVision</span>{" "}
              widget, with filters and automatic tagging.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1 bg-slate-900/60">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live data from Supabase
            </span>
          </div>
        </header>

        {/* Filters + Tag summary */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 flex flex-col gap-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
            {/* Project filter + summary */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  Project
                </span>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="all">All projects</option>
                  {projectOptions.map((projectId) => (
                    <option key={projectId} value={projectId}>
                      {projectId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-slate-400">
                Total:{" "}
                <span className="font-semibold text-slate-100">
                  {rows.length}
                </span>{" "}
                entr{rows.length === 1 ? "y" : "ies"} · Showing{" "}
                <span className="font-semibold text-slate-100">
                  {filteredRows.length}
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-sm">
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Search (name, email, message, project)
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to filter feedback..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Tag summary chips */}
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-2 py-1">
              🐞 Bug reports:{" "}
              <span className="font-semibold">{tagStats.Bug}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-2 py-1">
              💡 Feature requests:{" "}
              <span className="font-semibold">{tagStats.Feature}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-2 py-1">
              💙 Praise:{" "}
              <span className="font-semibold">{tagStats.Praise}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-2 py-1">
              📝 Other:{" "}
              <span className="font-semibold">{tagStats.Other}</span>
            </span>
          </div>
        </section>

        {/* Content */}
        {loading ? (
          <section className="mt-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-10 text-center">
              <p className="text-sm text-slate-300 mb-2">
                Loading feedback…
              </p>
              <p className="text-xs text-slate-500">
                Fetching data securely from Supabase.
              </p>
            </div>
          </section>
        ) : error ? (
          <section className="mt-6">
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          </section>
        ) : filteredRows.length === 0 ? (
          <section className="mt-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-10 text-center">
              <h2 className="text-lg font-semibold mb-2">
                No feedback matches your filters 👀
              </h2>
              <p className="text-sm text-slate-400">
                Try clearing the search or selecting &quot;All projects&quot; to
                see more results.
              </p>
            </div>
          </section>
        ) : (
          <section className="space-y-3">
            {filteredRows.map((row) => {
              const tag = classifyFeedback(row.message);

              return (
                <article
                  key={row.id}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 md:px-5 md:py-5 shadow-sm hover:border-sky-500/60 hover:shadow-md hover:shadow-sky-500/10 transition-all"
                >
                  {/* Top row: name + date */}
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">
                          {row.name || "Anonymous"}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                          {row.email ? "User" : "Guest"}
                        </span>
                      </div>
                      {row.email && (
                        <a
                          href={`mailto:${row.email}`}
                          className="block text-xs text-slate-400 hover:text-sky-400 transition-colors"
                        >
                          {row.email}
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-1">
                      <span className="text-[11px] text-slate-500">
                        {new Date(row.created_at).toLocaleString()}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        {row.project_id || "default_project"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-100">
                        {tag === "Bug" && "🐞 Bug"}
                        {tag === "Feature" && "💡 Feature request"}
                        {tag === "Praise" && "💙 Praise"}
                        {tag === "Other" && "📝 Feedback"}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="mt-1 text-sm leading-relaxed text-slate-100 whitespace-pre-wrap">
                    {row.message}
                  </p>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
