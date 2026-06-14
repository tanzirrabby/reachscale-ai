import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, Workflow, Users, BarChart3, FlaskConical, Globe2, Mail,
  Search, Megaphone, MessageSquare, ArrowRight, Check, Shield, Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import dashboardImg from "@/assets/dashboard-preview.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lume OS — The operating system for modern marketing growth" },
      { name: "description", content: "All-in-one AI marketing platform for agencies, freelancers and SMBs to plan, automate, analyze and scale global campaigns from one unified workspace." },
      { property: "og:title", content: "Lume OS — Marketing OS for global growth" },
      { property: "og:description", content: "Plan, automate, and scale your global campaigns from a single unified workspace." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Sparkles, title: "AI Campaign Planner", body: "Generate multi-channel strategies, briefs and copy in seconds — grounded in your historical performance." },
  { icon: Workflow, title: "Automation Workflows", body: "Drag-and-drop journeys across email, SMS, ads and social. Branching, delays, AI steps included." },
  { icon: Users, title: "CRM & Lead Routing", body: "A unified contact graph with lifecycle scoring, deduping and intelligent assignment to the right owner." },
  { icon: BarChart3, title: "Real-time Analytics", body: "Cross-channel KPIs, cohort retention and attribution — all updated live with no warehouse to wire up." },
  { icon: FlaskConical, title: "A/B & CRO Engine", body: "Bayesian split testing on landing pages, emails and creatives with auto-promotion of winners." },
  { icon: Globe2, title: "Global Compliance", body: "GDPR, CCPA and regional data residency built in. Multi-language and multi-currency from day one." },
];

const channels = [
  { icon: Search, label: "SEO" },
  { icon: Megaphone, label: "Paid Ads" },
  { icon: Mail, label: "Email" },
  { icon: MessageSquare, label: "Social" },
];

const useCases = {
  Agencies: {
    headline: "Run 50 client portfolios without 50 logins.",
    body: "White-label dashboards, automated reporting and per-client workspaces. Bill, brief and review from one cockpit.",
    bullets: ["White-label client portals", "Automated weekly reports", "Per-workspace billing & roles"],
  },
  Freelancers: {
    headline: "The all-in-one stack that replaces ten subscriptions.",
    body: "Plan campaigns, automate outreach and prove ROI — without stitching together six tools and a spreadsheet.",
    bullets: ["AI brief & copy generation", "Lightweight CRM & invoicing", "Client-ready PDF reports"],
  },
  SMBs: {
    headline: "Enterprise marketing power, without the enterprise team.",
    body: "Launch funnels, nurture leads and optimize spend with an AI co-pilot that knows your numbers.",
    bullets: ["Guided campaign launches", "Funnel & journey visualizer", "Multi-currency checkout sync"],
  },
};
type UseCase = keyof typeof useCases;

const tiers = [
  { name: "Starter", price: "$29", tagline: "For freelancers & solo marketers.", cta: "Start free", features: ["1 workspace", "Up to 3 channels", "AI copy & briefs", "Basic analytics", "Email support"] },
  { name: "Growth", price: "$99", tagline: "For growing teams & SMBs.", cta: "Start free trial", features: ["5 workspaces", "All channels + automations", "Funnel & CRM", "A/B testing engine", "Priority support"], featured: true },
  { name: "Agency", price: "$299", tagline: "For agencies running many clients.", cta: "Talk to sales", features: ["Unlimited workspaces", "White-label portals", "Multi-currency & 28 languages", "SSO & audit logs", "Dedicated success manager"] },
];

const integrations = ["Meta Ads", "Google Ads", "HubSpot", "Shopify", "Stripe", "Mailchimp", "Slack", "Zapier", "LinkedIn", "TikTok", "GA4", "Webflow"];

