"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { HydrationSafeWalletMultiButton } from "@/components/auth/hydration-safe-wallet-multi-button";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import {
  DEFAULT_AFTER_AUTH_PATH,
  resolveSafeNextPath,
} from "@/lib/auth/safe-next-path";
import {
  createBrowserSupabaseClient,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase/client";
import MetallicSwirl from "@/components/react-bits/metallic-swirl";
import "./wallet-multi-button-auth.css";

/**
 * WalletMultiButton `className` is ignored by BaseWalletConnectionButton (package hardcodes
 * `wallet-adapter-button-trigger`). Styling is applied via `wallet-multi-button-auth.css`
 * on `.auth-panel-wallet-wrap` (see HydrationSafeWalletMultiButton).
 */

const ARES_LOGO_WHITE = "/ARES_LOGO_WHITE.png";

function uint8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

export type AuthPanelMode = "sign-in" | "sign-up";

function OAuthPlaceholder({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      disabled
      title="Coming soon"
      className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium tracking-tight text-neutral-900 opacity-60 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
    >
      {icon}
      {label}
    </button>
  );
}

export function AuthPanel({ mode }: { mode: AuthPanelMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const configured = isSupabaseBrowserConfigured();
  const supabase = useMemo(
    () => (configured ? createBrowserSupabaseClient() : null),
    [configured],
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const queryBanner = useMemo(() => {
    const err = searchParams.get("error");
    if (err === "auth") return "Sign-in link expired or was invalid. Try again.";
    if (err === "config") return "Supabase is not configured on this deployment.";
    return null;
  }, [searchParams]);

  const { publicKey, signMessage, connected } = useWallet();

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const afterAuth = useCallback(() => {
    router.push(resolveSafeNextPath(searchParams.get("next")));
    router.refresh();
  }, [router, searchParams]);

  const startGitHubOAuth = useCallback(async () => {
    if (!supabase) return;
    setBusy(true);
    setBanner(null);
    try {
      const safeNext = resolveSafeNextPath(searchParams.get("next"));
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo },
      });
      if (error) {
        setBanner(error.message);
        return;
      }
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setBanner(
        "GitHub sign-in did not return a redirect URL. Enable the GitHub provider in the Supabase dashboard.",
      );
    } finally {
      setBusy(false);
    }
  }, [supabase, searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setBanner(null);
    try {
      if (mode === "sign-in") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          setBanner(error.message);
          return;
        }
        afterAuth();
        return;
      }

      const origin = window.location.origin;
      const confirmNext = resolveSafeNextPath(searchParams.get("next"));
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(confirmNext)}`,
        },
      });
      if (error) {
        setBanner(error.message);
        return;
      }
      setBanner("Check your email to confirm your account, then sign in.");
    } finally {
      setBusy(false);
    }
  };

  const onSignOut = async () => {
    if (!supabase) return;
    setBusy(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const onLinkWallet = async () => {
    if (!supabase || !user || !publicKey || !signMessage) return;
    setBusy(true);
    setBanner(null);
    try {
      const timestamp = Date.now();
      const message = `ARES wallet link\nuser:${user.id}\ntimestamp:${timestamp}`;
      const encoded = new TextEncoder().encode(message);
      const sig = await signMessage(encoded);
      const res = await fetch("/api/profile/link-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pubkey: publicKey.toBase58(),
          message,
          signature: uint8ToBase64(sig),
          timestamp,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setBanner(
          body.error === "wallet_in_use"
            ? "That wallet is already linked to another account."
            : "Could not link wallet. Try again or check you are signed in.",
        );
        return;
      }
      setBanner("Wallet linked to your profile.");
      router.push(DEFAULT_AFTER_AUTH_PATH);
      router.refresh();
    } catch {
      setBanner("Wallet signing failed or was cancelled.");
    } finally {
      setBusy(false);
    }
  };

  const shell = (card: ReactNode, brand?: ReactNode) => (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 z-0 min-h-[100dvh] w-full" aria-hidden>
        <MetallicSwirl
          className="absolute inset-0 h-full min-h-[100dvh] w-full"
          width="100%"
          height="100%"
          speed={0.75}
          zoom={5.8}
          iterations={10}
          brightness={1.08}
          backgroundColor="#060812"
          gradientFrom="#9945FF"
          gradientTo="#14F195"
          opacity={1}
          cursorInteraction
          cursorIntensity={1.15}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/30 dark:bg-black/40"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 lg:flex-row lg:gap-12">
        {card}
        {brand}
      </div>
    </div>
  );

  if (!configured || !supabase) {
    return shell(
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-neutral-900"
      >
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
          Account sign-in unavailable
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Set{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          (or{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
          </code>
          ), then redeploy.
        </p>
        <p className="mt-6 text-center text-sm">
          <Link
            href="/"
            className="font-medium text-neutral-900 no-underline hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
          >
            Back to site
          </Link>
        </p>
      </motion.div>,
      <BrandColumn />,
    );
  }

  const card = (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55 }}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-neutral-900"
    >
      <h1 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white">
        {user ? "Your account" : mode === "sign-in" ? "Sign in" : "Create an account"}
      </h1>
      {!user ? (
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          {mode === "sign-in" ? (
            <>
              New user?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-neutral-900 no-underline hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already registered?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-neutral-900 no-underline hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      ) : (
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          Signed in as{" "}
          <span className="font-medium text-neutral-900 dark:text-white">{user.email}</span>
        </p>
      )}

      {banner || queryBanner ? (
        <p
          className="mb-6 rounded-lg border-2 border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-200"
          role="status"
        >
          {banner ?? queryBanner}
        </p>
      ) : null}

      {user ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void onSignOut()}
              disabled={busy}
              className="rounded-lg border-2 border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-800"
            >
              Sign out
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-landing-canvas px-4 py-2.5 text-sm font-medium text-white no-underline hover:opacity-90 dark:bg-white dark:text-black"
            >
              Back to site
            </Link>
          </div>
          <section
            className="border-t border-neutral-200/80 pt-6 dark:border-neutral-700/70"
            aria-labelledby="auth-link-wallet-heading"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <div className="min-w-0 flex-1">
                <h2
                  id="auth-link-wallet-heading"
                  className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white"
                >
                  Link Solana wallet
                </h2>
                <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Connect a wallet, then sign the message to attach it to this profile.
                </p>
              </div>
              <div className="flex w-full min-w-0 flex-col gap-3">
                <HydrationSafeWalletMultiButton />
                <button
                  type="button"
                  onClick={() => void onLinkWallet()}
                  disabled={busy || !connected || !signMessage}
                  className="min-h-[44px] rounded-lg bg-landing-canvas px-6 py-3 text-sm font-medium text-white transition-[transform,opacity] active:translate-y-px disabled:opacity-50 dark:bg-white dark:text-black"
                >
                  Sign message &amp; link
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          <form onSubmit={(e) => void onSubmit(e)} className="mb-6 space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg border-2 border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border-2 border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-landing-canvas px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:opacity-95 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              {busy ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-sm text-neutral-500 dark:text-neutral-500">Or</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <div className="mb-6 border-t border-neutral-200/80 pt-6 dark:border-neutral-700/70">
            <section className="flex flex-col gap-4" aria-label="Solana wallet">
              <HydrationSafeWalletMultiButton />
              {connected && publicKey ? (
                <p
                  className="font-mono text-xs leading-relaxed text-neutral-600 dark:text-neutral-400"
                  title={publicKey.toBase58()}
                  role="status"
                >
                  Connected{" "}
                  <span className="text-neutral-900 dark:text-neutral-200">
                    {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
                  </span>
                </p>
              ) : null}
            </section>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-sm text-neutral-500 dark:text-neutral-500">Or</span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <div className="mb-6 space-y-3">
            <OAuthPlaceholder
              label={mode === "sign-in" ? "Sign in with Google" : "Sign up with Google"}
              icon={
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              }
            />
            <OAuthPlaceholder
              label={mode === "sign-in" ? "Sign in with Apple" : "Sign up with Apple"}
              icon={
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 814 1000" fill="currentColor" aria-hidden>
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
                </svg>
              }
            />
            <button
              type="button"
              onClick={() => void startGitHubOAuth()}
              disabled={!supabase || busy}
              title={!supabase ? "Configure Supabase to enable GitHub sign-in" : undefined}
              className="flex min-h-[44px] w-full items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium tracking-tight text-neutral-900 transition-[transform,background-color] hover:bg-neutral-50 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700/90"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {mode === "sign-in" ? "Sign in with GitHub" : "Sign up with GitHub"}
            </button>
          </div>

          <p className="text-center text-xs text-neutral-500 dark:text-neutral-500">
            {configured
              ? "GitHub uses your Supabase GitHub provider (GitHub OAuth App credentials in the Supabase dashboard). Google and Apple are not wired yet. You can also use email and password, or connect a Solana wallet above and link it after you sign in."
              : "Configure Supabase for email or GitHub sign-in. You can still connect a Solana wallet above and link it after you sign in once auth is available."}
          </p>
        </>
      )}

      <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
        {mode === "sign-in" ? (
          <>
            Can&apos;t sign in?{" "}
            <Link
              href="/"
              className="font-medium text-neutral-900 no-underline hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
            >
              Back to site
            </Link>
          </>
        ) : (
          <>
            Need the benchmark instead?{" "}
            <Link
              href="/#get-started"
              className="font-medium text-neutral-900 no-underline hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
            >
              Get started
            </Link>
          </>
        )}
      </p>
    </motion.div>
  );

  return shell(card, <BrandColumn />);
}

function BrandColumn() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.12 }}
      className="hidden max-w-sm lg:block"
    >
      <div className="mb-2">
        <Image
          src={ARES_LOGO_WHITE}
          alt="ARES V3"
          width={156}
          height={40}
          className="h-8 w-auto max-w-[min(100%,12rem)]"
          priority
        />
      </div>
      <h2 className="mb-4 text-4xl font-medium tracking-tighter text-white">
        Autonomous Security
        <br />
        For The Frontier.
      </h2>
      <p className="max-w-[28ch] text-lg tracking-tight text-white/90">
        Run the four-phase audit pipeline locally, then link an on-chain wallet after you sign in.
      </p>
    </motion.div>
  );
}
