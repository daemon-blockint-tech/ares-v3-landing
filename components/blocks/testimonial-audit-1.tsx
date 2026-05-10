"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Shield } from "lucide-react";

const REPORT_HREF = "/pact-network-audit";

/** Spotlight card grounded in public audit report copy, not a fabricated client quote. */
export default function TestimonialAudit1() {
  return (
    <section
      id="audit-spotlight"
      className="relative scroll-mt-24 bg-landing-canvas py-16 text-white sm:py-20 md:py-24"
    >
      <div className="relative z-[1] mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
            Audit spotlight
          </p>
          <h2 className="mb-4 text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
            Pact audit: SDK and chain
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/55">
            Report covers{" "}
            <span className="text-white/80">@q3labs/pact-monitor</span> v0.1.4 and{" "}
            <span className="text-white/80">pact-protocol</span> on-chain logic.
          </p>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 backdrop-blur-sm sm:p-10 md:p-12"
        >
          <div className="mb-6 flex justify-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900">
              <Shield className="h-6 w-6 text-white/85" aria-hidden />
            </span>
          </div>

          <blockquote className="mb-8 text-center">
            <p className="text-lg font-medium leading-relaxed text-white/90 sm:text-xl md:text-[1.35rem] md:leading-snug">
              Seven validated findings: SDK risks, Solana logic, attack chains, fixes.
            </p>
          </blockquote>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-white/55 sm:text-sm">
            <span className="rounded-full border border-zinc-700 px-3 py-1.5 text-white/75">
              7 findings
            </span>
            <span className="rounded-full border border-zinc-700 px-3 py-1.5">
              2 Critical · 3 High · 1 Medium · 1 Info
            </span>
            <span className="rounded-full border border-zinc-700 px-3 py-1.5">
              SAST + on-chain review
            </span>
          </div>

          <footer className="flex flex-col items-center gap-4 border-t border-zinc-800 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-medium text-white">Daemon Blockint Technologies</p>
              <p className="text-xs text-white/45">Prepared April 20, 2026 · Pact Network scope</p>
            </div>
            <Link
              href={REPORT_HREF}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 no-underline"
            >
              Read full report
              <ArrowUpRight className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            </Link>
          </footer>
        </motion.article>
      </div>
    </section>
  );
}
