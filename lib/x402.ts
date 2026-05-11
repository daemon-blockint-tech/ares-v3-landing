import {
  HTTPFacilitatorClient,
  type FacilitatorConfig,
  type PaywallProvider,
  type RoutesConfig,
  x402ResourceServer,
} from "@x402/core/server";
import type { Network } from "@x402/core/types";
import { facilitator } from "@payai/facilitator";

/** PayAI production facilitator (override with FACILITATOR_URL). @see https://facilitator.payai.network */
const DEFAULT_PAYAI_FACILITATOR_URL = "https://facilitator.payai.network";

/**
 * x402 test playground (refunded test payments): https://x402.payai.network/
 * Example paid route: https://x402.payai.network/api/solana/paid-content
 */
function getPayAiFacilitatorConfig(): FacilitatorConfig {
  const url =
    process.env.FACILITATOR_URL?.trim() || DEFAULT_PAYAI_FACILITATOR_URL;
  return {
    url,
    createAuthHeaders: facilitator.createAuthHeaders,
  };
}
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { ExactSvmScheme } from "@x402/svm/exact/server";
import { createPaywall } from "@x402/paywall";
import { evmPaywall } from "@x402/paywall/evm";
import { svmPaywall } from "@x402/paywall/svm";

const testnet =
  process.env.X402_TESTNET === "1" || process.env.X402_TESTNET === "true";

export const x402EvmNetwork: Network = testnet ? "eip155:84532" : "eip155:8453";

export const x402SvmNetwork: Network = testnet
  ? "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
  : "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";

export function getEvmPayTo(): string | undefined {
  const v = process.env.EVM_ADDRESS?.trim();
  return v || undefined;
}

export function getSvmPayTo(): string | undefined {
  const v = process.env.SVM_ADDRESS?.trim();
  return v || undefined;
}

let resourceServer: x402ResourceServer | null = null;

export function getX402ResourceServer(): x402ResourceServer {
  if (!resourceServer) {
    const client = new HTTPFacilitatorClient(getPayAiFacilitatorConfig());
    resourceServer = new x402ResourceServer(client)
      .register(x402EvmNetwork, new ExactEvmScheme())
      .register(x402SvmNetwork, new ExactSvmScheme());
  }
  return resourceServer;
}

let paywall: PaywallProvider | null = null;

export function getX402Paywall(): PaywallProvider {
  if (!paywall) {
    paywall = createPaywall()
      .withNetwork(evmPaywall)
      .withNetwork(svmPaywall)
      .withConfig({
        appName: "ARES V3",
        testnet,
      })
      .build();
  }
  return paywall;
}

export function getLicensePaymentAccepts() {
  const evm = getEvmPayTo();
  const svm = getSvmPayTo();
  const accepts: Array<{
    scheme: "exact";
    price: "$299";
    network: Network;
    payTo: string;
  }> = [];

  if (evm) {
    accepts.push({
      scheme: "exact",
      price: "$299",
      network: x402EvmNetwork,
      payTo: evm,
    });
  }
  if (svm) {
    accepts.push({
      scheme: "exact",
      price: "$299",
      network: x402SvmNetwork,
      payTo: svm,
    });
  }
  return accepts;
}

export function getLicenseRoutes(): RoutesConfig {
  const accepts = getLicensePaymentAccepts();
  if (accepts.length === 0) {
    return {};
  }
  return {
    "/license/pay": {
      accepts,
      description:
        "ARES V3 lifetime commercial license (USDC, x402; PayAI facilitator in default deployment)",
      mimeType: "text/html",
    },
  };
}

export function isX402LicenseConfigured(): boolean {
  return getLicensePaymentAccepts().length > 0;
}
