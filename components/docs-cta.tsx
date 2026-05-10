import Link from "next/link";

export function DocsCta() {
  return (
    <section
      id="docs"
      className="scroll-mt-24 border-t border-[var(--border)] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent-dim)] to-transparent p-10 md:p-14">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Ready for your stack markers
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Wire this shell to your API routes, auth provider, and analytics. The page is
          static-friendly: no client JS until you opt into islands like the terminal.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="https://nextjs.org/docs"
            className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 hover:opacity-90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js docs
          </Link>
          <Link
            href="#ideas"
            className="inline-flex h-11 items-center rounded-full border border-[var(--border)] px-6 text-sm font-medium text-white hover:bg-white/5"
          >
            Back to templates
          </Link>
        </div>
      </div>
    </section>
  );
}
