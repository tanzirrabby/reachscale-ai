import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Blog & Resources — Lume OS" },
      { name: "description", content: "Field-tested guides, playbooks and benchmarks for modern marketing teams." },
      { property: "og:title", content: "Blog & Resources — Lume OS" },
      { property: "og:description", content: "Guides, playbooks and benchmarks for modern marketing teams." },
    ],
  }),
  component: ResourcesPage,
});

const posts = [
  { kind: "Playbook", title: "The 14-day AI campaign launch", read: "12 min" },
  { kind: "Benchmark", title: "2026 SMB conversion benchmarks", read: "8 min" },
  { kind: "Guide", title: "White-labeling client reporting that actually closes renewals", read: "10 min" },
  { kind: "Case study", title: "How Northwind Studio scaled to 80 clients on Lume", read: "6 min" },
  { kind: "Engineering", title: "Designing consent-aware data routing", read: "14 min" },
  { kind: "Opinion", title: "Why marketing OS beats marketing suite", read: "5 min" },
];

function ResourcesPage() {
  return (
    <PageShell eyebrow="Resources" title="Field notes from the marketing OS." lede="Guides, benchmarks and engineering notes from the teams building and running Lume.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.title} to="/resources" className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-8 transition-colors hover:bg-zinc-50">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">{p.kind}</div>
            <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
            <div className="mt-auto pt-8 text-xs text-ink/40">{p.read} read</div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
