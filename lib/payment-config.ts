/**
 * Optional checkout URL for a pay.sh–operated payment gateway (metered x402 surface).
 * Use the gateway URL from your provider spec / registry as returned; do not swap in upstream origins.
 * @see https://pay.sh/docs/pay-for-apis/discover-providers
 * @see https://pay.sh/docs/accept-payments/gateway-overview
 */
export function getPayShGatewayCheckoutUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_PAY_SH_GATEWAY_URL?.trim();
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return undefined;
    if (u.protocol === "http:" && u.hostname !== "localhost" && u.hostname !== "127.0.0.1") {
      return undefined;
    }
    return u.toString();
  } catch {
    return undefined;
  }
}
