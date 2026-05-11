import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

const SIGN_IN = "/sign-in";

export type DashboardSession = { email: string | null };

/**
 * Ensures Supabase is configured and the user is signed in for any /dashboard/* route.
 */
export async function requireDashboardUser(): Promise<DashboardSession> {
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

  return { email: user.email ?? null };
}
