import Link from "next/link";

const cols = [
  {
    title: "Product",
    links: [
            { label: "Ideas", href: "#ideas" },
            { label: "Workflow", href: "#workflow" },
            { label: "Changelog", href: "#docs" },
    ],
  },
  {
    title: "Resources",
    links: [
            { label: "Documentation", href: "https://nextjs.org/docs", external: true },
            { label: "MIT License", href: "https://opensource.org/licenses/MIT", external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <p className="font-semibold text-white">ARES</p>
          <p className="mt-2 max-w-xs text-sm text-zinc-500">
            Landing scaffold rebuilt from static HTML patterns: semantic sections,
            accessible landmarks, isolated client widgets.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                      {...("external" in l && l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-[var(--border)] pt-8 text-center text-xs text-zinc-600 sm:text-left">
        © {new Date().getFullYear()} ARES preview. Generic demo content.
      </p>
    </footer>
  );
}
