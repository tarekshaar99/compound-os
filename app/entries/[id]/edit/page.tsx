"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../../components/Nav";
import { Domain } from "../../../lib/types";

const DOMAINS: Domain[] = ["Media", "Trading", "Brand", "Life"];

export default function EditEntry() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState<Domain>("Media");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch(`/api/entries/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((entry) => {
        if (!entry) {
          router.replace("/entries");
        } else {
          setTitle(entry.title);
          setDomain(entry.domain);
          setNotes(entry.notes);
        }
      });
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(`/api/entries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, domain, notes }),
    });
    router.push(`/entries/${id}`);
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-8">Edit Entry</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              rows={5}
              className="border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 border border-zinc-300 text-zinc-700 text-sm rounded-lg hover:bg-zinc-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
