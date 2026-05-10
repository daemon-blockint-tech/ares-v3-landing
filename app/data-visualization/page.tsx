import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navigation2 } from "@/components/blocks/navigation-2";
import { BenchmarkGraphs } from "@/components/data-visualization/benchmark-graphs";
import { WHITEPAPER_SOURCE_LABEL } from "@/lib/data-visualization/whitepaper-benchmark";

export const metadata: Metadata = {
  title: "Benchmark visualizations · ARES V3",
  description:
    "Interactive line charts for whitepaper-reported benchmarks: Trident Arena head-to-head recall, Segment B precision/F1, and false-positive reduction.",
};

export default function DataVisualizationPage() {
  return (
    <>
      <Navigation2 />
      <main className="relative min-h-screen bg-landing-canvas pb-24 pt-8 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>

          <header className="mb-12">
            <h1 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-[2rem]">
              Whitepaper benchmarks
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/75 sm:text-base">
              The figures below summarize published results from{" "}
              <a
                href="/ares-v3-whitepaper.pdf"
                className="text-[var(--solana-green)] underline-offset-2 hover:underline"
              >
                {WHITEPAPER_SOURCE_LABEL}
              </a>
              . Line charts connect categories so you can compare levels at a
              glance; each section includes a data table for accessibility.
            </p>
          </header>

          <BenchmarkGraphs />
        </div>
      </main>
    </>
  );
}
