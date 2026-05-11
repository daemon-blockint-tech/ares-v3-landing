"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check, Key } from "lucide-react";
import { getPayShGatewayCheckoutUrl } from "@/lib/payment-config";

const PAY_SH_DOCS = "https://pay.sh/docs";

function LifetimeLicenseCheckout() {
  const payShGatewayUrl = getPayShGatewayCheckoutUrl();

  const bullets = [
    "One-time USD 299 — HTTP 402 / x402 paywall (USDC on Base or Solana)",
    "This site’s checkout uses the PayAI facilitator with your configured payout addresses",
    "Same protocol can be reached through a pay.sh gateway URL when the operator publishes one",
    "Core engine remains free to clone from GitHub",
  ];

  return (
    <div className="flex flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-8 backdrop-blur-md">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
        <Key className="h-5 w-5 text-white" aria-hidden />
      </div>
      <div className="mb-2 flex flex-wrap items-baseline gap-3">
        <h3 className="text-2xl font-medium text-white">Lifetime commercial license</h3>
        <span className="text-lg font-medium text-emerald-400/90">$299</span>
        <span className="text-sm text-white/45">one-time</span>
      </div>
      <p className="mb-6 text-sm leading-relaxed text-white/55">
        Optional purchase for organizations that want a paid commercial seat record alongside the
        open-source core. Each purchase is <strong>one seat</strong> (one named developer); add
        seats or contact for a team arrangement. USDC settlement uses the{" "}
        <strong>x402</strong> payment flow: in-browser checkout on this domain goes through the{" "}
        <strong>PayAI</strong> facilitator (configurable via <code className="text-white/70">FACILITATOR_URL</code>
        ). You can also pay through a <strong>pay.sh</strong> gateway when the operator exposes that
        URL (for example <code className="text-white/70">pay curl</code> against the registry gateway
        — see{" "}
        <a
          href={PAY_SH_DOCS}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 underline decoration-white/25 underline-offset-4 hover:text-white"
        >
          pay.sh docs
        </a>
        ). Final sale terms stay between you and the seller.
      </p>
      <ul className="mb-8 flex-1 space-y-3">
        {bullets.map((t) => (
          <li key={t} className="flex gap-3 text-sm text-white/75">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/license/pay"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-white/90 no-underline sm:min-w-[12rem]"
        >
          Pay on this site (x402)
        </Link>
        {payShGatewayUrl ? (
          <a
            href={payShGatewayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-white/22 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-white/10 no-underline sm:min-w-[12rem]"
          >
            Pay via pay.sh gateway
          </a>
        ) : null}
      </div>
      <p className="mt-4 text-center text-xs text-white/45">
        <Link href="/license" className="text-white/55 underline decoration-white/25 underline-offset-4 hover:text-white/80">
          Read full license agreement
        </Link>
      </p>
    </div>
  );
}

export default function Pricing2() {
  return (
    <section
      id="pricing"
      className="relative w-full scroll-mt-24 bg-landing-canvas px-4 py-16 text-white sm:px-6 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
            Pricing
          </p>
          <h2 className="mx-auto mb-6 max-w-4xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.25] tracking-tight text-white">
            One core, pick your surface
          </h2>
          <p className="mx-auto max-w-2xl text-base text-white/55">
            The core analyzer stays local and we deliberately do not meter the open-source path —
            that costs us runway as a small team, but it keeps the signal reproducible for
            everyone. Optional layers and the commercial seat exist so organizations can pay where
            procurement and delivery need a contract, without changing deterministic outputs.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/45">
            <Link
              href="/pricing"
              className="font-medium text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white"
            >
              Full plan comparison table
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-8"
        >
          <LifetimeLicenseCheckout />
        </motion.div>

      </div>
    </section>
  );
}
