import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navigation2 } from "@/components/blocks/navigation-2";

export const metadata: Metadata = {
  title: "License purchase · ARES V3",
  description: "Thank you for your ARES V3 lifetime commercial license purchase.",
};

export default function LicenseSuccessPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const ref = searchParams.ref;

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
            Back to deployment
          </Link>

          <h1 className="mb-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Thank you
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-white/70">
            Your purchase is recorded. If you paid with USDC via x402 on this site, keep your
            on-chain transaction as the receipt. If you paid through a pay.sh gateway instead, keep
            the gateway response and chain record from that flow. Your team can follow up on license
            delivery and commercial terms using that reference.
          </p>
          {ref ? (
            <p className="rounded-lg border border-zinc-800 bg-zinc-950/80 px-4 py-3 font-mono text-xs text-white/60">
              Reference: {ref}
            </p>
          ) : null}
        </div>
      </main>
    </>
  );
}
