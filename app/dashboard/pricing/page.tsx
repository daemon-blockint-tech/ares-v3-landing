import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Pricing8 from "@/components/blocks/pricing-8";

export const metadata: Metadata = {
  title: "Pricing · ARES dashboard",
  description:
    "Plans and comparison inside your signed-in ARES workspace. Same content as the public pricing page, without leaving the dashboard shell.",
};

const fontSans = { fontFamily: "var(--font-geist-sans), system-ui" } as const;

export default function DashboardPricingPage() {
  return (
    <main
      className="mx-auto max-w-7xl px-4 py-10 text-white sm:px-6 lg:py-14"
      style={fontSans}
    >
      <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Plans</h1>
          <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-white/50">
            Compare tiers here while staying in the dashboard. The public page is unchanged if you
            need to share a link.
          </p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/14 px-4 text-sm font-medium text-white/85 no-underline transition hover:bg-white/[0.07] sm:self-auto"
        >
          Open public page
          <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <Pricing8 />
      </div>
    </main>
  );
}
