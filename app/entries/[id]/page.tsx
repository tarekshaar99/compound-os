"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Nav from "../../components/Nav";
import { Entry } from "../../lib/types";

export default function EntryDetail() {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<Entry | null | "not-found">(null);

  useEffect(() => {
    fetch(`/api/entries/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setEntry(data ?? "not-found"));
  }, [id]);

  if (entry === null) return null;

  if (entry === "not-found") {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <main className="max-w-xl mx-auto px-6 py-12">
          <p className="text-zinc-500 text-sm mb-4">Entry not found.</p>
          <Link href="/entries" className="text-sm text-zinc-400 hover:text-zinc-700">
            ← Back to entries
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/entries" className="text-sm text-zinc-400 hover:text-zinc-700">
            ← Back to entries
          </Link>
          <Link
            href={`/entries/${entry.id}/edit`}
            className="text-sm px-4 py-2 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50"
          >
            Edit
          </Link>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl font-semibold text-zinc-900">{entry.title}</h1>
            <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
              {entry.domain}
            </span>
          </div>

          <p className="text-xs text-zinc-400 mb-6">
            {new Date(entry.createdAt).toLocaleDateString()}
          </p>

          {entry.notes ? (
            <p className="text-sm text-zinc-700 whitespace-pre-wrap">{entry.notes}</p>
          ) : (
            <p className="text-sm text-zinc-400">No notes added.</p>
          )}
        </div>
      </main>
    </div>
  );
}
