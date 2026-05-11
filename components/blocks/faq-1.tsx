"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";
const WHITEPAPER = "/ares-v3-whitepaper.pdf";

export default function FAQ1() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Does an LLM decide what counts as a vulnerability?",
      answer:
        "No. The four-phase core (regex, AST after macros, taint, local judge) is deterministic: feed it the same bytes, you get the same filtered findings and suppression log. If an LLM shows up at all, it lives in orchestration or reporting and must not feed back into detections. That split is how the preprint draws the architecture.",
    },
    {
      question: "Why do macros matter on Solana?",
      answer:
        "Anchor `#[derive(Accounts)]` and Solitaire `#[derive(FromAccounts)]` generate the checks that actually execute. Regex on pre-expanded source can miss validation that only appears after macro expansion. That gap is what this pipeline is aimed at.",
    },
    {
      question: "Will every alert be a real exploit?",
      answer:
        "No. Static analysis can still flag noise that needs a human. The paper frames the judge as trimming obvious repeats, not issuing verdicts. Treat each alert as a starting point, not a conviction.",
    },
    {
      question: "How should I interpret benchmark scores?",
      answer:
        "Stick to the published two-segment story: Segment A proves regressions stay caught; Segment B scores recall and precision against audit-derived labels on public repos. Run `cargo run -p ares-cli -- benchmark` on your checkout. If you cannot reproduce a number, do not ship it.",
    },
    {
      question: "Is this a replacement for a professional audit?",
      answer:
        "No. Think of it as fast, local signal before you pay for deep review. Economic exploit proofs, mainnet-fork sandboxes, and full formal verification are called out as future or explicitly out of scope in the paper.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative isolate z-[1] w-full scroll-mt-24 bg-landing-canvas py-16 text-white sm:py-20 md:py-24"
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20 xl:gap-24">
          <div className="relative z-[1] flex flex-col space-y-3 lg:sticky lg:top-28 lg:self-start">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl"
            >
              FAQ
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="max-w-md text-base leading-relaxed text-white/55 sm:text-lg"
            >
              What stays deterministic, what does not, and where a human still signs off.
            </motion.p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
              <a
                href={GH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit text-sm font-medium text-white/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50"
              >
                Repository
              </a>
              <span className="hidden text-white/30 sm:inline" aria-hidden>
                ·
              </span>
              <a
                href={WHITEPAPER}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit text-sm font-medium text-white/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50"
              >
                Whitepaper (PDF)
              </a>
            </div>
          </div>

          <div className="relative z-[1] flex flex-col">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 + index * 0.03 }}
                className={`border-b border-white/12 ${
                  index === 0 ? "border-t border-white/12" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="group flex w-full items-start justify-between gap-4 py-6 text-left sm:py-8"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                >
                  <span className="text-base font-medium leading-snug text-white sm:text-lg transition-colors group-hover:text-white/80">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.25,
                      ease: "easeInOut",
                    }}
                    className="mt-0.5 shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-white/45 sm:h-6 sm:w-6" aria-hidden />
                  </motion.div>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className={cn(
                    "grid transition-[grid-template-rows] ease-out",
                    reduceMotion ? "duration-0" : "duration-300",
                    openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pb-6 pr-2 sm:pb-8 sm:pr-6">
                      <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
