import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-semibold text-zinc-900 tracking-tight">
        Compound OS
      </Link>
      <div className="flex gap-6 text-sm text-zinc-500">
        <Link href="/entries" className="hover:text-zinc-900">Entries</Link>
        <Link href="/new" className="hover:text-zinc-900">+ New</Link>
      </div>
    </nav>
  );
}
