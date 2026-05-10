import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-16 md:pb-24">
      <div className="pointer-events-none absolute inset-0 aurora opacity-90" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-mask opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-zinc-400">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
          Builder preview · App Router ready
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          Turn a rough idea into a{" "}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--violet)] bg-clip-text text-transparent">
            shipped UI
          </span>{" "}
          in one sitting.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Clone-ready landing scaffold: hero, live-style terminal, starter ideas grid,
          and conversion paths, structured like modern builder homepages, without the
          leaky markup.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            id="start"
            href="#ideas"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Browse starters
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="#workflow"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border)] px-6 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            See workflow
          </Link>
        </div>
      </div>
    </section>
  );
}
