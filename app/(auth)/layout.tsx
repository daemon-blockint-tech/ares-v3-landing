import type { ReactNode } from "react";
import { SolanaWalletProviders } from "@/components/auth/solana-wallet-providers";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <SolanaWalletProviders>{children}</SolanaWalletProviders>;
}
