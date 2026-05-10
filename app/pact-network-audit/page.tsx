import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { Navigation2 } from "@/components/blocks/navigation-2";

export const metadata: Metadata = {
  title: "Pact Network: Security audit report · ARES V3",
  description:
    "Published findings for @q3labs/pact-monitor v0.1.4 and pact-protocol: seven validated findings across SDK and Solana contract surfaces.",
};

export default function PactNetworkAuditPage() {
  const reportPath = path.join(
    process.cwd(),
    "PactNetwork_Security_Audit_Report.md",
  );
  const markdown = fs.readFileSync(reportPath, "utf8");

  return (
    <>
      <Navigation2 />
      <main className="relative min-h-screen bg-landing-canvas pb-24 pt-8 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#audit-spotlight"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to audit spotlight
          </Link>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-2 text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-[2rem]">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-12 mb-4 border-b border-zinc-800 pb-3 text-xl font-medium tracking-tight text-white first:mt-0 sm:text-2xl">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-8 mb-3 text-lg font-medium text-white">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-[0.9375rem] leading-relaxed text-white/75 sm:text-base">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-medium text-white">{children}</strong>
                ),
                hr: () => <hr className="my-10 border-zinc-800" />,
                ul: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-2 pl-5 text-white/75">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 list-decimal space-y-2 pl-5 text-white/75">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[var(--solana-green)] underline-offset-2 hover:underline"
                  >
                    {children}
                  </a>
                ),
                code: ({ className, children, ...props }) => {
                  const isBlock = Boolean(className?.includes("language-"));
                  if (isBlock) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.875em] text-[var(--solana-green)]"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="mb-6 overflow-x-auto rounded-xl border border-zinc-800 bg-[#050814] p-4 text-sm leading-relaxed text-white/85">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <div className="mb-6 overflow-x-auto rounded-xl border border-zinc-800">
                    <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="border-b border-zinc-800 bg-zinc-900/80">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => (
                  <tr className="border-b border-zinc-800/80 last:border-0">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2.5 font-medium text-white">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2.5 text-white/75">{children}</td>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="mb-4 border-l-2 border-[var(--solana-green)]/50 pl-4 text-white/65">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </article>

          <p className="mt-8 text-center text-xs text-white/40">
            Source file also available as{" "}
            <a
              href="/pact-network-security-audit-report.md"
              className="text-white/55 underline-offset-2 hover:text-white hover:underline"
            >
              Markdown download
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
