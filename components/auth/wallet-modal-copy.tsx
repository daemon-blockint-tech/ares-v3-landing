"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useLayoutEffect } from "react";

function insertSubline(title: HTMLElement, text: string) {
  const next = title.nextElementSibling;
  if (next?.classList.contains("ares-wallet-modal-sub")) {
    next.textContent = text;
    return;
  }
  const p = document.createElement("p");
  p.className = "ares-wallet-modal-sub";
  p.textContent = text;
  title.insertAdjacentElement("afterend", p);
}

function patchModalCopy(): boolean {
  const root = document.querySelector<HTMLElement>(
    ".wallet-adapter-modal.ares-wallet-modal-root",
  );
  if (!root) return false;

  const title = root.querySelector<HTMLElement>("h1.wallet-adapter-modal-title");
  if (!title) return false;
  if (title.dataset.aresCopy === "1") return true;

  const raw = title.textContent?.trim() ?? "";

  if (raw.includes("Connect a wallet on Solana")) {
    title.textContent = "Choose a wallet";
    insertSubline(title, "Pick Phantom or WalletConnect.");
  } else if (raw.includes("You'll need a wallet")) {
    title.textContent = "Install a Solana wallet";
    insertSubline(title, "Then refresh this page and try again.");
  } else {
    return true;
  }

  if (!title.id) title.id = "wallet-adapter-modal-title";
  title.dataset.aresCopy = "1";
  return true;
}

/**
 * Replaces default wallet-adapter modal titles (hardcoded in the package) with
 * concise ARES copy and fixes aria-labelledby (upstream references an id the h1
 * does not set).
 */
export function WalletModalCopy() {
  const { visible } = useWalletModal();

  useLayoutEffect(() => {
    if (!visible) return;
    if (patchModalCopy()) return;
    queueMicrotask(() => {
      void patchModalCopy();
    });
  }, [visible]);

  return null;
}
