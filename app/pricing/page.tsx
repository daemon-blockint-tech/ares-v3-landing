import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navigation2 } from "@/components/blocks/navigation-2";
import Pricing8 from "@/components/blocks/pricing-8";

export const metadata: Metadata = {
  title: "Plans & comparison · ARES V3",
  description:
    "Compare open source core, one-time commercial seat, and team coverage for ARES V3.",
};

export default function PricingPage() {
  return (
    <>
      <Navigation2 />
      <main className="relative z-[1] min-h-screen bg-landing-canvas pt-24 text-white">
        <div className="mx-auto max-w-[1400px] px-4 pb-6 sm:px-6 lg:px-12">
          <Link
            href="/#pricing"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to pricing overview
          </Link>
        </div>
        <Pricing8 />
      </main>
    </>
  );
}
