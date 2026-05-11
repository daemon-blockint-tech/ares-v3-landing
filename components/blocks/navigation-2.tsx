"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TestTube2,
  Braces,
  GitBranch,
  ShieldCheck,
  LifeBuoy,
  FileText,
  Menu,
  X,
  Code2,
  BookOpen,
  Megaphone,
  LayoutGrid,
} from "lucide-react";
import { NavAuthActions, NavDesktopPrimaryCta } from "@/components/auth/nav-auth-actions";

const GH = "https://github.com/daemon-blockint-tech/ARES-v3";
const X_PROFILE = "https://x.com/aressystem_";
const WHITEPAPER = "/ares-v3-whitepaper.pdf";
const ARES_LOGO = "/ARES_LOGO_WHITE.png";

export function Navigation2() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = {
    Product: [
      {
        icon: GitBranch,
        title: "Four phases + judge",
        description:
          "Regex → macro-aware AST → taint → local judge. Models never sit in the detection path.",
        href: "#features",
      },
      {
        icon: Braces,
        title: "Macro-aware AST",
        description:
          "Sees Anchor `Accounts` and Solitaire `FromAccounts` after expansion—not just the source you typed.",
        href: "#features",
      },
      {
        icon: ShieldCheck,
        title: "Policy & guardrails",
        description:
          "Hooks for auth, scoped output, and audit logs once you wire the server layout.",
        href: "#features",
      },
      {
        icon: TestTube2,
        title: "Two-segment benchmark",
        description:
          "Eleven regression stubs, nine public audited repos. Clone the repo and reproduce the numbers.",
        href: "#get-started",
      },
    ],
    Resources: [
      {
        icon: LayoutGrid,
        title: "Plans & comparison",
        description: "Open source vs commercial seat vs team—side by side.",
        href: "/pricing",
      },
      {
        icon: Code2,
        title: "Source on GitHub",
        description: "MIT / Apache-2.0. Clone and run locally.",
        href: GH,
      },
      {
        icon: Megaphone,
        title: "Updates on X",
        description: "@aressystem_ for ship notes and research threads.",
        href: X_PROFILE,
      },
      {
        icon: BookOpen,
        title: "Whitepaper (PDF)",
        description: "Methods, benchmark design, and what we explicitly did not claim.",
        href: WHITEPAPER,
      },
      {
        icon: LifeBuoy,
        title: "FAQ & limitations",
        description: "Where automation ends and a human still owns the call.",
        href: "#faq",
      },
      {
        icon: FileText,
        title: "Commercial license",
        description:
          "Per-seat terms. Checkout here uses x402 + PayAI; add a pay.sh gateway URL when you publish one.",
        href: "/license",
      },
      {
        icon: TestTube2,
        title: "Run the benchmark",
        description: "Command, harness layout, and where the dataset lives in-tree.",
        href: "#get-started",
      },
    ],
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 py-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Desktop Navigation */}
          <motion.div
            className="relative mx-auto hidden lg:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {/* Nav Container - Always rounded rectangle */}
            <div className="mx-auto w-fit rounded-3xl bg-white/40 backdrop-blur-2xl border border-neutral-200/50 shadow-xl dark:bg-neutral-950/20 dark:border-neutral-800/50 overflow-hidden">
              {/* Main Nav Bar */}
              <div className="flex min-w-0 max-w-[min(100vw-2rem,1200px)] items-center gap-3 pl-5 pr-2 py-2.5 sm:gap-4 sm:pl-6 sm:pr-3 sm:py-3">
                {/* Logo */}
                <a
                  href="#top"
                  className="mr-2 flex shrink-0 items-center no-underline sm:mr-4 lg:mr-6"
                >
                  <Image
                    src={ARES_LOGO}
                    alt="ARES"
                    width={156}
                    height={40}
                    className="h-7 w-auto"
                    priority
                  />
                </a>

                {/* Nav Links — centered, can shrink on tight widths */}
                <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5 sm:gap-1">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveMenu("Product")}
                    className="shrink-0 px-2 py-2 text-xs tracking-tight font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full sm:px-4 sm:text-sm"
                  >
                    Product
                  </button>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveMenu("Resources")}
                    className="shrink-0 px-2 py-2 text-xs tracking-tight font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full sm:px-4 sm:text-sm"
                  >
                    Resources
                  </button>
                  <a
                    href="/pricing"
                    className="shrink-0 px-2 py-2 text-xs tracking-tight font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full no-underline sm:px-4 sm:text-sm"
                    onMouseEnter={() => setActiveMenu(null)}
                  >
                    Pricing
                  </a>
                </div>

                {/* Right: auth + primary CTA */}
                <div className="flex min-w-0 shrink-0 items-center gap-1 border-l border-neutral-200/70 pl-2 dark:border-neutral-700/80 sm:gap-1.5 sm:pl-3 lg:ml-2 lg:gap-2 lg:pl-4">
                  <NavAuthActions variant="desktop" />
                  <NavDesktopPrimaryCta onMouseEnter={() => setActiveMenu(null)} />
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeMenu && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-2">
                      <div className="grid grid-cols-2 gap-3 w-[620px]">
                        {menuItems[activeMenu as keyof typeof menuItems].map(
                          (item, index) => {
                            const Icon = item.icon;
                            return (
                              <motion.a
                                key={item.title}
                                href={item.href}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.2,
                                  delay: index * 0.05,
                                  ease: "easeOut",
                                }}
                                className="group flex items-start gap-3 rounded-2xl bg-white/20 backdrop-blur-2xl dark:bg-neutral-950/20 border border-neutral-300 dark:border-neutral-800/50 p-4 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-[border-color,box-shadow] duration-200 no-underline"
                                {...(item.href.startsWith("http") ||
                                item.href.endsWith(".pdf")
                                  ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                    }
                                  : {})}
                              >
                                <div className="shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-2">
                                  <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-normal text-neutral-900 dark:text-white mb-0.5 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                                    {item.title}
                                  </h3>
                                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                                    {item.description}
                                  </p>
                                </div>
                              </motion.a>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="rounded-3xl bg-white/40 backdrop-blur-2xl border border-neutral-300 shadow-xl dark:bg-neutral-950/20 dark:border-neutral-800/50 overflow-hidden">
              {/* Mobile Nav Bar */}
              <div className="flex items-center justify-between gap-2 pl-4 pr-3 py-3">
                {/* Logo */}
                <a
                  href="#top"
                  className="flex shrink-0 items-center no-underline"
                >
                  <Image
                    src={ARES_LOGO}
                    alt="ARES"
                    width={156}
                    height={40}
                    className="h-7 w-auto"
                    priority
                  />
                </a>

                <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
                  <NavAuthActions variant="mobile" />
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-landing-canvas dark:bg-white text-white dark:text-black"
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Expanded Content */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2">
                      {/* Mobile Menu Content */}
                      <div className="space-y-4">
                        {/* Simple Links */}
                        <div className="space-y-1">
                          <a
                            href="/pricing"
                            className="block py-2 px-2 text-sm font-medium text-neutral-900 dark:text-white no-underline"
                          >
                            Pricing
                          </a>
                          <a
                            href={GH}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-2 px-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 no-underline"
                          >
                            View source
                          </a>
                          <a
                            href={X_PROFILE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-2 px-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 no-underline"
                          >
                            Updates on X
                          </a>
                        </div>

                        {/* Mobile CTA */}
                        <div>
                          <a
                            href="#get-started"
                            className="block w-full text-center px-6 py-2.5 rounded-full bg-landing-canvas dark:bg-white text-white dark:text-black text-sm font-medium no-underline"
                          >
                            Run the benchmark
                          </a>
                        </div>

                        {/* Product Section */}
                        <div className="pt-2 border-neutral-200 dark:border-neutral-800">
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 px-2">
                            Product
                          </h3>
                          <div className="space-y-2">
                            {menuItems.Product.map((item) => {
                              const Icon = item.icon;
                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  className="flex items-start gap-3 rounded-xl bg-white/20 backdrop-blur-2xl dark:bg-neutral-950/20 border border-neutral-200/50 dark:border-neutral-800/50 p-3 no-underline"
                                  {...(item.href.startsWith("http") ||
                                  item.href.endsWith(".pdf")
                                    ? {
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                      }
                                    : {})}
                                >
                                  <div className="shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-2">
                                    <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-0.5">
                                      {item.title}
                                    </h4>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>

                        {/* Resources Section */}
                        <div>
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 px-2">
                            Resources
                          </h3>
                          <div className="space-y-2">
                            {menuItems.Resources.map((item) => {
                              const Icon = item.icon;
                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  className="flex items-start gap-3 rounded-xl bg-white/20 backdrop-blur-2xl dark:bg-neutral-950/20 border border-neutral-200/50 dark:border-neutral-800/50 p-3 no-underline"
                                  {...(item.href.startsWith("http") ||
                                  item.href.endsWith(".pdf")
                                    ? {
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                      }
                                    : {})}
                                >
                                  <div className="shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-2">
                                    <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-0.5">
                                      {item.title}
                                    </h4>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </nav>
    </>
  );
}

export default Navigation2;
