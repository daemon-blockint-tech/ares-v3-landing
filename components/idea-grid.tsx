import Link from "next/link";
import { Sparkles, Wallet, LineChart, Boxes, Bot, Shield } from "lucide-react";

const ideas = [
  {
    title: "Wallet-aware dashboard",
    description: "Balances, history, and actions with sane loading states.",
    icon: Wallet,
    tag: "Starter",
  },
  {
    title: "Market terminal",
    description: "Dense tables, sparklines, and keyboard-friendly focus.",
    icon: LineChart,
    tag: "Fintech",
  },
  {
    title: "Protocol explorer",
    description: "Instruction traces, PDAs, and read-only personas.",
    icon: Boxes,
    tag: "DeFi",
  },
  {
    title: "Agent console",
    description: "Chat + tool traces with collapsible context panes.",
    icon: Bot,
    tag: "AI",
  },
  {
    title: "Compliance cockpit",
    description: "Queues, SLAs, and audit-friendly detail drawers.",
    icon: Shield,
    tag: "Ops",
  },
  {
    title: "Launch page system",
    description: "Hero, proof, pricing, FAQ: repeatable sections.",
    icon: Sparkles,
    tag: "GTM",
  },
];

export function IdeaGrid() {
  return (
    <section
      id="ideas"
      className="scroll-mt-24 border-t border-[var(--border)] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Start from a real screen
            </h2>
            <p className="mt-2 max-w-xl text-zinc-400">
              Pick a template lane: each maps to components you can lift into your app
              without wrestling duplicated SVG IDs or mystery globals.
            </p>
          </div>
          <Link
            href="#docs"
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View component map →
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <article className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.04]">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--accent)] ring-1 ring-white/10">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-zinc-400 ring-1 ring-white/10">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                  <Link
                    href="#start"
                    className="mt-4 inline-flex text-sm font-medium text-white opacity-80 transition-opacity group-hover:opacity-100"
                  >
                    Use template →
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
