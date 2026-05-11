"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { tryCreateBrowserSupabaseClient } from "@/lib/supabase/client";

type NavAuthVariant = "desktop" | "mobile";

const navPrimaryPillClass =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-landing-canvas px-3 py-2 text-xs font-light tracking-tight text-white no-underline hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:px-4 sm:text-sm";

/** Desktop-only: Sign in when logged out; Dashboard when logged in; hidden benchmark CTA if Supabase off. */
export function NavDesktopPrimaryCta({
  onMouseEnter,
}: {
  onMouseEnter?: () => void;
}) {
  const supabase = useMemo(() => tryCreateBrowserSupabaseClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(() => !tryCreateBrowserSupabaseClient());

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setSessionLoaded(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  if (!sessionLoaded) {
    return (
      <span
        className={`${navPrimaryPillClass} min-w-[6.5rem] cursor-default opacity-40`}
        aria-hidden
      >
        …
      </span>
    );
  }

  if (!supabase || !user) {
    return (
      <Link
        href="/sign-in"
        className={navPrimaryPillClass}
        onMouseEnter={onMouseEnter}
      >
        Sign in
      </Link>
    );
  }

  return (
    <Link
      href="/dashboard"
      className={navPrimaryPillClass}
      onMouseEnter={onMouseEnter}
    >
      Dashboard
    </Link>
  );
}

export function NavAuthActions({ variant = "desktop" }: { variant?: NavAuthVariant }) {
  const supabase = useMemo(() => tryCreateBrowserSupabaseClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setSessionLoaded(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  }, [supabase]);

  if (!supabase) {
    return null;
  }

  if (!sessionLoaded) {
    return (
      <span className="inline-block w-14 shrink-0 text-center text-xs text-neutral-500 dark:text-neutral-500">
        …
      </span>
    );
  }

  if (user) {
    const label = user.email?.split("@")[0] ?? "Account";
    const labelMax =
      variant === "mobile"
        ? "max-w-[5.5rem] sm:max-w-[7rem]"
        : "max-w-[6.5rem] sm:max-w-[9rem] lg:max-w-[11rem]";
    return (
      <div className="flex min-w-0 max-w-full items-center gap-1.5 sm:gap-2">
        {variant === "mobile" ? (
          <Link
            href="/dashboard"
            className="shrink-0 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-100 no-underline hover:bg-emerald-500/20"
          >
            Dashboard
          </Link>
        ) : null}
        <span
          className={`min-w-0 truncate text-xs font-medium text-neutral-700 dark:text-neutral-300 ${labelMax}`}
          title={user.email ?? undefined}
        >
          {label}
        </span>
        <button
          type="button"
          onClick={() => void signOut()}
          className="shrink-0 rounded-lg border border-neutral-300 px-2.5 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-900"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Link
        href="/sign-in"
        className={
          variant === "desktop"
            ? "hidden"
            : "rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-800 no-underline hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-900"
        }
      >
        Sign in
      </Link>
      <Link
        href="/sign-up"
        className={
          variant === "desktop"
            ? "rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-600 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            : "hidden rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-600 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white sm:inline"
        }
      >
        Sign up
      </Link>
    </div>
  );
}
