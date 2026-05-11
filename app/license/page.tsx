import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navigation2 } from "@/components/blocks/navigation-2";
import { LicenseAgreementArticle } from "@/components/license/license-agreement-article";

export const metadata: Metadata = {
  title: "Commercial license · ARES V3",
  description:
    "Seat-based commercial terms for ARES V3: one Authorized User per seat, team scaling by additional seats or written agreement.",
};

export default function LicenseAgreementPage() {
  return (
    <>
      <Navigation2 />
      <main className="relative min-h-screen bg-landing-canvas pb-24 pt-8 text-white">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#pricing"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to pricing
          </Link>

          <LicenseAgreementArticle />
        </article>
      </main>
    </>
  );
}
