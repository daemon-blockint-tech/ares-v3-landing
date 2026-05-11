"use client";

import MetallicSwirl from "@/components/react-bits/metallic-swirl";

/**
 * Full-viewport metallic field behind the dashboard (React Bits Pro).
 * Slate → teal gradient, subdued opacity — no purple / neon accent stack (taste-design).
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[100dvh] flex-1 flex-col">
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh] w-full"
        aria-hidden
      >
        <MetallicSwirl
          className="absolute inset-0 h-full min-h-[100dvh] w-full"
          width="100%"
          height="100%"
          speed={0.5}
          zoom={6.2}
          iterations={9}
          brightness={0.92}
          backgroundColor="#060812"
          gradientFrom="#0f172a"
          gradientTo="#134e4a"
          opacity={0.5}
          cursorInteraction={false}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#060812]/78"
        aria-hidden
      />
      <div className="relative z-[2] flex min-h-0 flex-1 flex-col pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
