"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { motion } from "motion/react";
import {
  Activity,
  ChevronDown,
  ExternalLink,
  ListChecks,
  RefreshCw,
} from "lucide-react";
import SimpleGraph from "@/components/react-bits/simple-graph";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";

const fontSans = { fontFamily: "var(--font-geist-sans), system-ui" } as const;
const fontMono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" } as const;

const SAMPLE_BAR_HEIGHTS = [40, 65, 48, 72, 55, 80, 62, 88, 70] as const;
const SAMPLE_SPARKLINE = [12, 18, 14, 22, 19, 28, 24, 30, 26, 32];

const SAMPLE_RUNS = [
  {
    id: "scan_8f2a…c91",
    target: "programs/vault",
    status: "Completed",
    started: "2026-05-10 14:22 UTC",
    findings: "—",
  },
  {
    id: "scan_3d11…7ab",
    target: "examples/amm_stub",
    status: "Completed",
    started: "2026-05-09 09:05 UTC",
    findings: "—",
  },
  {
    id: "scan_9c00…2ff",
    target: "workspace/margin",
    status: "Failed (timeout)",
    started: "2026-05-08 21:41 UTC",
    findings: "—",
  },
] as const;

const TEAL_LINE = "#2dd4bf";
const TEAL_DOT = "#5eead4";

const SIGNAL_ROWS = [
  {
    name: "Scan volume",
    detail: "Wire your run list (POST /runs or queue consumer) to replace the sample table.",
  },
  {
    name: "Findings roll-up",
    detail: "Aggregate open items from the latest completed run per workspace.",
  },
  {
    name: "Engine pin",
    detail: "Surface image tag or release SHA from deploy so regressions map to a build.",
  },
  {
    name: "Queue depth",
    detail: "Optional: expose dispatcher backlog when Cloud ARES is connected.",
  },
] as const;

export function DashboardView() {
  const router = useRouter();

  const graphData = useMemo(
    () =>
      SAMPLE_SPARKLINE.map((value, i) => ({
        value,
        label: `S${i + 1}`,
      })),
    [],
  );

  return (
    <main
      className="mx-auto max-w-7xl px-4 py-10 text-white sm:px-6 lg:py-14"
      style={fontSans}
    >
      <header className="mb-8">
        <h1 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Overview</h1>
        <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-white/50">
          Signed-in shell. Charts and rows below are layout previews until your API backs them.
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.04 }}
        className="rounded-2xl border border-white/10 bg-zinc-950/45 p-6 backdrop-blur-md sm:p-7"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
          Integrations
        </p>
        <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/65">
          Wallet links, API keys, and live run history belong here once your backend is wired. No
          fabricated metrics on this page.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={GH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-zinc-950 no-underline transition hover:bg-white/90 active:translate-y-px"
          >
            Open repo
            <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
          </Link>
          <Link
            href="/#get-started"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/14 px-4 text-sm font-medium text-white/85 no-underline transition hover:bg-white/[0.07]"
          >
            Benchmark on the site
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.05 }}
        className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950/40 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="dash-workspace">
            Workspace
          </label>
          <div className="relative min-w-[12rem] flex-1 sm:max-w-xs">
            <select
              id="dash-workspace"
              disabled
              className="h-11 w-full min-h-11 cursor-not-allowed appearance-none rounded-xl border border-white/10 bg-zinc-950/50 pl-3 pr-9 text-sm text-white/60"
              title="Connect your API to list workspaces"
            >
              <option>Workspace (disconnected)</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
              aria-hidden
            />
          </div>
          <label className="sr-only" htmlFor="dash-window">
            Time window
          </label>
          <select
            id="dash-window"
            disabled
            className="h-11 min-h-11 w-full cursor-not-allowed rounded-xl border border-white/10 bg-zinc-950/50 px-3 text-sm text-white/60 sm:w-40"
            title="Connect your API to filter by time range"
          >
            <option>Last 7 days</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="inline-flex h-11 min-h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-4 text-sm font-medium text-white/90 transition hover:bg-white/10 active:translate-y-px"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Refresh
          </button>
        </div>
      </motion.div>

      <section className="mt-8" aria-labelledby="dash-signals-heading">
        <h2
          id="dash-signals-heading"
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40"
        >
          What you wire first
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.06 }}
          className="mt-3 divide-y divide-white/[0.08] rounded-2xl border border-white/10 bg-zinc-950/35 backdrop-blur-md"
        >
          {SIGNAL_ROWS.map((row) => (
            <div key={row.name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-8">
              <p className="shrink-0 text-sm font-medium text-white/85">{row.name}</p>
              <p className="text-sm leading-relaxed text-white/50">{row.detail}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2" aria-label="Chart layout preview">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.08 }}
          className="rounded-2xl border border-white/10 bg-zinc-950/35 p-5 backdrop-blur-md"
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-white">Runs over time</h2>
              <p className="mt-0.5 text-xs text-white/45">Static sample curve for spacing only</p>
            </div>
            <Activity className="h-4 w-4 shrink-0 text-teal-400/70" aria-hidden />
          </div>
          <div className="text-white">
            <SimpleGraph
              data={graphData}
              height={220}
              lineColor={TEAL_LINE}
              dotColor={TEAL_DOT}
              graphLineThickness={2}
              gradientFade
              showGrid
              gridStyle="dashed"
              curved
              showDots
              dotSize={5}
              dotHoverGlow={false}
              animationDuration={1.6}
              animateOnScroll
              animateOnce
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-zinc-950/35 p-5 backdrop-blur-md"
        >
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-white">Finding mix</h2>
              <p className="mt-0.5 text-xs text-white/45">Bars are decorative weights, not live counts</p>
            </div>
          </div>
          <div className="flex h-28 items-end justify-between gap-1.5 px-1">
            {SAMPLE_BAR_HEIGHTS.map((pct, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-zinc-700/55 to-zinc-500/35 transition-opacity hover:opacity-90"
                style={{ height: `${Math.max(8, Math.round((pct / 100) * 112))}px` }}
                title={`Preview bin ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3" aria-label="Recent activity and guidance">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/35 backdrop-blur-md lg:col-span-2"
        >
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Recent runs</h2>
            <p className="mt-0.5 text-xs text-white/45">Fictional IDs and paths for table rhythm only</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-medium uppercase tracking-wider text-white/45">
                  <th scope="col" className="px-5 py-3">
                    Scan
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Target
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Started
                  </th>
                  <th scope="col" className="px-5 py-3 text-right">
                    Findings
                  </th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_RUNS.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.03]"
                  >
                    <td
                      className="px-5 py-3 text-xs text-white/80"
                      style={fontMono}
                    >
                      {row.id}
                    </td>
                    <td className="px-3 py-3 text-white/65">{row.target}</td>
                    <td className="px-3 py-3 text-white/70">{row.status}</td>
                    <td
                      className="px-3 py-3 text-xs text-white/50"
                      style={fontMono}
                    >
                      {row.started}
                    </td>
                    <td
                      className="px-5 py-3 text-right text-xs text-white/75"
                      style={fontMono}
                    >
                      {row.findings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.14 }}
          className="lg:col-span-1"
        >
          <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white">
              <ListChecks className="h-4 w-4 text-teal-300/80" aria-hidden />
              <h3 className="text-sm font-semibold">Backend checklist</h3>
            </div>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-white/60">
              <li>Authenticated run list plus polling or WebSocket for status transitions.</li>
              <li>Map phase timings into the signals list; ship engine version from deploy metadata.</li>
              <li>Replace chart series with aggregates from your warehouse or metrics store.</li>
            </ol>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
