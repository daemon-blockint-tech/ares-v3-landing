import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { requireDashboardUser } from "@/lib/dashboard/require-dashboard-user";

export default async function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { email } = await requireDashboardUser();

  return (
    <div className="min-h-[100dvh] bg-[#060812] text-white">
      <DashboardShell>
        <DashboardLayout userEmail={email}>{children}</DashboardLayout>
      </DashboardShell>
    </div>
  );
}
