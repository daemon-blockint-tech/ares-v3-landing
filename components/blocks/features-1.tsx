"use client";

import { motion } from "motion/react";
import {
  Zap,
  Braces,
  GitBranch,
  Scale,
  FolderGit2,
  TestTube2,
  Network,
  Shield,
} from "lucide-react";
import ParallaxCards from "@/components/react-bits/parallax-cards";
import { BlurHighlight } from "@/components/react-bits/blur-highlight";

export function Features1() {
  const features = [
    {
      icon: Zap,
      title: "Phase 1: Regex heuristics",
      description:
        "Skims every `.rs` file for loud patterns first. Comments and tests get downweighted so noise stays quieter.",
    },
    {
      icon: Braces,
      title: "Phase 2: Macro-aware AST",
      description:
        "Uses `syn` and `proc-macro2` to pull Anchor `Accounts` and Solitaire `FromAccounts` shapes the way expansion sees them, not just what you typed.",
    },
    {
      icon: GitBranch,
      title: "Phase 3: Intra-procedural taint",
      description:
        "Tracks taint inside each function from untrusted inputs to sinks like `invoke`, casts, and deserialization. Known-safe wrappers get whitelisted.",
    },
    {
      icon: Scale,
      title: "Phase 4: Local judge",
      description:
        "Cuts recurring false positives with deterministic AST metadata. No model temperature, no paid judge API.",
    },
    {
      icon: FolderGit2,
      title: "Workspace-scale scans",
      description:
        "Walks workspace members and rolls findings up per repo. Bad files get skipped so one junk path does not kill the run.",
    },
    {
      icon: TestTube2,
      title: "Two-segment benchmark",
      description:
        "Segment A is 11 deterministic stubs. Segment B is nine public production repos with published audits and honest recall caps. No staged leaderboard.",
    },
    {
      icon: Network,
      title: "Optional multi-source context",
      description:
        "The heavier layout can pull KB text, chain snapshots, and MCP tools for context. That layer stays fenced off so flaky IO cannot rewrite detections.",
    },
    {
      icon: Shield,
      title: "Policy guardrails",
      description:
        "Dispatch hooks for auth, scoped output, and audit logs so a sharp scanner still has explicit boundaries.",
    },
  ];

  const parallaxCards = features.map((feature) => {
    const Icon = feature.icon;
    return {
      title: feature.title,
      description: feature.description,
      icon: <Icon className="h-5 w-5 text-white/90" aria-hidden />,
    };
  });

  return (
    <section
      id="features"
      className="relative min-h-[min(90dvh,960px)] w-full overflow-hidden bg-landing-canvas py-16 text-white scroll-mt-24 sm:py-20 md:py-24"
    >
      <div className="relative z-[1] mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="mb-14 md:mb-20 lg:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-sm text-white/50"
          >
            Architecture
          </motion.p>

          <h2 className="mb-6 max-w-4xl text-[clamp(1.75rem,3.6vw,2.85rem)] font-medium leading-tight tracking-tight text-white">
            <BlurHighlight
              highlightedBits={[
                "Solana-shaped Rust",
                "Static checks",
              ]}
              highlightColor="rgba(20, 241, 149, 0.4)"
              highlightClassName="rounded-sm px-0.5 text-white"
              viewportOptions={{ once: true, amount: 0.4 }}
              blurAmount={7}
              blurDuration={0.75}
              highlightDelay={0.35}
              highlightDuration={0.85}
            >
              Static checks for Solana-shaped Rust
            </BlurHighlight>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Generic lint lags Solana. Core stack is regex, macro-aware AST, taint, and a
            local judge. Same inputs, same findings. Models stay optional and off detections.
          </motion.p>
        </div>

        <div className="relative -mx-2 min-h-[min(88vh,900px)] sm:-mx-4 md:min-h-[800px] lg:min-h-[880px]">
          <ParallaxCards
            cards={parallaxCards}
            perspective={2400}
            mouseSensitivity={2.35}
            cardWidth={292}
            cardHeight={252}
            enableDepthFog
            fogIntensity={0.88}
            animationDuration={1}
            className="min-h-[min(88vh,900px)] py-6 md:py-10"
          />
        </div>
      </div>
    </section>
  );
}
