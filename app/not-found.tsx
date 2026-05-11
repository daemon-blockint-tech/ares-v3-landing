import type { Metadata } from "next";
import NotFound3 from "@/components/blocks/404-3";

export const metadata: Metadata = {
  title: "Page not found · ARES",
  description: "The page you requested does not exist or has been moved.",
};

export default function NotFound() {
  return <NotFound3 />;
}
