"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { motion } from "motion/react";
import {
  Activity,
  BookOpen,
  ChevronDown,
  ExternalLink,
  GitBranch,
  Layers,
  LogOut,
  RefreshCw,
  Scale,
  Search,
  Share2,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  createBrowserSupabaseClient,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase/client";
import SimpleGraph from "@/components/react-bits/simple-graph";
import ShinyText from "@/components/react-bits/shiny-text";
import BlurHighlight from "@/components/react-bits/blur-highlight";
import ParallaxCards from "@/components/react-bits/parallax-cards";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";
const WHITEPAPER = "/ares-v3-whitepaper.pdf";

const fontSans = { fontFamily: "var(--font-geist-sans), system-ui" } as const;
const fontMono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" } as const;

const phases = [
  {
    phase: "1",
    title: "Regex & surface scan",
    body: "Fast structural passes and anchors for what to expand next—no heavy analysis yet.",
    icon: Search,
  },
  {
    phase: "2",
    title: "Macro-aware AST",
    body: "Account shapes and program structure after expansion, closer to what the chain actually runs.",
    icon: Layers,
  },
  {
    phase: "3",
    title: "Taint & dataflow",
    body: "Multi-phase taint tracking across the expanded graph for realistic propagation paths.",
    icon: Share2,
  },
  {
    phase: "4",
    title: "Judge & policy",
    body: "Deterministic scoring and guardrails—no model in the hot path for core verdicts.",
    icon: Scale,
  },
] as const;

const SAMPLE_BAR_HEIGHTS = [40, 65, 48, 72, 55, 80, 62, 88, 70] as const;
const SAMPLE_SPARKLINE = [12, 18, 14, 22, 19, 28, 24, 30, 26, 32];

const SAMPLE_RUNS = [
  {
    id: "scan_8f2a…c91",
    target: "programs/vault",
    status: "Completed",
    started: "2026-05-10 14:22 UTC",
    findings: "12",
  },
  {
    id: "scan_3d11…7ab",
    target: "examples/amm_stub",
    status: "Completed",
    started: "2026-05-09 09:05 UTC",
    findings: "4",
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

function KpiCard({
  label,
  value,
  hint,
  delay,
}: {
  label: string;
  value: string;
  hint: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5 backdrop-blur-md"
    >
      <p
        className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45"
        style={fontSans}
      >
        {label}
      </p>
      <p
        className="mt-2 text-2xl font-semibold tracking-tight text-white"
        style={fontMono}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-white/45" style={fontSans}>
        {hint}
      </p>
    </motion.div>
  );
}

export function DashboardView({ email }: { email: string | null }) {
  const router = useRouter();
  const configured = isSupabaseBrowserConfigured();
  const supabase = configured ? createBrowserSupabaseClient() : null;

  const graphData = useMemo(
    () =>
      SAMPLE_SPARKLINE.map((value, i) => ({
        value,
        label: `S${i + 1}`,
      })),
    [],
  );

  const parallaxCards = useMemo(
    () =>
      phases.map((p) => {
        const Icon = p.icon;
        return {
          title: p.title,
          description: p.body,
          icon: <Icon className="h-4 w-4 text-teal-300/90" aria-hidden />,
        };
      }),
    [],
  );

  const onSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <main
      className="mx-auto max-w-7xl px-4 py-10 text-white sm:px-6 lg:py-14"
      style={fontSans}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22 }}
          className="max-w-2xl space-y-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md border border-white/10 bg-zinc-950/60 px-2 py-1">
              <ShinyText
                text="Cloud ARES"
                className="text-[11px] font-medium uppercase tracking-[0.22em]"
                color="#64748b"
                shineColor="#e2e8f0"
                speed={3.5}
                spread={90}
                pauseOnHover
              />
            </span>
            <span className="rounded-full border border-white/12 bg-zinc-950/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/50">
              Preview UI
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-[clamp(1.75rem,4vw,2.5rem)]">
            Operations dashboard
          </h1>
          <BlurHighlight
            className="max-w-[65ch] text-base leading-relaxed text-white/70"
            highlightedBits={[
              "four-phase engine",
              "sample placeholders",
              "Cloud ARES API",
            ]}
            highlightColor="rgb(45 212 191)"
            highlightClassName="text-white font-medium"
            viewportOptions={{ once: true, amount: 0.35 }}
            blurDuration={0.75}
            highlightDuration={0.85}
          >
            Deterministic static analysis for Solana programs—same four-phase engine as the open
            repo. Charts and KPIs below use sample placeholders until your Cloud ARES API streams
            real runs.
          </BlurHighlight>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 no-underline transition hover:bg-zinc-200 active:translate-y-px"
            >
              <GitBranch className="h-4 w-4" aria-hidden />
              Engine on GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
            </a>
            <Link
              href={WHITEPAPER}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/18 bg-zinc-950/40 px-4 py-2.5 text-sm font-medium text-white no-underline backdrop-blur-sm transition hover:bg-white/10 active:translate-y-px"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Whitepaper (PDF)
            </Link>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.06 }}
          className="w-full max-w-md shrink-0 rounded-3xl border border-white/10 bg-zinc-950/55 p-6 backdrop-blur-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Signed in
              </p>
              <p
                className="mt-1 truncate text-sm font-medium text-white"
                title={email ?? undefined}
              >
                {email ?? "Account"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void onSignOut()}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/14 bg-black/35 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/10 active:translate-y-px"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Sign out
            </button>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-white/14 bg-black/25 p-4">
            <p className="text-xs leading-relaxed text-white/55">
              Linked Solana wallets, API keys, and live scan history will mount here when your
              backend is connected. Until then, use the local CLI from the repo.
            </p>
          </div>
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.05 }}
        className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950/40 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="dash-workspace">
            Workspace
          </label>
          <div className="relative min-w-[12rem] flex-1 sm:max-w-xs">
            <select
              id="dash-workspace"
              disabled
              className="h-11 w-full min-h-11 cursor-not-allowed appearance-none rounded-xl border border-white/10 bg-white/[0.06] pl-3 pr-9 text-sm text-white/70"
              title="Connect Cloud ARES to choose a workspace"
            >
              <option>Default workspace (preview)</option>
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
            className="h-11 min-h-11 w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-white/70 sm:w-40"
            title="Connect Cloud ARES to filter by window"
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

      <section className="mt-6" aria-label="Key metrics">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
          Headline metrics · placeholders
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Scans (7d)"
            value="—"
            hint="Wire POST /runs or equivalent"
            delay={0.02}
          />
          <KpiCard
            label="Open findings"
            value="—"
            hint="Aggregate from latest completed runs"
            delay={0.06}
          />
          <KpiCard
            label="Engine"
            value="—"
            hint="Pin from release / container image tag"
            delay={0.1}
          />
          <KpiCard
            label="Queue depth"
            value="—"
            hint="Dispatch not connected"
            delay={0.14}
          />
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2" aria-label="Trend charts preview">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.08 }}
          className="rounded-3xl border border-white/10 bg-zinc-950/35 p-5 backdrop-blur-md"
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-white">Runs over time</h2>
              <p className="mt-0.5 text-xs text-white/45">Sample series — not your data</p>
            </div>
            <Activity className="h-4 w-4 shrink-0 text-teal-400/80" aria-hidden />
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
          className="rounded-3xl border border-white/10 bg-zinc-950/35 p-5 backdrop-blur-md"
        >
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-white">Finding mix (stub)</h2>
              <p className="mt-0.5 text-xs text-white/45">Sample distribution for layout only</p>
            </div>
          </div>
          <div className="flex h-28 items-end justify-between gap-1.5 px-1">
            {SAMPLE_BAR_HEIGHTS.map((pct, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-slate-700/60 to-teal-500/45 transition-opacity hover:opacity-90"
                style={{ height: `${Math.max(8, Math.round((pct / 100) * 112))}px` }}
                title={`Sample bin ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mt-12" aria-labelledby="pipeline-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="pipeline-heading"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Analysis pipeline
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/55">
              Interactive stack (React Bits ParallaxCards). Same four phases as the Rust engine.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-xs text-white/60 backdrop-blur-sm">
            <Terminal className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <code className="text-[11px] text-teal-300/90" style={fontMono}>
              ares scan &lt;path&gt;
            </code>
          </div>
        </div>

        <div className="relative mx-auto h-[min(400px,50vh)] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/30">
          <ParallaxCards
            cards={parallaxCards}
            cardCount={4}
            perspective={2000}
            mouseSensitivity={2.2}
            cardWidth={272}
            cardHeight={188}
            animationDuration={0.95}
            enableDepthFog
            fogIntensity={0.9}
            className="min-h-[min(400px,50vh)]"
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-5" aria-label="Recent activity and guidance">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.1 }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/35 backdrop-blur-md lg:col-span-3"
        >
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Recent runs</h2>
            <p className="mt-0.5 text-xs text-teal-200/75">
              Sample rows for layout — replace with your API payload
            </p>
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
          className="flex flex-col gap-6 lg:col-span-2"
        >
          <div className="rounded-3xl border border-white/10 bg-zinc-950/40 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="h-4 w-4 text-teal-300/90" aria-hidden />
              <h3 className="text-sm font-semibold">Ship checklist</h3>
            </div>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-white/65">
              <li>Expose authenticated run list + WebSocket or polling for status.</li>
              <li>Map phase timings to the KPI row; keep engine version from your deploy.</li>
              <li>Swap sample chart series for aggregated counts from your warehouse.</li>
            </ol>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-teal-950/25 via-zinc-950/40 to-slate-950/50 p-6 backdrop-blur-md">
            <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
              <Image
                src="/ARES_LOGO_WHITE.png"
                alt=""
                width={72}
                height={72}
                className="object-contain opacity-90"
              />
            </div>
            <p className="text-center text-xs leading-relaxed text-white/55">
              Cloud ARES keeps the same deterministic core; React Bits visuals sit on Geist sans +
              mono per dashboard taste rules.
            </p>
            <Link
              href="/#get-started"
              className="mt-4 block min-h-11 w-full rounded-xl border border-white/14 bg-black/35 py-2.5 text-center text-sm font-medium text-white no-underline transition hover:bg-white/10 active:translate-y-px"
            >
              Marketing &amp; get started
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
