import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { paymentProxy } from "@x402/next";
import {
  getLicenseRoutes,
  getX402Paywall,
  getX402ResourceServer,
  isX402LicenseConfigured,
} from "@/lib/x402";
import { updateSession } from "@/lib/supabase/middleware";

const routes = getLicenseRoutes();

const licensePayHandler = isX402LicenseConfigured()
  ? paymentProxy(routes, getX402ResourceServer(), undefined, getX402Paywall())
  : async function licensePayUnconfigured(req: NextRequest) {
      void req;
      return new NextResponse(
        `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>License checkout · ARES V3</title></head><body style="font-family:system-ui,sans-serif;background:#09090b;color:#fafafa;padding:2rem;max-width:40rem;margin:0 auto;line-height:1.5"><h1 style="font-size:1.25rem;font-weight:600">Checkout not configured</h1><p style="color:#a1a1aa">Set <code style="background:#18181b;padding:0.1rem 0.35rem;border-radius:0.25rem">EVM_ADDRESS</code> and/or <code style="background:#18181b;padding:0.1rem 0.35rem;border-radius:0.25rem">SVM_ADDRESS</code> for x402 payouts (default facilitator: PayAI). For testnets, set <code style="background:#18181b;padding:0.1rem 0.35rem;border-radius:0.25rem">X402_TESTNET=true</code>. Optional second surface: <code style="background:#18181b;padding:0.1rem 0.35rem;border-radius:0.25rem">NEXT_PUBLIC_PAY_SH_GATEWAY_URL</code> for a pay.sh gateway link on pricing.</p><p><a href="/#pricing" style="color:#86efac">Back to pricing</a></p></body></html>`,
        { status: 503, headers: { "content-type": "text/html; charset=utf-8" } },
      );
    };

function mergeAuthCookiesInto(authResponse: NextResponse, target: NextResponse) {
  authResponse.cookies.getAll().forEach((c) => {
    target.cookies.set(c.name, c.value);
  });
  return target;
}

export async function proxy(request: NextRequest) {
  const authResponse = await updateSession(request);

  if (!request.nextUrl.pathname.startsWith("/license/pay")) {
    return authResponse;
  }

  const paymentResponse = await licensePayHandler(request);
  return mergeAuthCookiesInto(authResponse, paymentResponse);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets so Supabase auth cookies refresh.
     * x402 payment handling still runs only for /license/pay below.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
