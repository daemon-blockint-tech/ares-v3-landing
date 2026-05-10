"use client";

import { useState } from "react";
import { motion } from "motion/react";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";

export function Auth3() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      aria-labelledby="auth-heading"
      className="relative w-full overflow-hidden bg-landing-canvas py-20 text-white sm:py-28"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-6 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl backdrop-blur-xl"
        >
          <h1 id="auth-heading" className="mb-2 text-3xl font-semibold text-white">
            No account required
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-white/60">
            GitHub source: clone, run, rerun benchmarks. Email only for release pings.
          </p>

          <form onSubmit={handleSubmit} className="mb-6">
            <label htmlFor="auth-email" className="sr-only">
              Email (optional)
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for release notes (optional)"
              className="mb-4 w-full rounded-lg border border-white/15 bg-landing-canvas/30 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/25"
            />
            <p className="mb-4 text-xs text-white/45">
              Static export: this field does nothing until you wire a provider.
            </p>
            <button
              type="submit"
              className="w-full rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Notify me (placeholder)
            </button>
          </form>

          <div className="flex items-center gap-4 py-4">
            <div className="h-px flex-1 bg-white/15" />
            <span className="text-xs text-white/45">or</span>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          <a
            href={GH}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/15 no-underline"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Open repository
          </a>

          <p className="mt-6 text-center text-xs text-white/45">
            Questions first?{" "}
            <a href="#faq" className="font-medium text-white/80 underline-offset-4 hover:underline">
              Read the FAQ
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="hidden max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 backdrop-blur-xl lg:block"
        >
          <h2 className="mb-4 text-4xl font-medium tracking-tighter text-white">
            ARES V3
          </h2>
          <p className="text-lg leading-relaxed text-white/90">
            Regex, AST, taint, judge pipeline; LLMs never feed detections per preprint.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
