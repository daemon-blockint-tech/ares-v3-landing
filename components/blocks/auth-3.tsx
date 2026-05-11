"use client";

/**
 * React Bits Pro `auth-3` block — use {@link AuthPanel} for production routes
 * (`/sign-in`, `/sign-up`) with Supabase + Solana. This re-export keeps the
 * shadcn-installed file aligned with the app.
 */
import { AuthPanel } from "@/components/auth/auth-panel";

export function Auth3() {
  return <AuthPanel mode="sign-in" />;
}

export default Auth3;
