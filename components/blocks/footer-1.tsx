"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Footer1() {
  const footerCards = [
    {
      title: "Product",
      links: [
        { text: "How it works", href: "#features" },
        { text: "Benchmark", href: "#get-started" },
        { text: "Pricing & license", href: "#pricing" },
      ],
    },
    {
      title: "Research",
      links: [
        {
          text: "GitHub repository",
          href: "https://github.com/daemon-blockint-tech/ARES-v3",
          external: true,
        },
        { text: "Reproduce benchmark", href: "#get-started" },
        { text: "FAQ and limitations", href: "#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          text: "License (MIT / Apache-2.0)",
          href: "https://github.com/daemon-blockint-tech/ARES-v3",
          external: true,
        },
        { text: "Commercial license terms", href: "/license" },
        { text: "Third-party datasets", href: "#faq" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative flex w-full flex-col overflow-hidden bg-black text-white sm:min-h-[100dvh] py-14 sm:py-20 md:py-24 border-t border-white/12">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <motion.div
              variants={itemVariants}
              className="mb-10 flex flex-col justify-between space-y-6 lg:mb-0"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <span className="text-base font-semibold text-black">A</span>
                </div>
                <span className="text-lg font-medium tracking-tight text-white">
                  ARES V3
                </span>
              </div>

              <div>
                <h3 className="text-lg font-medium leading-snug tracking-tight text-white sm:text-xl">
                  Deterministic static analysis
                  <br />
                  for Solana programs
                </h3>
              </div>

              <p className="text-sm text-white/45">
                Open source · Local-first core · Preprint May 2026
              </p>
            </motion.div>

            {footerCards.map((card, index) => {
              let marginClass = "";
              if (index > 0) marginClass = "-mt-px";
              if (index === 0) marginClass += " md:mt-0";
              else if (index === 1) marginClass += " md:-mt-px md:ml-0";
              else if (index === 2) marginClass += " md:-mt-px md:-ml-px";
              marginClass += " lg:mt-0";
              if (index > 0) marginClass += " lg:-ml-px";

              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  className={`group relative min-h-[260px] overflow-hidden border border-white/14 p-6 transition-colors hover:bg-white/[0.03] sm:min-h-[300px] sm:p-8 ${marginClass}`}
                >
                  <h4 className="mb-6 text-sm font-medium tracking-tight text-white sm:text-base">
                    {card.title}
                  </h4>
                  <ul className="space-y-3">
                    {card.links.map((link) => (
                      <li key={link.text}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-1 text-sm font-normal text-white/55 transition-colors hover:text-white sm:text-base no-underline"
                          {...(link.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.text}
                          {link.external && (
                            <ArrowUpRight className="h-3 w-3" aria-hidden />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center overflow-hidden py-10 sm:py-14 md:py-16"
            aria-hidden
          >
            <p className="select-none text-center text-[clamp(2.5rem,12vw,7.5rem)] font-medium leading-none tracking-tighter text-white/[0.07]">
              ARES V3
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
