"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import TextType from "@/components/react-bits/text-type";

const ARES_LOGO = "/ARES_LOGO_WHITE.png";
const X_PROFILE = "https://x.com/aressystem_";

export default function Footer4() {
  const reduceMotion = useReducedMotion();

  const footerColumns = [
    {
      title: "Product",
      links: [
        { text: "How it works", href: "#features" },
        { text: "Benchmark", href: "#get-started" },
        { text: "Deploy", href: "#deployment" },
      ],
    },
    {
      title: "Research",
      links: [
        { text: "Whitepaper (PDF)", href: "/ares-v3-whitepaper.pdf", external: true },
        { text: "GitHub", href: "https://github.com/daemon-blockint-tech/ARES-v3", external: true },
        { text: "X (@aressystem_)", href: X_PROFILE, external: true },
        { text: "Run benchmark", href: "#get-started" },
        { text: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Developers",
      links: [
        { text: "Local CLI", href: "#deployment" },
        { text: "Harness output", href: "#get-started" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "License (repo)", href: "https://github.com/daemon-blockint-tech/ARES-v3", external: true },
        { text: "Pact Network audit", href: "/pact-network-security-audit-report.md", external: true },
      ],
    },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  } as const;

  return (
    <footer className="relative z-[1] mt-auto w-full bg-landing-canvas text-white">
      <div>
        {/* Headline */}
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="py-12">
            {reduceMotion ? (
              <h2 className="text-3xl font-medium tracking-tight leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Static analysis you can rerun.
                <br />
                Built for Solana-shaped Rust.
              </h2>
            ) : (
              <TextType
                as="h2"
                text={
                  "Static analysis you can rerun.\nBuilt for Solana-shaped Rust."
                }
                className="text-3xl font-medium tracking-tight leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                typingSpeed={48}
                pauseDuration={4500}
                loop={false}
                showCursor
                cursorCharacter="|"
                cursorClassName="text-white/40"
                startOnVisible
              />
            )}
          </motion.div>
        </div>

        {/* Two Column Layout */}
        <div>
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.06 }}
              className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.5fr]"
            >
              {/* Left Column - Newsletter Signup */}
              <div className="py-8 lg:py-8 lg:pr-8">
                <div>
                  <h3 className="mb-6 text-lg font-medium tracking-tight text-white sm:text-xl">
                    Releases & benchmark notes
                  </h3>

                  {/* Email Input with Button */}
                  <div className="mb-6 flex min-w-0">
                    <input
                      type="email"
                      placeholder="Optional, connect your list tool"
                      className="min-w-0 flex-1 border border-r-0 border-neutral-600 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/20 sm:px-6 sm:py-4 sm:text-base"
                    />
                    <button
                      type="button"
                      className="shrink-0 flex items-center justify-center border border-neutral-600 bg-neutral-800 px-4 transition-colors hover:bg-neutral-700 sm:px-6"
                      aria-label="Submit email (not connected)"
                    >
                      <ArrowRight className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-400 sm:text-sm">
                    Rather skip email? Star or watch{" "}
                    <a
                      href="https://github.com/daemon-blockint-tech/ARES-v3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white underline-offset-2 hover:underline"
                    >
                      the repo
                    </a>{" "}
                    for tags and harness changes.
                  </p>
                </div>
              </div>

              {/* Right Column - 4 Column Links */}
              <div className="py-8 lg:py-8 lg:pl-8">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                  {footerColumns.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                      <h4 className="mb-4 text-sm font-medium tracking-tight text-white sm:mb-6 sm:text-base">
                        {column.title}
                      </h4>
                      <ul className="space-y-3">
                        {column.links.map((link) => (
                          <li key={link.text}>
                            <a
                              href={link.href}
                              className="text-sm tracking-tight text-neutral-400 transition-colors hover:text-white sm:text-base"
                              {...("external" in link && link.external
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            >
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="py-8"
          >
            <div className="mb-4">
              <a href="#top" className="inline-block no-underline" aria-label="ARES home">
                <Image
                  src={ARES_LOGO}
                  alt="ARES"
                  width={156}
                  height={40}
                  className="h-12 w-auto sm:h-14 md:h-16 lg:h-[4.5rem]"
                />
              </a>
            </div>

            {/* Copyright and Links */}
            <div className="flex flex-col gap-4 text-xs text-neutral-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:text-sm">
              <p>
                © {new Date().getFullYear()} ARES V3 contributors · Daemon Blockint Technologies
              </p>
              <span className="hidden sm:inline text-neutral-600" aria-hidden>
                •
              </span>
              <a
                href="/ares-v3-whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Whitepaper
              </a>
              <span className="hidden sm:inline text-neutral-600" aria-hidden>
                •
              </span>
              <a href="#faq" className="transition-colors hover:text-white">
                FAQ
              </a>
              <span className="hidden sm:inline text-neutral-600" aria-hidden>
                •
              </span>
              <a
                href="https://github.com/daemon-blockint-tech/ARES-v3"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub
              </a>
              <span className="hidden sm:inline text-neutral-600" aria-hidden>
                •
              </span>
              <a
                href={X_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                X
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
