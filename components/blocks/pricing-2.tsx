"use client";

import { motion } from "motion/react";
import { Check, Terminal } from "lucide-react";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";

export default function Pricing2() {
  return (
    <section
      id="deployment"
      className="relative w-full scroll-mt-24 bg-landing-canvas px-4 py-16 text-white sm:px-6 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
            Deployment
          </p>
          <h2 className="mx-auto mb-6 max-w-4xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.25] tracking-tight text-white">
            One core, pick your surface
          </h2>
          <p className="mx-auto max-w-2xl text-base text-white/55">
            Analyzer stays local; optional layers add reports without changing core outputs.
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="flex flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-8 backdrop-blur-md"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
              <Terminal className="h-5 w-5 text-white" aria-hidden />
            </div>
            <h3 className="mb-2 text-2xl font-medium text-white">
              Local CLI
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/55">
              Scan workspaces, export JSON or Markdown locally. No API keys required.
            </p>
            <ul className="mb-8 flex-1 space-y-3">
              {[
                "Deterministic output for identical inputs",
                "Workspace walk + skip bad files instead of aborting",
                "Pairs with CI and pre-push hooks",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#get-started"
              className="inline-flex w-full min-h-11 items-center justify-center rounded-full bg-white py-3 text-center text-sm font-medium text-black transition-colors hover:bg-white/90 no-underline"
            >
              Run the harness
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="lg:col-span-2 flex flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-8 backdrop-blur-md"
          >
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-2xl font-medium text-white">
                API server &amp; orchestration
              </h3>
              <span className="w-fit rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-white/55">
                Optional, non-core
              </span>
            </div>
            <p className="mb-8 text-sm leading-relaxed text-white/55">
              KB, chain, and MCP context; capped correction loops; narrative reports, all
              layered on reruns of the same deterministic engine.
            </p>
            <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/45">
                  Server mode
                </p>
                <ul className="mb-6 space-y-3">
                  {[
                    "Dispatch + policy hooks",
                    "Capped validator iterations",
                    "Inspectible suppression log",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-sm text-white/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={GH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-fit min-h-10 items-center justify-center rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-900 no-underline"
                >
                  Track packaging on GitHub
                </a>
              </div>
              <div className="flex flex-col border-t border-zinc-800 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/45">
                  IDE extension
                </p>
                <p className="mb-6 text-sm leading-relaxed text-white/55">
                  Roadmap: inline diagnostics on save, jump-to-span, same binaries as
                  CLI and API.
                </p>
                <ul className="mb-6 flex-1 space-y-3">
                  {[
                    "Tight loop for protocol engineers",
                    "Complements local `scan` in CI",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-sm text-white/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href="#faq"
                  className="inline-flex w-fit min-h-10 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90 no-underline"
                >
                  Scope and limitations
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 backdrop-blur-sm sm:p-8"
        >
          <p className="text-center text-sm text-white/55">
            Open source under MIT / Apache-2.0. No surprise tiers. Clone, skim the
            preprint, run the harness on hardware you control.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
