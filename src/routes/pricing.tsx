import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Lume OS" },
      { name: "description", content: "Simple, scalable pricing for freelancers, growing teams and global agencies. Start free, upgrade when revenue follows." },
      { property: "og:title", content: "Pricing — Lume OS" },
      { property: "og:description", content: "Start free. Upgrade when revenue follows." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  { name: "Starter", price: "$29", tagline: "For freelancers & solo marketers.", cta: "Start free", features: ["1 workspace", "Up to 3 channels", "AI copy & briefs", "Basic analytics", "Email support"] },
  { name: "Growth", price: "$99", tagline: "For growing teams & SMBs.", cta: "Start free trial", features: ["5 workspaces", "All channels + automations", "Funnel & CRM", "A/B testing engine", "Priority support"], featured: true },
  { name: "Agency", price: "$299", tagline: "For agencies running many clients.", cta: "Talk to sales", features: ["Unlimited workspaces", "White-label portals", "Multi-currency & 28 languages", "SSO & audit logs", "Dedicated success manager"] },
];

function PricingPage() {
  return (
    <PageShell eyebrow="Pricing" title="Pricing that grows with you." lede="No per-seat surprises. No data caps that punish growth. Annual billing saves 20%.">
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className={`flex flex-col rounded-2xl border p-8 ${t.featured ? "border-ink bg-ink text-canvas" : "border-zinc-200 bg-white"}`}>
            <div className={`text-xs font-semibold uppercase tracking-widest ${t.featured ? "text-brand" : "text-ink/50"}`}>{t.name}</div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">{t.price}</span>
              <span className={t.featured ? "text-canvas/60" : "text-ink/50"}>/mo</span>
            </div>
            <p className={`mt-3 text-sm ${t.featured ? "text-canvas/70" : "text-ink/60"}`}>{t.tagline}</p>
            <ul className="my-8 space-y-3">
              {t.features.map((f) => (
                <li key={f} className={`flex items-center gap-3 text-sm ${t.featured ? "text-canvas/80" : "text-ink/70"}`}>
                  <Check className="size-4 text-brand" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/signup" className={`mt-auto rounded-lg py-3 text-center text-sm font-medium ${t.featured ? "bg-brand text-white hover:brightness-110" : "border border-ink/10 hover:bg-zinc-100"}`}>
              {t.cta}
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-ink/50">All plans include unlimited contacts, GDPR controls, and 99.9% uptime SLA.</p>
    </PageShell>
  );
}
