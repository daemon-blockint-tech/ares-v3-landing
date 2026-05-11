import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navigation2 } from "@/components/blocks/navigation-2";
import { getPayShGatewayCheckoutUrl } from "@/lib/payment-config";

export const metadata: Metadata = {
  title: "Lifetime license · ARES V3",
  description:
    "Complete your ARES V3 lifetime commercial license with USDC via x402 (this site: PayAI facilitator; optional pay.sh gateway when configured).",
};

export default function LicensePayPage() {
  const payShGatewayUrl = getPayShGatewayCheckoutUrl();

  return (
    <>
      <Navigation2 />
      <main className="relative min-h-screen bg-landing-canvas pb-24 pt-8 text-white">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <Link
            href="/#pricing"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to pricing
          </Link>

          <h1 className="mb-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Lifetime commercial license
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-white/70">
            If you paid on <strong>this domain</strong> through the x402 paywall, settlement used the
            configured facilitator (default: PayAI on Base or Solana). Keep your wallet transaction
            as the receipt. If you paid through a separate <strong>pay.sh</strong> gateway URL from
            the operator (for example via <code className="text-white/80">pay curl</code> against the
            registry gateway), keep that response and on-chain record the same way—do not swap the
            gateway origin for an upstream URL (
            <a
              href="https://pay.sh/docs/pay-for-apis/discover-providers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400/90 underline decoration-white/20 underline-offset-4 hover:text-emerald-300"
            >
              pay.sh discovery guidance
            </a>
            ).
          </p>
          {payShGatewayUrl ? (
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              Operator-configured pay.sh checkout:{" "}
              <a
                href={payShGatewayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-emerald-400/90 underline decoration-white/20 underline-offset-4 break-all hover:text-emerald-300"
              >
                {payShGatewayUrl}
              </a>
            </p>
          ) : null}
          <p className="text-sm leading-relaxed text-white/55">
            If you still see the paywall here, finish the in-page checkout. Core engine remains free
            to clone from GitHub under MIT / Apache-2.0.
          </p>
        </div>
      </main>
    </>
  );
}
