"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

const WRAP =
  "auth-panel-wallet-wrap w-full [&_.wallet-adapter-dropdown]:block [&_.wallet-adapter-dropdown]:w-full";

/**
 * WalletMultiButton reads browser / adapter state that differs between SSR and the
 * first client render (e.g. startIcon + wallet name vs plain "Select Wallet"), which
 * causes hydration mismatches. Render a static shell until mount, then the real control.
 */
export function HydrationSafeWalletMultiButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={WRAP}>
        <div className="wallet-adapter-dropdown">
          <button
            type="button"
            disabled
            tabIndex={-1}
            className="wallet-adapter-button wallet-adapter-button-trigger"
          >
            Select Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={WRAP}>
      <WalletMultiButton />
    </div>
  );
}
