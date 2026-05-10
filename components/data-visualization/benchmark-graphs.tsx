"use client";

import type { ReactNode } from "react";
import SimpleGraph from "@/components/react-bits/simple-graph";
import {
  headToHeadRecallPercent,
  segmentBAggregatePercent,
  segmentBFalsePositives,
  WHITEPAPER_SOURCE_LABEL,
} from "@/lib/data-visualization/whitepaper-benchmark";

function ChartSection({
  sectionId,
  title,
  description,
  insight,
  children,
  tableCaption,
  tableHeaders,
  rows,
}: {
  sectionId: string;
  title: string;
  description: string;
  insight: string;
  children: ReactNode;
  tableCaption: string;
  tableHeaders: [string, string];
  rows: { label: string; value: string }[];
}) {
  return (
    <section
      className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8"
      aria-labelledby={sectionId}
    >
      <h2
        id={sectionId}
        className="text-xl font-medium tracking-tight text-white sm:text-2xl"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
        {description}
      </p>
      <p className="mt-3 text-sm font-medium text-[var(--solana-green)]">
        {insight}
      </p>
      <div className="mt-6 rounded-xl border border-zinc-800/80 bg-black/40 p-4">
        {children}
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[280px] text-left text-sm text-white/80">
          <caption className="mb-2 text-left text-xs text-white/50">
            {tableCaption}
          </caption>
          <thead>
            <tr className="border-b border-zinc-700 text-white/90">
              <th scope="col" className="pb-2 pr-4 font-medium">
                {tableHeaders[0]}
              </th>
              <th scope="col" className="pb-2 font-medium">
                {tableHeaders[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-zinc-800/80">
                <td className="py-2 pr-4">{r.label}</td>
                <td className="py-2 tabular-nums">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function BenchmarkGraphs() {
  return (
    <div className="flex flex-col gap-12">
      <ChartSection
        sectionId="chart-head-to-head-recall"
        title="Head-to-head recall on published critical/high findings"
        description={
          "Comparison on five protocols shared with the Trident Arena benchmark (22 ground-truth findings). Vertical axis: share of findings recalled (%)."
        }
        insight={
          "ARES V3 recalls 19/22 (86%) versus Trident Arena 14/22 (64%), Opus 4.6 5/22 (23%), and GPT-5.2 4/22 (18%)."
        }
        tableCaption="Same data as the chart for screen readers and precise lookup."
        tableHeaders={["Tool / model", "Recall (% of 22 findings)"]}
        rows={headToHeadRecallPercent.map((d) => ({
          label: d.label ?? "—",
          value: `${d.value}%`,
        }))}
      >
        <SimpleGraph
          data={headToHeadRecallPercent}
          height={280}
          lineColor="var(--solana-green)"
          dotColor="var(--solana-green)"
          showGrid
          gridStyle="dashed"
          curved
          gradientFade
          animateOnScroll
          animateOnce
          graphLineThickness={2.5}
        />
      </ChartSection>

      <ChartSection
        sectionId="chart-segment-b-aggregate"
        title="Segment B — aggregate precision and F1"
        description={
          "Production-repository benchmark (nine audited protocols). Macro averages are per-protocol means; micro aggregates pool all TP/FP/FN across protocols."
        }
        insight={
          "Reported macro averages: precision 0.79, recall 0.98; micro precision 0.83, micro F1 0.89."
        }
        tableCaption="Rates expressed as percentages (0–100) for the graph axis."
        tableHeaders={["Metric", "Value"]}
        rows={segmentBAggregatePercent.map((d) => ({
          label: d.label ?? "—",
          value: `${d.value}%`,
        }))}
      >
        <SimpleGraph
          data={segmentBAggregatePercent}
          height={280}
          lineColor="#818cf8"
          dotColor="#a5b4fc"
          showGrid
          gridStyle="solid"
          curved
          gradientFade
          animateOnScroll
          animateOnce
          graphLineThickness={2.5}
        />
      </ChartSection>

      <ChartSection
        sectionId="chart-segment-b-false-positives"
        title="Segment B — false positives after local judge"
        description={
          "Total Segment B false positives before and after iterative deterministic suppression using AST metadata (whitepaper contribution K3)."
        }
        insight={
          "FP count falls from 54 (pipeline v15) to 7 (pipeline v29) with no external LLM judge APIs."
        }
        tableCaption="Counts are totals over Segment B, not per protocol."
        tableHeaders={["Pipeline snapshot", "False positives"]}
        rows={segmentBFalsePositives.map((d) => ({
          label: d.label ?? "—",
          value: String(d.value),
        }))}
      >
        <SimpleGraph
          data={segmentBFalsePositives}
          height={260}
          lineColor="#f97316"
          dotColor="#fb923c"
          showGrid
          curved
          animateOnScroll
          animateOnce
          graphLineThickness={2.5}
        />
      </ChartSection>

      <p className="text-center text-xs text-white/45">
        Data source: {WHITEPAPER_SOURCE_LABEL}. Segment A maintains 100%
        detection on 11 deterministic regression stubs (see whitepaper §6).
      </p>
    </div>
  );
}
