"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";

const tiers = ["Open source", "Commercial seat", "Team / volume"] as const;

const coreRows: Array<{ label: string; values: Array<true | string> }> = [
  {
    label: "Four-phase engine (regex → macro-aware AST → taint → judge)",
    values: [true, true, true],
  },
  {
    label: "Public clone under MIT / Apache-2.0 (same bytes, same findings)",
    values: [true, true, true],
  },
  {
    label: "Two-segment benchmark harness in repo",
    values: [true, true, true],
  },
  {
    label: "Written commercial seat + Authorized User in agreement",
    values: ["OSS terms only", "One named developer per purchase", "Volume or site-wide via contract"],
  },
];

const surfaceRows: Array<{ label: string; values: Array<true | string> }> = [
  {
    label: "Local CLI scan + CI / pre-push",
    values: [true, true, true],
  },
  {
    label: "Optional API server & orchestration (non-core)",
    values: [true, "Use under commercial grant for Licensee work", "As agreed in writing"],
  },
  {
    label: "IDE extension (roadmap)",
    values: [true, true, true],
  },
];

const procurementRows: Array<{ label: string; values: Array<true | string> }> = [
  {
    label: "x402 USDC checkout on this site (PayAI facilitator by default)",
    values: ["—", "Included path", "Custom invoicing / gateway as agreed"],
  },
  {
    label: "Optional pay.sh gateway URL (operator-published)",
    values: ["—", "Same seat price when configured", "As agreed in writing"],
  },
];

function Cell({ v }: { v: true | string }) {
  if (v === true) {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-zinc-950">
        <Check className="h-3 w-3" aria-hidden />
      </span>
    );
  }
  return <p className="text-sm leading-relaxed text-white/70">{v}</p>;
}

function Section({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; values: Array<true | string> }>;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-zinc-800">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="grid w-full cursor-pointer grid-cols-4 items-center py-5 text-left"
      >
        <span className="col-span-1 text-lg font-medium text-white">{title}</span>
        <span className="col-span-3 flex justify-end pr-2 text-white/45" aria-hidden>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>
      {open &&
        rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-1 items-start gap-6 border-t border-zinc-800 py-5 md:grid-cols-4"
          >
            <p className="text-sm text-white/80">{r.label}</p>
            {r.values.map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs font-medium uppercase tracking-wider text-white/45 md:hidden">
                  {tiers[i]}
                </span>
                <Cell v={v} />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default function Pricing8() {
  return (
    <section className="w-full bg-landing-canvas px-4 py-16 text-white sm:px-6 lg:px-12 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
          Plans
        </p>
        <div className="mb-12 grid grid-cols-1 items-start gap-8 md:grid-cols-4">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.25rem]"
          >
            Compare
            <br />
            every plan
          </motion.h1>

          {tiers.map((t, i) => (
            <div key={t} className="flex flex-col gap-4 border-t border-zinc-800 pt-6 md:border-t-0 md:pt-0">
              <div>
                <p className="text-lg font-medium text-white">{t}</p>
                <p className="mt-1 text-sm text-white/50">
                  {i === 0 && "$0 — core in GitHub"}
                  {i === 1 && "$299 one-time — one seat"}
                  {i === 2 && "Quote — multi-seat or site-wide"}
                </p>
              </div>
              {i === 0 && (
                <a
                  href={GH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full min-h-11 items-center justify-center rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-white/90 no-underline"
                >
                  Clone on GitHub
                </a>
              )}
              {i === 1 && (
                <Link
                  href="/license/pay"
                  className="inline-flex w-full min-h-11 items-center justify-center rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-white/90 no-underline"
                >
                  Buy commercial seat
                </Link>
              )}
              {i === 2 && (
                <Link
                  href="/license"
                  className="inline-flex w-full min-h-11 items-center justify-center rounded-full border border-zinc-600 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-900 no-underline"
                >
                  Read team terms
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 px-2 sm:px-4">
          <Section title="Core & license" rows={coreRows} />
          <Section title="Surfaces" rows={surfaceRows} />
          <Section title="Checkout & procurement" rows={procurementRows} />
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/50">
          Open source deliberately keeps the analyzer free to clone and run; that trades short-term
          revenue for distribution and scrutiny. The optional commercial seat exists so teams that
          need a contract, seat accounting, and x402 checkout can still align with the same engine.
        </p>
      </div>
    </section>
  );
}
