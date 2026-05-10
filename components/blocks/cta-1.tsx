"use client";

import { motion } from "motion/react";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";

export default function CTA1() {
  return (
    <section
      id="get-started"
      className="relative w-full scroll-mt-24 overflow-hidden bg-landing-canvas py-16 text-white sm:py-20 md:py-28"
    >
      <div className="relative z-[1] mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 px-8 py-10 text-center shadow-xl backdrop-blur-xl sm:px-12 sm:py-12">
          <motion.h2
            className="mb-5 text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Benchmark on your own machine
          </motion.h2>

          <motion.p
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            Clone, run harness, diff ground_truth.json. Real metrics survive any laptop.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:w-auto no-underline"
            >
              Clone ARES V3
            </a>
            <a
              href="#faq"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/22 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:w-auto no-underline"
            >
              Read FAQ first
            </a>
          </motion.div>

          <motion.p
            className="mx-auto mt-10 max-w-2xl rounded-xl border border-zinc-800 bg-landing-canvas px-4 py-3 font-mono text-xs leading-relaxed text-white/65 sm:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            cargo run -p ares-cli --release -- benchmark --dataset dataset --output
            ./report.md
          </motion.p>
        </div>
      </div>
    </section>
  );
}
