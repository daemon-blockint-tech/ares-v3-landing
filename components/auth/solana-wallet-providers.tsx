"use client";

import { useMemo, type ReactNode } from "react";
import {
  WalletAdapterNetwork,
  type WalletAdapter,
} from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletConnectWalletAdapter } from "@walletconnect/solana-adapter";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./wallet-adapter-modal-overrides.css";
import { WalletModalCopy } from "./wallet-modal-copy";

function getSolanaRpcEndpoint(): string {
  const raw = process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim();
  if (
    raw &&
    (raw.startsWith("http://") || raw.startsWith("https://"))
  ) {
    return raw;
  }
  return clusterApiUrl(WalletAdapterNetwork.Mainnet);
}

export function SolanaWalletProviders({ children }: { children: ReactNode }) {
  const endpoint = getSolanaRpcEndpoint();

  const wallets = useMemo((): WalletAdapter[] => {
    const list: WalletAdapter[] = [new PhantomWalletAdapter()];
    const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
    if (projectId) {
      list.push(
        new WalletConnectWalletAdapter({
          network: WalletAdapterNetwork.Mainnet,
          options: { projectId },
        }),
      );
    }
    return list;
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider className="ares-wallet-modal-root">
          {children}
          <WalletModalCopy />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
