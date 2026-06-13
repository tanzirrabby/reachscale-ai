import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Sparkles, Workflow, Users, BarChart3, FlaskConical, Globe2, Mail, Search, Megaphone, MessageSquare, Palette, Shield } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Lume OS" },
      { name: "description", content: "AI planning, automation, CRM, multi-channel orchestration, analytics, A/B testing and white-label — every marketing workflow in one OS." },
      { property: "og:title", content: "Features — Lume OS" },
      { property: "og:description", content: "Every marketing workflow, one schema, one workspace." },
    ],
  }),
  component: FeaturesPage,
});

const groups = [
  { icon: Sparkles, title: "AI Campaign Planner", body: "Briefs, audience definitions and creative variants generated from your goals and historicals." },
  { icon: Workflow, title: "Automation Workflows", body: "Visual journeys across email, SMS, ads and social with branching, delays and AI steps." },
  { icon: Users, title: "CRM & Lead Management", body: "Unified contact graph, lifecycle scoring, deduping and assignment rules." },
  { icon: Palette, title: "Funnel & Journey Maps", body: "Drag-and-drop visualization with conversion, drop-off and revenue attribution at every step." },
  { icon: Search, title: "SEO Workbench", body: "Topic research, on-page audits and rank tracking — wired into your content pipeline." },
  { icon: Megaphone, title: "Paid Ads Orchestration", body: "One canvas for Meta, Google, TikTok and LinkedIn. Budget pacing and creative rotation built in." },
  { icon: Mail, title: "Email & Lifecycle", body: "Drag-and-drop composer, AI subject testing, deliverability monitoring and warmup." },
  { icon: MessageSquare, title: "Social Scheduling", body: "Cross-network calendar, approvals and AI caption variants tuned per platform." },
  { icon: BarChart3, title: "Real-time Analytics", body: "Cross-channel KPIs, cohort retention and multi-touch attribution updated live." },
  { icon: FlaskConical, title: "A/B & CRO Engine", body: "Bayesian split testing on pages, emails and creatives with auto-promotion." },
  { icon: Globe2, title: "Global Reach", body: "Multi-language, multi-currency, regional data residency and translation memory." },
  { icon: Shield, title: "Security & Compliance", body: "SSO, audit logs, GDPR/CCPA workflows and consent-aware data routing." },
];

function FeaturesPage() {
  return (
    <PageShell
      eyebrow="Features"
      title="Every marketing workflow, in one schema."
      lede="Lume OS replaces your patchwork of point tools with a unified platform — from first idea to final attribution."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="flex flex-col bg-white p-8">
            <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-brand/10">
              <g.icon className="size-4 text-brand" />
            </div>
            <h3 className="mb-3 text-lg font-semibold">{g.title}</h3>
            <p className="text-sm leading-relaxed text-ink/60">{g.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
