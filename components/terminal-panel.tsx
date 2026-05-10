"use client";

import { useId, useMemo } from "react";
import { Terminal } from "lucide-react";

const LINES = [
  { prefix: "$", text: "npx create-next-app@latest . --yes", dim: false },
  { prefix: "›", text: "Installing dependencies…", dim: true },
  { prefix: "›", text: "Tailwind · TypeScript · App Router", dim: true },
  { prefix: "✓", text: "Ready in 12s", dim: false },
  { prefix: "$", text: "npm run dev", dim: false },
  { prefix: "", text: "▸ Local  http://localhost:3000", dim: true },
];

export function TerminalPanel() {
  const uid = useId().replace(/:/g, "");
  const filterId = useMemo(() => `aurora-${uid}`, [uid]);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div
        className="overflow-hidden rounded-2xl border border-[var(--border)] bg-zinc-950/80 shadow-2xl shadow-black/50 ring-1 ring-white/[0.06]"
        role="region"
        aria-label="Terminal preview"
      >
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-black/40 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex flex-1 items-center justify-center gap-2 text-xs text-zinc-500">
            <Terminal className="h-3.5 w-3.5" aria-hidden />
            <span className="font-mono">ares-cli · zsh</span>
          </div>
        </div>
        <div className="relative p-4 font-mono text-sm leading-relaxed">
          <svg
            className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 opacity-40"
            aria-hidden
          >
            <defs>
              <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle
              cx="96"
              cy="96"
              r="56"
              className="fill-[var(--accent)]"
              filter={`url(#${filterId})`}
              opacity={0.35}
            />
          </svg>
          <ul className="relative space-y-2">
            {LINES.map((line, i) => (
              <li
                key={`${line.text}-${i}`}
                className={
                  line.dim
                    ? "text-zinc-500"
                    : "text-zinc-200 [&_.prefix]:text-[var(--accent)]"
                }
              >
                {line.prefix && (
                  <span className="prefix mr-2 select-none">{line.prefix}</span>
                )}
                {line.text}
              </li>
            ))}
            <li className="text-zinc-200">
              <span className="text-[var(--accent)]">$</span>{" "}
              <span className="cursor-blink ml-0.5 inline-block h-4 w-2 translate-y-1 bg-[var(--accent)]" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
