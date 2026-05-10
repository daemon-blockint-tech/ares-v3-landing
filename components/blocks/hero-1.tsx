"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";

export function Hero1() {
  return (
    <section
      id="top"
      className="relative isolate w-full overflow-hidden bg-black text-white lg:pt-[calc(env(safe-area-inset-top)+68px)] scroll-mt-0"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      >
        <div className="grid-mask absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(255,255,255,0.14),transparent_55%)]" />
      </div>

      <div className="relative z-[1] max-w-[1600px] mx-auto w-full px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-12 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-24">
          <div className="flex flex-col space-y-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex w-fit flex-wrap items-center gap-2 rounded-full border border-white/18 bg-white/5 px-3 py-1.5 text-sm text-white/70"
            >
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                Preprint
              </span>
              <span className="pr-1">
                Deterministic static analysis for Solana programs
              </span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-[clamp(1.85rem,4.6vw,3.35rem)] font-medium leading-[1.12] tracking-tight text-white"
            >
              Find macro-hidden risks before they ship, without sending source to
              a black box
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            >
              ARES V3 runs a four-phase pipeline locally: regex, macro-aware AST,
              intra-procedural taint, then a deterministic judge. The core stays
              reproducible; optional orchestration only adds context around the same
              findings.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <motion.a
                href={GH}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full bg-white px-7 py-2.5 text-sm font-medium text-black no-underline transition-colors hover:bg-white/90 sm:w-auto"
              >
                Clone the repository
                <ArrowRight className="h-4 w-4" aria-hidden />
              </motion.a>
              <a
                href="#features"
                className="text-sm font-medium text-white/55 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white/90 hover:decoration-white/50 sm:px-2"
              >
                How the four phases work
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="flex flex-col gap-3 border-t border-white/12 pt-8"
            >
              <p className="text-sm font-medium text-white/90">
                Why teams reach for it
              </p>
              <ul className="max-w-xl list-disc space-y-1.5 pl-5 text-sm text-white/55">
                <li>
                  Macro-aware parsing for Anchor and Solitaire-style account
                  structs
                </li>
                <li>
                  Intra-procedural taint from untrusted sources to sensitive sinks
                </li>
                <li>
                  False-positive suppression from AST metadata only; no LLM on the
                  core path
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative w-full"
          >
            <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] sm:min-h-[420px] lg:min-h-[480px]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden />
                <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
                <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
                <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-white/35">
                  Local CLI
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 font-mono text-xs text-white/70 sm:p-8 sm:text-sm">
                <p className="text-white/40">
                  # Example: workspace scan (core engine)
                </p>
                <p>
                  <span className="text-emerald-400/90">$</span> cargo run -p
                  ares-cli --release -- scan ./programs --format json
                </p>
                <p className="mt-4 text-white/40">
                  # Segment A stubs + Segment B audit recall ship in the harness.
                  Rerun on your checkout before you trust a headline.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
