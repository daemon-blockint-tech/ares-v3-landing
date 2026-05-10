import Link from "next/link";
import { ChevronRight } from "lucide-react";

const nav = [
  { label: "Ideas", href: "#ideas" },
  { label: "Workflow", href: "#workflow" },
  { label: "Docs", href: "#docs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-dim)] text-[var(--accent)] ring-1 ring-[var(--accent)]/30">
            A
          </span>
          <span>ARES</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="#docs"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline"
          >
            Log in
          </Link>
          <Link
            href="#start"
            className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
          >
            Start building
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
