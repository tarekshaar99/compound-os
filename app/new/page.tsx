"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";
import { Domain } from "../lib/types";

const DOMAINS: Domain[] = ["Media", "Trading", "Brand", "Life"];

export default function NewEntry() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState<Domain>("Media");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, domain, notes }),
    });
    router.push("/entries");
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-8">New Entry</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What are you building?"
              className="border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">Domain</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value as Domain)}
              className="border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any thoughts, context, or next steps..."
              rows={5}
              className="border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="self-start px-5 py-2.5 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </main>
    </div>
  );
}
