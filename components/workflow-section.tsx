const steps = [
  {
    step: "01",
    title: "Describe the surface",
    body: "Paste HTML, a Figma link, or a short brief: structure beats pixel-perfect parity.",
  },
  {
    step: "02",
    title: "Normalize the shell",
    body: "App Router layout, fonts, tokens, and section boundaries land first.",
  },
  {
    step: "03",
    title: "Harden interactions",
    body: "Keyboard paths, focus rings, reduced motion, and resilient SVG ids (e.g. useId).",
  },
];

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="scroll-mt-24 border-t border-[var(--border)] bg-white/[0.02] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Rebuild workflow
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Same flow as cloning a live marketing page, minus duplicate filters, inline
          flight payloads, and non-semantic noise.
        </p>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-zinc-950/50 p-6">
                <span className="font-mono text-xs text-[var(--accent)]">{s.step}</span>
                <h3 className="mt-3 font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
