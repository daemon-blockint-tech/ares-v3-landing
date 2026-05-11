import { NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { createClient } from "@/lib/supabase/server";

const MAX_SKEW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return NextResponse.json({ ok: false as const, error: "not_configured" }, { status: 503 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ ok: false as const, error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false as const, error: "bad_request" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const pubkey = typeof o.pubkey === "string" ? o.pubkey.trim() : "";
  const message = typeof o.message === "string" ? o.message : "";
  const signatureB64 = typeof o.signature === "string" ? o.signature : "";
  const timestamp = typeof o.timestamp === "number" ? o.timestamp : NaN;

  if (!pubkey || !message || !signatureB64 || !Number.isFinite(timestamp)) {
    return NextResponse.json({ ok: false as const, error: "invalid_body" }, { status: 400 });
  }

  if (Math.abs(Date.now() - timestamp) > MAX_SKEW_MS) {
    return NextResponse.json({ ok: false as const, error: "stale_timestamp" }, { status: 400 });
  }

  const expected = `ARES wallet link\nuser:${user.id}\ntimestamp:${timestamp}`;
  if (message !== expected) {
    return NextResponse.json({ ok: false as const, error: "message_mismatch" }, { status: 400 });
  }

  let pubBytes: Uint8Array;
  try {
    pubBytes = new PublicKey(pubkey).toBytes();
  } catch {
    return NextResponse.json({ ok: false as const, error: "invalid_pubkey" }, { status: 400 });
  }

  let sigBytes: Uint8Array;
  try {
    sigBytes = Buffer.from(signatureB64, "base64");
  } catch {
    return NextResponse.json({ ok: false as const, error: "invalid_signature" }, { status: 400 });
  }

  const msgBytes = new TextEncoder().encode(message);
  if (sigBytes.length !== 64 || !nacl.sign.detached.verify(msgBytes, sigBytes, pubBytes)) {
    return NextResponse.json({ ok: false as const, error: "verify_failed" }, { status: 401 });
  }

  const { error: upsertError } = await supabase.from("profiles").upsert(
    { id: user.id, wallet_pubkey: pubkey },
    { onConflict: "id" },
  );

  if (upsertError) {
    if (upsertError.code === "23505") {
      return NextResponse.json(
        { ok: false as const, error: "wallet_in_use" },
        { status: 409 },
      );
    }
    console.error("[link-wallet]", upsertError);
    return NextResponse.json({ ok: false as const, error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true as const });
}
