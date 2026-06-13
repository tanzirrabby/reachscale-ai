import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "Use cases — Lume OS" },
      { name: "description", content: "How agencies, freelancers and SMBs use Lume OS to plan, automate and scale marketing — without the tab chaos." },
      { property: "og:title", content: "Use cases — Lume OS" },
      { property: "og:description", content: "Stories from agencies, freelancers and SMBs scaling on Lume OS." },
    ],
  }),
  component: UseCasesPage,
});

const cases = [
  { name: "Agencies", headline: "Run 50 client portfolios without 50 logins.", body: "White-label dashboards, automated reporting and per-client workspaces. Bill, brief and review from one cockpit.", stat: "+42%", statLabel: "client retention" },
  { name: "Freelancers", headline: "The all-in-one stack that replaces ten subscriptions.", body: "Plan campaigns, automate outreach and prove ROI without stitching together six tools and a spreadsheet.", stat: "12 hrs", statLabel: "saved per week" },
  { name: "SMBs", headline: "Enterprise marketing power, without the enterprise team.", body: "Launch funnels, nurture leads and optimize spend with an AI co-pilot that knows your numbers.", stat: "3.4×", statLabel: "pipeline growth" },
];

function UseCasesPage() {
  return (
    <PageShell eyebrow="Use cases" title="Built for every shape of marketing team." lede="One platform, three operating models. Switch the toolkit, not the workspace.">
      <div className="grid gap-6 md:grid-cols-3">
        {cases.map((c) => (
          <article key={c.name} className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">{c.name}</div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{c.headline}</h3>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-ink/60">{c.body}</p>
            <div className="mt-auto pt-8">
              <div className="text-3xl font-semibold tracking-tight">{c.stat}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-ink/40">{c.statLabel}</div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
