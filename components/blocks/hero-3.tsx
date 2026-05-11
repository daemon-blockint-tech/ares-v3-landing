"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import LiquidAscii from "@/components/react-bits/liquid-ascii";
import ShinyText from "@/components/react-bits/shiny-text";

export function Hero3() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate z-0 w-full min-h-screen overflow-hidden bg-[var(--landing-canvas)]"
    >
      {/* absolute (not fixed) so ASCII stays inside hero; avoids distracting motion behind lower sections */}
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh]"
        aria-hidden
      >
        <LiquidAscii
          className="h-full min-h-[100dvh] w-full"
          width="100%"
          height="100%"
          speed={0.85}
          cellSize={12}
          gravity={-22}
          fillHeight={0.42}
          cursorRadius={0.22}
          cursorForce={55}
          color="#3df7b3"
          backgroundColor="#0a1628"
          opacity={0.92}
          autoWave
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[var(--landing-canvas)]/18"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 solana-gradient-wash opacity-[0.55]" aria-hidden />
      </div>

      {/* Content overlay: stronger scrim + blur so type stays readable over ASCII */}
      <div className="relative z-10 flex h-dvh flex-col overflow-hidden bg-[var(--landing-canvas)]/36 p-[4vmax] backdrop-blur-sm">
        <div className="relative w-full flex-1 overflow-hidden">
          {/* Decorative Corners - Top */}
          <div
            className="absolute right-0 bottom-0 hidden h-12 w-12 md:block"
            style={{
              background:
                "radial-gradient(circle at top left, transparent 48px, white 48px)",
              transform: "translateZ(0)",
            }}
          >
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                background:
                  "radial-gradient(circle at top left, transparent 48px, var(--landing-canvas) 48px)",
              }}
            />
          </div>
          <div
            className="absolute top-0 left-0 h-12 w-12"
            style={{
              background:
                "radial-gradient(circle at bottom right, transparent 48px, white 48px)",
              transform: "translateZ(0)",
            }}
          >
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                background:
                  "radial-gradient(circle at bottom right, transparent 48px, var(--landing-canvas) 48px)",
              }}
            />
          </div>
          <div
            className="absolute top-0 right-0 h-12 w-12"
            style={{
              background:
                "radial-gradient(circle at bottom left, transparent 48px, white 48px)",
              transform: "translateZ(0)",
            }}
          >
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                background:
                  "radial-gradient(circle at bottom left, transparent 48px, var(--landing-canvas) 48px)",
              }}
            />
          </div>
        </div>

        {/* Decorative Corner - Mobile Only */}
        <div
          className="absolute bottom-[4vmax] left-[4vmax] block h-12 w-12 md:hidden"
          style={{
            background:
              "radial-gradient(circle at top right, transparent 48px, white 48px)",
            transform: "translateZ(0)",
          }}
        >
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "radial-gradient(circle at top right, transparent 48px, var(--landing-canvas) 48px)",
            }}
          />
        </div>

        {/* Bottom Section - Title and Links */}
        <div className="flex flex-col items-start md:flex-row">
          <h1 className="relative pb-[4vmax] pl-[4vmax] pr-[4vmax] text-[5vmax] leading-tight">
            <span className="block">
              <ShinyText
                text="Same bytes, same findings."
                className="text-[5vmax] leading-tight"
                color="rgba(255,255,255,0.82)"
                shineColor="#ffffff"
                speed={3}
                delay={0.4}
                spread={115}
                direction="left"
                pauseOnHover
                disabled={!!reduceMotion}
              />
            </span>
            <span className="mt-[0.08em] block">
              <ShinyText
                text="Security signal for Solana Rust."
                className="text-[5vmax] leading-tight"
                color="rgba(255,255,255,0.82)"
                shineColor="#14f195"
                speed={3}
                delay={0.4}
                spread={115}
                direction="right"
                pauseOnHover
                disabled={!!reduceMotion}
              />
            </span>
            <div
              className="absolute right-0 bottom-0 hidden h-12 w-12 md:block"
              style={{
                background:
                  "radial-gradient(circle at top left, transparent 48px, white 48px)",
                transform: "translateZ(0)",
              }}
            >
              <div
                className="absolute inset-0 hidden dark:block"
                style={{
                  background:
                    "radial-gradient(circle at top left, transparent 48px, var(--landing-canvas) 48px)",
                }}
              />
            </div>
            <div
              className="absolute bottom-0 left-0 hidden h-12 w-12 md:block"
              style={{
                background:
                  "radial-gradient(circle at top right, transparent 48px, white 48px)",
                transform: "translateZ(0)",
              }}
            >
              <div
                className="absolute inset-0 hidden dark:block"
                style={{
                  background:
                    "radial-gradient(circle at top right, transparent 48px, var(--landing-canvas) 48px)",
                }}
              />
            </div>
          </h1>

          <div className="relative flex h-full flex-1 items-end justify-end self-end rounded-tl-[3vmax] bg-white pt-[4vmax] pl-[4vmax] font-light text-[max(1rem,1.4vmax)] dark:bg-landing-canvas">
            <ul className="flex flex-col items-end gap-[max(0.7rem,0.8vmax)] opacity-50 transition-opacity duration-300 hover:opacity-100">
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <a
                  href="#faq"
                  className="group relative flex items-center gap-[max(0.6rem,0.8vmax)] pb-[max(0.1rem,0.2vmax)] text-neutral-900 no-underline dark:text-white"
                >
                  <span className="relative">
                    FAQ
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 origin-left bg-neutral-900 transition-all duration-300 group-hover:w-full dark:bg-white" />
                  </span>
                  <ArrowUpRight className="h-[max(1rem,1.4vmax)] w-[max(1rem,1.4vmax)]" />
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <a
                  href="/pricing"
                  className="group relative flex items-center gap-[max(0.6rem,0.8vmax)] pb-[max(0.1rem,0.2vmax)] text-neutral-900 no-underline dark:text-white"
                >
                  <span className="relative">
                    Pricing
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 origin-left bg-neutral-900 transition-all duration-300 group-hover:w-full dark:bg-white" />
                  </span>
                  <ArrowUpRight className="h-[max(1rem,1.4vmax)] w-[max(1rem,1.4vmax)]" />
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <a
                  href="#get-started"
                  className="group relative flex items-center gap-[max(0.6rem,0.8vmax)] pb-[max(0.1rem,0.2vmax)] text-neutral-900 no-underline dark:text-white"
                >
                  <span className="relative">
                    Run the benchmark
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 origin-left bg-neutral-900 transition-all duration-300 group-hover:w-full dark:bg-white" />
                  </span>
                  <ArrowUpRight className="h-[max(1rem,1.4vmax)] w-[max(1rem,1.4vmax)]" />
                </a>
              </motion.li>
            </ul>

            <div
              className="absolute bottom-0 left-0 block h-12 w-12 md:hidden"
              style={{
                background:
                  "radial-gradient(circle at top left, transparent 48px, white 48px)",
                transform: "translateX(-100%) translateZ(0)",
              }}
            >
              <div
                className="absolute inset-0 hidden dark:block"
                style={{
                  background:
                    "radial-gradient(circle at top left, transparent 48px, var(--landing-canvas) 48px)",
                }}
              />
            </div>
            <div
              className="absolute top-0 right-0 block h-12 w-12 md:hidden"
              style={{
                background:
                  "radial-gradient(circle at top left, transparent 48px, white 48px)",
                transform: "translateY(-100%) translateZ(0)",
              }}
            >
              <div
                className="absolute inset-0 hidden dark:block"
                style={{
                  background:
                    "radial-gradient(circle at top left, transparent 48px, var(--landing-canvas) 48px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* White Border Frame */}
        <div className="pointer-events-none absolute inset-0 top-0 left-0">
          <div className="absolute bottom-0 left-0 h-[4vmax] w-full bg-white dark:bg-landing-canvas" />
          <div className="absolute top-0 left-0 h-[4vmax] w-full bg-white dark:bg-landing-canvas" />
          <div className="absolute bottom-0 left-0 h-full w-[4vmax] bg-white dark:bg-landing-canvas" />
          <div className="absolute right-0 bottom-0 h-full w-[4vmax] bg-white dark:bg-landing-canvas" />
        </div>
      </div>
    </section>
  );
}
