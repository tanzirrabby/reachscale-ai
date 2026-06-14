import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, BarChart3, Workflow, Users, Mail, Megaphone, Search, Settings, Bell, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Lume OS" }] }),
  component: Dashboard,
});

const navItems = [
  { icon: BarChart3, label: "Overview", to: "/dashboard" as const },
  { icon: Sparkles, label: "AI Studio", to: "/ai-studio" as const },
  { icon: Workflow, label: "Automations" },
  { icon: Users, label: "CRM" },
  { icon: Megaphone, label: "Ads" },
  { icon: Mail, label: "Email" },
  { icon: Search, label: "SEO" },
];

export function DashboardShell({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ display_name: string | null; workspace_name: string | null; avatar_url: string | null } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: row } = await supabase.from("profiles").select("display_name, workspace_name, avatar_url").eq("id", data.user.id).maybeSingle();
      setProfile(row);
    });
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 text-ink">
      <aside className="hidden w-64 flex-col border-r border-border bg-white px-4 py-6 md:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-2">
          <span className="grid size-7 place-items-center rounded-md bg-ink text-canvas"><span className="size-2.5 rounded-sm bg-brand" /></span>
          <span className="text-lg font-semibold tracking-tight">Lume OS</span>
        </Link>
        <nav className="flex-1 space-y-1">
          {navItems.map((n) =>
            n.to ? (
              <Link key={n.label} to={n.to} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:bg-zinc-50" activeProps={{ className: "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-zinc-100 text-ink" }}>
                <n.icon className="size-4" /> {n.label}
              </Link>
            ) : (
              <button key={n.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink/40 hover:bg-zinc-50">
                <n.icon className="size-4" /> {n.label}
                <span className="ml-auto text-[10px] uppercase tracking-widest">Soon</span>
              </button>
            ),
          )}
        </nav>
        <button onClick={signOut} className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink/60 hover:bg-zinc-50">
          <LogOut className="size-4" /> Sign out
        </button>
      </aside>

      <main className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-white px-8 py-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-ink/40">Workspace · {profile?.workspace_name ?? "My Workspace"}</div>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="grid size-9 place-items-center rounded-lg border border-zinc-200 bg-white"><Bell className="size-4 text-ink/60" /></button>
            <button className="grid size-9 place-items-center rounded-lg border border-zinc-200 bg-white"><Settings className="size-4 text-ink/60" /></button>
            <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand to-ink text-xs font-semibold text-white">
              {(profile?.display_name ?? "U").slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="p-8">
          <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</div>
          {children}
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <DashboardShell title="Overview" eyebrow="Welcome back">
      <div className="space-y-6">
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
          <Link to="/ai-studio" className="rounded-xl border border-zinc-200 bg-gradient-to-br from-brand/5 to-white p-6 transition-shadow hover:shadow-md">
            <Sparkles className="size-5 text-brand" />
            <div className="mt-4 text-base font-semibold">Campaign Copilot</div>
            <div className="mt-1 text-sm text-ink/60">Chat with an AI marketing strategist to brainstorm and refine campaigns.</div>
            <div className="mt-4 text-xs font-medium text-brand">Open chat →</div>
          </Link>
          <Link to="/ai-studio" search={{ tab: "copy" }} className="rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md">
            <Megaphone className="size-5 text-brand" />
            <div className="mt-4 text-base font-semibold">Ad Copy Generator</div>
            <div className="mt-1 text-sm text-ink/60">Generate headlines, descriptions, CTAs and hashtags for any channel.</div>
            <div className="mt-4 text-xs font-medium text-brand">Generate copy →</div>
          </Link>
          <Link to="/ai-studio" search={{ tab: "analyze" }} className="rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md">
            <BarChart3 className="size-5 text-brand" />
            <div className="mt-4 text-base font-semibold">Campaign Analyzer</div>
            <div className="mt-1 text-sm text-ink/60">Paste campaign data and get an instant summary, insights and next steps.</div>
            <div className="mt-4 text-xs font-medium text-brand">Analyze →</div>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
