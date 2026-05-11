"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
  type ReactNode,
} from "react";
import {
  CreditCard,
  FileKey2,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  createBrowserSupabaseClient,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase/client";

const MOBILE = "(max-width: 1023px)";
const fontSans = { fontFamily: "var(--font-geist-sans), system-ui" } as const;

type NavItem = { href: string; label: string; icon: typeof Home };

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/", label: "Site", icon: Home },
  { href: "/dashboard/pricing", label: "Pricing", icon: CreditCard },
  { href: "/dashboard/license", label: "License", icon: FileKey2 },
];

function navItemActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/dashboard/";
  }
  if (href === "/") {
    return pathname === "/" || pathname === "";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SidebarCtx = {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  isMobile: boolean;
  toggle: () => void;
};

const Ctx = createContext<SidebarCtx | null>(null);

function useDashboardSidebar() {
  const v = useContext(Ctx);
  if (!v) throw new Error("DashboardLayout: missing provider");
  return v;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

function SidebarProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    startTransition(() => {
      setOpen(!isMobile);
    });
  }, [isMobile]);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  const value = useMemo(
    () => ({ isOpen, setOpen, isMobile, toggle }),
    [isOpen, isMobile, toggle],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function DashboardSidebar() {
  const pathname = usePathname();
  const { isOpen, setOpen, isMobile, toggle } = useDashboardSidebar();

  return (
    <>
      {isMobile && isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-zinc-950/75 backdrop-blur-[2px]"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "z-50 flex shrink-0 flex-col border-white/10 bg-zinc-950/85 backdrop-blur-xl transition-[transform,width,opacity] duration-200 ease-out",
          "border-r",
          isMobile
            ? cn(
                "fixed bottom-0 left-0 top-0 w-[min(100%,280px)] max-w-[280px]",
                isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
              )
            : cn(
                "sticky top-0 h-[100dvh] w-[260px]",
                !isOpen && "hidden",
              ),
        )}
        aria-hidden={isMobile ? !isOpen : false}
        style={fontSans}
      >
        <div className="flex h-14 items-center justify-between gap-2 border-b border-white/10 px-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 no-underline"
            onClick={() => isMobile && setOpen(false)}
          >
            <Image
              src="/ARES_LOGO_WHITE.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 object-contain"
            />
            <span className="truncate text-sm font-semibold tracking-tight text-white/95">
              ARES
            </span>
          </Link>
          {isMobile ? (
            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 text-white/80 transition hover:bg-white/10"
            >
              <X className="h-4 w-4" aria-hidden />
              <span className="sr-only">Close menu</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/55 transition hover:bg-white/10 lg:inline-flex"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" aria-hidden />
              <span className="sr-only">Collapse sidebar</span>
            </button>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-3" aria-label="Dashboard">
          <div>
            <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
              App
            </p>
            <div className="flex flex-col gap-1">
              {NAV.filter((i) => i.href === "/dashboard").map(({ href, label, icon: Icon }) => {
                const active = navItemActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => isMobile && setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition",
                      active
                        ? "bg-teal-500/15 text-teal-100 ring-1 ring-teal-400/25"
                        : "text-white/65 hover:bg-white/[0.06] hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
              Marketing
            </p>
            <div className="flex flex-col gap-1">
              {NAV.filter((i) => i.href !== "/dashboard").map(({ href, label, icon: Icon }) => {
                const active = navItemActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => isMobile && setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition",
                      active
                        ? "bg-teal-500/15 text-teal-100 ring-1 ring-teal-400/25"
                        : "text-white/65 hover:bg-white/[0.06] hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

function DashboardTopbar({ email }: { email: string | null }) {
  const router = useRouter();
  const { toggle, isOpen, isMobile, setOpen } = useDashboardSidebar();
  const configured = isSupabaseBrowserConfigured();
  const supabase = configured ? createBrowserSupabaseClient() : null;

  const onSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-white/10 bg-zinc-950/55 px-3 backdrop-blur-md sm:px-4"
      style={fontSans}
    >
      <button
        type="button"
        onClick={() => toggle()}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 text-white/85 transition hover:bg-white/10 lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden />
        <span className="sr-only">Toggle navigation</span>
      </button>

      {!isMobile && !isOpen ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 text-white/55 transition hover:bg-white/10 lg:inline-flex"
          title="Expand sidebar"
        >
          <Menu className="h-5 w-5" aria-hidden />
          <span className="sr-only">Expand sidebar</span>
        </button>
      ) : null}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white/90">ARES dashboard</p>
        <p className="truncate text-[11px] text-white/45">
          Signed-in shell · search when API is connected
        </p>
      </div>

      <div className="hidden max-w-[14rem] flex-1 sm:block sm:max-w-xs">
        <label htmlFor="dash-global-search" className="sr-only">
          Search runs and workspaces
        </label>
        <input
          id="dash-global-search"
          type="search"
          disabled
          placeholder="Runs and workspaces…"
          className="h-9 w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 text-xs text-white/45 placeholder:text-white/30"
          title="Available after your backend indexes runs"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className="hidden max-w-[10rem] truncate text-xs text-white/55 md:inline"
          title={email ?? undefined}
        >
          {email ?? "Signed in"}
        </span>
        <button
          type="button"
          onClick={() => void onSignOut()}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/14 bg-zinc-950/55 px-2.5 text-xs font-medium text-white/90 transition hover:bg-white/10 sm:px-3"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}

/**
 * App-shell layout inspired by classic admin dashboards: persistent sidebar,
 * sticky top bar, scrollable main. Self-contained (no template Prisma/auth).
 */
export function DashboardLayout({
  children,
  userEmail,
}: {
  children: ReactNode;
  userEmail: string | null;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-0 flex-1">
        <DashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar email={userEmail} />
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
