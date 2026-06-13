import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Lume OS" },
      { name: "description", content: "Sign in to your Lume OS workspace." },
    ],
  }),
  component: () => <AuthScreen mode="signin" />,
});

export function AuthScreen({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">{isSignup ? "Get started" : "Welcome back"}</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{isSignup ? "Create your workspace" : "Sign in to Lume OS"}</h1>
          <p className="mt-3 text-sm text-ink/60">{isSignup ? "14-day free trial. No card required." : "Use your work email to continue."}</p>
          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink/60">Workspace name</label>
                <input type="text" placeholder="Acme Studio" className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2" />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">Work email</label>
              <input type="email" placeholder="you@company.com" className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">Password</label>
              <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white ring-1 ring-brand hover:brightness-110">
              {isSignup ? "Create workspace" : "Sign in"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-ink/60">
            {isSignup ? (
              <>Already have an account? <Link to="/login" className="font-medium text-brand">Sign in</Link></>
            ) : (
              <>New to Lume? <Link to="/signup" className="font-medium text-brand">Create a workspace</Link></>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
