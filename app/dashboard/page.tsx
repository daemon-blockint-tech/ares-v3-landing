import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard · ARES",
  description:
    "Signed-in shell for ARES: integrations, layout previews for charts and run tables, and navigation to the marketing site. Wire your API to replace placeholders.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
