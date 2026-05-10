"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";

export default function Pricing1() {
  return (
    <section
      id="deployment"
      className="relative w-full scroll-mt-24 bg-black py-16 text-white sm:py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center sm:mb-16"
        >
          <h2 className="mb-4 text-3xl font-medium leading-tight tracking-tight text-white">
            Same core engine. Pick how much automation you want.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            The four-phase analyzer always runs locally. API and IDE layers add
            orchestration, reports, and integrations; they do not change the
            deterministic finding set from Source A.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mx-auto mb-14 max-w-2xl rounded-2xl border border-white/12 bg-white/[0.03] p-6 sm:p-8"
        >
          <h3 className="mb-2 text-lg font-medium text-white">Start with the CLI</h3>
          <p className="mb-5 text-sm leading-relaxed text-white/55">
            Smallest surface area: scan a workspace, get JSON or Markdown, keep
            everything on your machine.
          </p>
          <a
            href={GH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:w-auto no-underline"
          >
            Open installation docs on GitHub
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.02] p-6 sm:p-7"
          >
            <h3 className="mb-2 text-xl font-medium text-white">Local CLI</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/55">
              For auditors and CI: core mapper and judge only. The preprint reports
              sub-five-second runs on the benchmark set on its reference hardware. Rerun
              on yours.
            </p>
            <div className="flex-1" />
            <ul className="mb-6 space-y-3">
              {[
                "Deterministic output for identical inputs",
                "No API keys for the core path",
                "JSON / Markdown / HTML exporters",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-white/80" aria-hidden />
                  <span className="text-sm text-white/70">{t}</span>
                </li>
              ))}
            </ul>
            <a
              href="#get-started"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white py-2.5 text-center text-sm font-medium text-black transition-colors hover:bg-white/90 no-underline"
            >
              Run the benchmark harness
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-white/22 bg-white/[0.06] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] sm:p-7"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
              Team-shaped
            </p>
            <h3 className="mb-2 text-xl font-medium text-white">API server</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/65">
              Dispatch layer, bounded self-correction, MCP tools, and narrative
              reports: enrichment without rewriting detections.
            </p>
            <div className="flex-1" />
            <ul className="mb-6 space-y-3">
              {[
                "Parallel retrieval (KB, chain, MCP) optional",
                "Validator loop capped by `max_iterations`",
                "Suppression log stays inspectable",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-white/80" aria-hidden />
                  <span className="text-sm text-white/70">{t}</span>
                </li>
              ))}
            </ul>
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/25 bg-white/[0.08] py-3 text-center text-sm font-medium text-white transition-colors hover:bg-white/14 no-underline"
            >
              Follow server packaging milestones
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.02] p-6 sm:p-7"
          >
            <h3 className="mb-2 text-xl font-medium text-white">IDE extension</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/55">
              Roadmap: inline findings on save, jump-to-span, and single-finding
              explanations, same binaries as CLI and API.
            </p>
            <div className="flex-1" />
            <ul className="mb-6 space-y-3">
              {[
                "Short feedback loop for protocol engineers",
                "Pairs with local CLI for pre-push scans",
                "Details ship with the public roadmap",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-white/80" aria-hidden />
                  <span className="text-sm text-white/70">{t}</span>
                </li>
              ))}
            </ul>
            <a
              href="#faq"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/20 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10 no-underline"
            >
              Read scope and limitations
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
