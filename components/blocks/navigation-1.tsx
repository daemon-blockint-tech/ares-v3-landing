"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navigation1() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const menuItems = {
    product: [
      { name: "How it works (4 phases + judge)", href: "#features" },
      { name: "Benchmark", href: "#get-started" },
      { name: "Pricing & commercial license", href: "#pricing" },
      { name: "FAQ & limitations", href: "#faq" },
    ],
    docs: [
      {
        name: "Source code (GitHub)",
        href: "https://github.com/daemon-blockint-tech/ARES-v3",
      },
      { name: "Reproduce the benchmark", href: "#get-started" },
    ],
  };

  const navShell =
    "page-reveal-fade page-reveal-d1 absolute inset-x-0 top-[env(safe-area-inset-top)] z-30 flex h-14 items-center justify-between border-none border-white/12 bg-black/25 px-4 backdrop-blur-lg sm:h-[68px] sm:px-6 lg:px-12";

  const dropdownPanel =
    "absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-white/15 bg-black/80 shadow-xl backdrop-blur-xl";

  const dropdownLink =
    "block rounded-md px-4 py-2.5 text-sm text-white/80 no-underline transition-colors hover:bg-white/10 hover:text-white";

  const desktopNavBtn =
    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white";

  return (
    <nav className={navShell} aria-label="Primary">
      <motion.div
        className="flex w-full max-w-[1600px] mx-auto items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-8">
          <a
            href="#top"
            className="text-lg font-medium tracking-tight text-white z-50 no-underline"
          >
            ARES V3
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("product")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                type="button"
                className={desktopNavBtn}
                aria-expanded={activeMenu === "product"}
              >
                Product
                <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
              </button>

              <AnimatePresence>
                {activeMenu === "product" && (
                  <>
                    <div className="absolute left-0 top-full h-2 w-full" />
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className={dropdownPanel}
                    >
                      <div className="p-2">
                        {menuItems.product.map((item, index) => (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.15,
                              delay: index * 0.03,
                            }}
                            className={dropdownLink}
                          >
                            {item.name}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("docs")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                type="button"
                className={desktopNavBtn}
                aria-expanded={activeMenu === "docs"}
              >
                Docs
                <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
              </button>

              <AnimatePresence>
                {activeMenu === "docs" && (
                  <>
                    <div className="absolute left-0 top-full h-2 w-full" />
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className={dropdownPanel}
                    >
                      <div className="p-2">
                        {menuItems.docs.map((item, index) => (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.15,
                              delay: index * 0.03,
                            }}
                            className={dropdownLink}
                            {...(item.href.startsWith("http")
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                          >
                            {item.name}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#get-started"
              className="rounded-md px-3 py-2 text-sm font-medium text-white/85 no-underline transition-colors hover:text-white"
            >
              Benchmark
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/daemon-blockint-tech/ARES-v3"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/35 hover:bg-white/5 lg:inline-flex no-underline"
          >
            View source
          </a>

          <a
            href="#get-started"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90 lg:inline-flex no-underline"
          >
            Reproduce results
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white lg:hidden z-50"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md lg:hidden"
          >
            <div className="h-[68px]" aria-hidden />

            <div className="mx-auto flex h-[calc(100dvh-68px)] max-w-[1600px] flex-col px-4 sm:px-6">
              <div className="flex flex-1 flex-col gap-8 overflow-y-auto py-8 pb-0">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.08 }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileAccordion(
                        mobileAccordion === "product" ? null : "product",
                      )
                    }
                    className="flex w-full items-center justify-between text-left text-xl font-medium text-white"
                  >
                    Product
                    <ChevronDown
                      className={`h-6 w-6 transition-transform ${mobileAccordion === "product" ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "product" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1 pt-4">
                          {menuItems.product.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-lg px-4 py-3 text-base text-white/75 no-underline hover:bg-white/10 hover:text-white"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.12 }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileAccordion(
                        mobileAccordion === "docs" ? null : "docs",
                      )
                    }
                    className="flex w-full items-center justify-between text-left text-xl font-medium text-white"
                  >
                    Docs
                    <ChevronDown
                      className={`h-6 w-6 transition-transform ${mobileAccordion === "docs" ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "docs" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1 pt-4">
                          {menuItems.docs.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-lg px-4 py-3 text-base text-white/75 no-underline hover:bg-white/10 hover:text-white"
                              onClick={() => setMobileMenuOpen(false)}
                              {...(item.href.startsWith("http")
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.a
                  href="#get-started"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.16 }}
                  className="text-xl font-medium text-white no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Benchmark
                </motion.a>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/15 py-6">
                <motion.a
                  href="https://github.com/daemon-blockint-tech/ARES-v3"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.18 }}
                  className="w-full rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white no-underline hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View source
                </motion.a>
                <motion.a
                  href="#get-started"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.2 }}
                  className="w-full rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-black no-underline hover:bg-white/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reproduce results
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
