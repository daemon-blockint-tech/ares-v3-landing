import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "Cloud ARES · Dashboard",
  description:
    "Signed-in operations view for ARES V3: KPIs, trends, pipeline phases, and run activity—ready to wire to your Cloud ARES API.",
};

const SIGN_IN = "/sign-in";

export default async function DashboardPage() {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) {
    redirect(`${SIGN_IN}?error=config`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`${SIGN_IN}?next=${encodeURIComponent("/dashboard")}`);
  }

  return (
    <div className="min-h-[100dvh] bg-[#060812] text-white">
      <DashboardShell>
        <header className="border-b border-white/10 bg-zinc-950/40 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <Image
                src="/ARES_LOGO_WHITE.png"
                alt="ARES"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span
                className="text-sm font-semibold tracking-tight text-white/90"
                style={{ fontFamily: "var(--font-geist-sans), system-ui" }}
              >
                ARES
              </span>
            </Link>
            <nav
              className="flex items-center gap-3 text-sm"
              style={{ fontFamily: "var(--font-geist-sans), system-ui" }}
            >
              <Link
                href="/"
                className="text-white/60 no-underline transition hover:text-white"
              >
                Site
              </Link>
              <Link
                href="/pricing"
                className="text-white/60 no-underline transition hover:text-white"
              >
                Pricing
              </Link>
            </nav>
          </div>
        </header>
        <DashboardView email={user.email ?? null} />
      </DashboardShell>
    </div>
  );
}
