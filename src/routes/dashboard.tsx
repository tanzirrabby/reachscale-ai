import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, BarChart3, Workflow, Users, Mail, Megaphone, Search, Settings, Bell } from "lucide-react";
import dashboardImg from "@/assets/dashboard-preview.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Lume OS" },
      { name: "description", content: "Your Lume OS workspace — campaigns, automations, CRM and analytics." },
    ],
  }),
  component: Dashboard,
});

const navItems = [
  { icon: BarChart3, label: "Overview", active: true },
  { icon: Sparkles, label: "AI Studio" },
  { icon: Workflow, label: "Automations" },
  { icon: Users, label: "CRM" },
  { icon: Megaphone, label: "Ads" },
  { icon: Mail, label: "Email" },
  { icon: Search, label: "SEO" },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-zinc-50 text-ink">
      <aside className="hidden w-64 flex-col border-r border-border bg-white px-4 py-6 md:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-2">
          <span className="grid size-7 place-items-center rounded-md bg-ink text-canvas"><span className="size-2.5 rounded-sm bg-brand" /></span>
          <span className="text-lg font-semibold tracking-tight">Lume OS</span>
        </Link>
        <nav className="flex-1 space-y-1">
          {navItems.map((n) => (
            <button key={n.label} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${n.active ? "bg-zinc-100 text-ink" : "text-ink/60 hover:bg-zinc-50"}`}>
              <n.icon className="size-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="text-xs font-semibold">Upgrade to Growth</div>
          <div className="mt-1 text-xs text-ink/60">Unlock all channels and automations.</div>
          <Link to="/pricing" className="mt-3 inline-block text-xs font-medium text-brand">See plans →</Link>
        </div>
      </aside>

      <main className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-white px-8 py-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-ink/40">Workspace · Acme Studio</div>
            <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="grid size-9 place-items-center rounded-lg border border-zinc-200 bg-white"><Bell className="size-4 text-ink/60" /></button>
            <button className="grid size-9 place-items-center rounded-lg border border-zinc-200 bg-white"><Settings className="size-4 text-ink/60" /></button>
            <div className="size-9 rounded-full bg-gradient-to-br from-brand to-ink" />
          </div>
        </header>

        <div className="space-y-6 p-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {[
              { k: "Revenue (30d)", v: "$182.4k", d: "+22.4%" },
              { k: "MQLs", v: "12,840", d: "+18.2%" },
              { k: "Blended CAC", v: "$42.10", d: "−6.4%" },
              { k: "Active automations", v: "37", d: "12 running" },
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

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-semibold">Performance — last 30 days</div>
                <div className="rounded-md border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-ink/60">All channels</div>
              </div>
              <img src={dashboardImg} alt="" width={1280} height={640} loading="lazy" className="aspect-[2/1] w-full rounded-lg border border-zinc-100 object-cover" />
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-semibold">AI suggestions</div>
                <Sparkles className="size-4 text-brand" />
              </div>
              <div className="space-y-3">
                {[
                  "Shift 12% of Meta spend to TikTok",
                  "New audience: SMB founders, EU-DACH",
                  "Test subject line variant on Tuesday send",
                  "Pause underperforming Google search group",
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
                    <div className={`size-6 rounded ${i === 0 ? "bg-brand/20" : "bg-zinc-200"}`} />
                    <div className="text-xs text-ink/70">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-sm font-semibold">Active campaigns</div>
              <button className="text-xs font-medium text-brand">New campaign →</button>
            </div>
            <div className="overflow-hidden rounded-lg border border-zinc-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase tracking-widest text-ink/40">
                  <tr>
                    <th className="px-4 py-3 font-medium">Campaign</th>
                    <th className="px-4 py-3 font-medium">Channel</th>
                    <th className="px-4 py-3 font-medium">Spend</th>
                    <th className="px-4 py-3 font-medium">Conv.</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Q4 Global Launch", "Meta + Google", "$24,810", "4.8%", "Live"],
                    ["EU SMB Founders", "LinkedIn", "$8,420", "3.1%", "Live"],
                    ["Black Friday Tease", "Email + SMS", "$1,210", "9.7%", "Scheduled"],
                    ["Retention Win-Back", "Email", "$640", "12.4%", "Live"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-zinc-100">
                      {row.map((c, i) => (
                        <td key={i} className={`px-4 py-3 ${i === 0 ? "font-medium" : "text-ink/70"}`}>
                          {i === 4 ? (
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs ${c === "Live" ? "bg-brand/10 text-brand" : "bg-zinc-100 text-ink/60"}`}>
                              <span className={`size-1.5 rounded-full ${c === "Live" ? "bg-brand" : "bg-ink/40"}`} /> {c}
                            </span>
                          ) : c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
