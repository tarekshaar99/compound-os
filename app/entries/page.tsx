"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import { Entry, Domain } from "../lib/types";

const DOMAINS: Domain[] = ["Media", "Trading", "Brand", "Life"];

export default function Entries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [query, setQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState<Domain | "All">("All");

  useEffect(() => {
    fetch("/api/entries")
      .then((r) => r.json())
      .then(setEntries);
  }, []);

  async function handleDelete(id: string) {
    await fetch(`/api/entries/${id}`, { method: "DELETE" });
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const filtered = entries
    .filter((e) => domainFilter === "All" || e.domain === domainFilter)
    .filter((e) => {
      const q = query.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.notes.toLowerCase().includes(q);
    });

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-zinc-900">Entries</h2>
          <Link
            href="/new"
            className="text-sm px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700"
          >
            + New
          </Link>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search entries..."
            className="flex-1 border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value as Domain | "All")}
            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            <option value="All">All</option>
            {DOMAINS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {entries.length === 0 ? (
          <p className="text-zinc-400 text-sm">No entries yet. Add your first one.</p>
        ) : filtered.length === 0 ? (
          <p className="text-zinc-400 text-sm">No entries match your search.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {filtered.map((entry) => (
              <li
                key={entry.id}
                className="border border-zinc-200 rounded-lg px-4 py-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <Link
                    href={`/entries/${entry.id}`}
                    className="font-medium text-zinc-900 hover:underline"
                  >
                    {entry.title}
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                      {entry.domain}
                    </span>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-xs text-zinc-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{entry.notes}</p>
                )}
                <p className="text-xs text-zinc-400 mt-2">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
