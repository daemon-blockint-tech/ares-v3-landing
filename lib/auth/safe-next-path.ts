/** Default in-app destination after successful auth when `next` is missing or unsafe. */
export const DEFAULT_AFTER_AUTH_PATH = "/dashboard";

/**
 * Returns a single path segment safe for same-origin redirects.
 * Rejects protocol-relative URLs (`//evil.com`) and non-path values.
 */
export function resolveSafeNextPath(next: string | null | undefined): string {
  if (!next || typeof next !== "string") return DEFAULT_AFTER_AUTH_PATH;
  const trimmed = next.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return DEFAULT_AFTER_AUTH_PATH;
  }
  return trimmed;
}
