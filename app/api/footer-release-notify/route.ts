import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function footerReleaseIdempotencyKey(email: string): string {
  const prefix = "footer-release/";
  const normalized = email.toLowerCase().trim();
  const maxBody = 256 - prefix.length;
  return prefix + normalized.slice(0, Math.max(0, maxBody));
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const notifyTo = process.env.RESEND_NOTIFY_TO;

  if (!apiKey || !from || !notifyTo) {
    return NextResponse.json({ ok: false as const, error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false as const, error: "bad_request" }, { status: 400 });
  }

  const raw =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email
      : "";
  const email = raw.trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false as const, error: "invalid_email" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send(
    {
      from,
      to: [notifyTo],
      replyTo: email,
      subject: `[ARES V3] Footer — release ping: ${email}`,
      html: `<p>Footer signup for release / benchmark notes.</p><p><strong>Address:</strong> ${escapeHtml(email)}</p><p><strong>UTC:</strong> ${escapeHtml(new Date().toISOString())}</p>`,
      tags: [{ name: "source", value: "footer" }],
    },
    { idempotencyKey: footerReleaseIdempotencyKey(email) },
  );

  if (error) {
    console.error("[footer-release-notify]", error);
    return NextResponse.json({ ok: false as const, error: "provider_error" }, { status: 502 });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error: dbError } = await supabase.from("release_notify_signups").insert({
      email,
      source: "footer_release_notify",
      resend_email_id: data?.id ?? null,
    });
    if (dbError && dbError.code !== "23505") {
      console.error("[footer-release-notify] supabase", dbError);
    }
  }

  return NextResponse.json({ ok: true as const, id: data?.id ?? null });
}