function Landing() {
  const [activeCase, setActiveCase] = useState<UseCase>("Agencies");
  const uc = useCases[activeCase];

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-brand/10 selection:text-brand">
      <SiteHeader />

      {/* Hero */}
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
            <span className="relative flex size-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60 opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-brand" /></span>
            Global Marketing Infrastructure
          </span>
          <h1 className="mb-6 max-w-[22ch] text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            The operating system for modern marketing growth
          </h1>
          <p className="mb-10 max-w-[52ch] text-pretty text-lg text-ink/60 md:text-xl">
            Plan, automate, and scale your global campaigns from a single unified workspace. Built for agencies and teams that demand precision.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/auth" className="inline-flex items-center gap-2 rounded-lg bg-brand py-2.5 pl-3 pr-4 text-sm font-medium text-white ring-1 ring-brand transition-transform hover:brightness-110 active:scale-[0.98]">
              <Sparkles className="size-4" /> Request a demo
            </Link>
            <Link to="/pricing" className="rounded-lg border border-ink/10 bg-canvas px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100">
              View pricing
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-ink/40">
            <span>Used by 4,200+ teams worldwide</span>
            <span className="hidden h-3 w-px bg-ink/10 md:block" />
            <span>28 languages</span>
            <span className="hidden h-3 w-px bg-ink/10 md:block" />
            <span>SOC 2 · GDPR · CCPA</span>
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-3xl bg-zinc-100 p-2 ring-1 ring-black/5">
            <div className="overflow-hidden rounded-[20px] bg-white shadow-2xl shadow-zinc-200">
              <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-zinc-200" />
                    <div className="size-2.5 rounded-full bg-zinc-200" />
                    <div className="size-2.5 rounded-full bg-zinc-200" />
                  </div>
                  <div className="ml-3 text-xs font-medium text-ink/40">app.lumeos.io / campaigns / global-q4</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-md border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-ink/60">Last 30 days</div>
                  <div className="size-8 rounded-md border border-zinc-100 bg-zinc-50" />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6 bg-zinc-50/50 p-6">
                <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
                  <img src={dashboardImg} alt="Lume OS analytics dashboard" width={1280} height={640} className="aspect-[2/1] w-full rounded-xl border border-zinc-200 object-cover outline outline-1 -outline-offset-1 outline-black/5" />
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { k: "MQLs this month", v: "12,840", d: "+18.2%" },
                      { k: "Blended CAC", v: "$42.10", d: "−6.4%" },
                    ].map((s) => (
                      <div key={s.k} className="rounded-xl border border-zinc-200 bg-white p-5">
                        <div className="text-xs font-medium uppercase tracking-widest text-ink/40">{s.k}</div>
                        <div className="mt-2 flex items-baseline gap-3">
                          <div className="text-2xl font-semibold tracking-tight">{s.v}</div>
                          <div className="text-xs font-medium text-brand">{s.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <div className="h-full rounded-xl border border-zinc-200 bg-white p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="text-sm font-semibold">AI suggestions</div>
                      <Sparkles className="size-4 text-brand" />
                    </div>
                    <div className="space-y-3">
                      {[
                        "Shift 12% of Meta spend to TikTok",
                        "New audience: SMB founders, EU-DACH",
                        "Test subject line variant on Tuesday send",
                      ].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
                          <div className={`size-6 rounded ${i === 0 ? "bg-brand/20" : "bg-zinc-200"}`} />
                          <div className="text-xs text-ink/70">{t}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channel strip */}
      <section className="border-y border-border bg-white px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-sm font-medium text-ink/50">One workspace. Every channel.</div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {channels.map((c) => (
              <div key={c.label} className="flex items-center gap-2 text-ink/70">
                <c.icon className="size-4" />
                <span className="text-sm font-medium">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-[52ch]">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">Platform</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Everything an agency runs on — minus the tab chaos.</h2>
            <p className="mt-4 text-pretty text-ink/60">From strategy to send to attribution, every workflow lives in one schema with one source of truth.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-8 transition-colors hover:bg-white">
                <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-brand/10">
                  <f.icon className="size-4 text-brand" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{f.title}</h3>
                <p className="mb-6 text-pretty text-sm leading-relaxed text-ink/60">{f.body}</p>
                <Link to="/features" className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-brand">
                  Learn more <ArrowRight className="size-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-[48ch]">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight">Tailored for your scale</h2>
              <p className="text-pretty text-ink/60">From solo creators to global agencies, our toolkit adapts to your operating model and compliance requirements.</p>
            </div>
            <div className="flex rounded-xl bg-zinc-100 p-1 ring-1 ring-black/5">
              {(Object.keys(useCases) as UseCase[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setActiveCase(k)}
                  className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${activeCase === k ? "bg-white text-ink shadow-sm" : "text-ink/50 hover:text-ink/80"}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-8 rounded-2xl border border-zinc-200 bg-white p-8 md:grid-cols-2 md:p-12">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{uc.headline}</h3>
              <p className="mt-4 max-w-[42ch] text-pretty text-ink/60">{uc.body}</p>
              <Link to="/use-cases" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand">
                See the {activeCase.toLowerCase()} story <ArrowRight className="size-3" />
              </Link>
            </div>
            <ul className="grid gap-3">
              {uc.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 rounded-xl bg-zinc-50 px-5 py-4">
                  <span className="grid size-6 place-items-center rounded-md bg-brand/10 text-brand">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-[48ch]">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">Integrations</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Plug into the stack you already use.</h2>
            </div>
            <Link to="/integrations" className="text-sm font-medium text-brand">Browse all 200+ →</Link>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {integrations.map((i) => (
              <div key={i} className="flex h-24 items-center justify-center bg-white text-sm font-medium text-ink/70">
                {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Pricing that grows with you</h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-ink/60">Start free. Upgrade when revenue follows. No per-seat surprises.</p>
          </div>
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
                      <Check className={`size-4 ${t.featured ? "text-brand" : "text-brand"}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/auth"
                  className={`mt-auto rounded-lg py-3 text-center text-sm font-medium transition-colors ${t.featured ? "bg-brand text-white hover:brightness-110" : "border border-ink/10 hover:bg-zinc-100"}`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink px-8 py-20 text-canvas md:px-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight md:text-5xl">Marketing operations, finally consolidated.</h2>
              <p className="mt-5 max-w-[42ch] text-canvas/60">Bring your team, clients and stack into one workspace. 14-day trial. No card required.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/auth" className="rounded-lg bg-brand px-5 py-3 text-sm font-medium text-white hover:brightness-110">Start free trial</Link>
                <Link to="/use-cases" className="rounded-lg border border-canvas/15 px-5 py-3 text-sm font-medium hover:bg-canvas/5">Talk to sales</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Zap, k: "10×", v: "Faster campaign launches" },
                { icon: Shield, k: "SOC 2", v: "Type II ready" },
                { icon: Globe2, k: "28", v: "Languages supported" },
                { icon: BarChart3, k: "37%", v: "Avg. lift in conversion" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-canvas/10 bg-canvas/5 p-6">
                  <s.icon className="size-4 text-brand" />
                  <div className="mt-4 text-2xl font-semibold tracking-tight">{s.k}</div>
                  <div className="mt-1 text-xs text-canvas/60">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
