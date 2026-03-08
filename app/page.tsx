import Nav from "./components/Nav";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
          Compound OS
        </h1>
        <p className="mt-3 text-zinc-500 max-w-sm">
          Log what you are building across Media, Trading, Brand, and Life.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/new"
            className="px-5 py-2.5 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-700"
          >
            New Entry
          </Link>
          <Link
            href="/entries"
            className="px-5 py-2.5 border border-zinc-300 text-zinc-700 text-sm rounded-lg hover:bg-zinc-50"
          >
            View Entries
          </Link>
        </div>
      </main>
    </div>
  );
}
