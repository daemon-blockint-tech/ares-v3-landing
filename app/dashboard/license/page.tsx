import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { LicenseAgreementArticle } from "@/components/license/license-agreement-article";

export const metadata: Metadata = {
  title: "License · ARES dashboard",
  description:
    "Commercial license agreement inside your signed-in ARES workspace, with a link to the stand-alone document.",
};

const fontSans = { fontFamily: "var(--font-geist-sans), system-ui" } as const;

export default function DashboardLicensePage() {
  return (
    <main
      className="mx-auto max-w-3xl px-4 py-10 text-white sm:px-6 lg:py-14"
      style={fontSans}
    >
      <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white sm:text-xl">License</h1>
          <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-white/50">
            Same agreement text as the public route, kept here for procurement review while signed
            in.
          </p>
        </div>
        <Link
          href="/license"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/14 px-4 text-sm font-medium text-white/85 no-underline transition hover:bg-white/[0.07] sm:self-auto"
        >
          Stand-alone page
          <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
        </Link>
      </header>

      <article className="rounded-2xl border border-white/10 bg-zinc-950/35 p-6 backdrop-blur-md sm:p-8">
        <LicenseAgreementArticle />
      </article>
    </main>
  );
}
