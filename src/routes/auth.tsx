import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or create account — Lume OS" },
      { name: "description", content: "Sign in to your Lume OS workspace or start a 14-day free trial." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { workspace_name: workspaceName || "My Workspace", display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Workspace created. Check your email if confirmation is required.");
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
      if (result.error) {
        toast.error(result.error.message ?? "Google sign-in failed");
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
      setLoading(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">{isSignup ? "Get started" : "Welcome back"}</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{isSignup ? "Create your workspace" : "Sign in to Lume OS"}</h1>
          <p className="mt-3 text-sm text-ink/60">{isSignup ? "14-day free trial. No card required." : "Use your work email or Google to continue."}</p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white py-2.5 text-sm font-medium text-ink hover:bg-zinc-50 disabled:opacity-50"
          >
            <svg className="size-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-ink/40">
            <div className="h-px flex-1 bg-zinc-200" /> or email <div className="h-px flex-1 bg-zinc-200" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink/60">Workspace name</label>
                  <input value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} type="text" placeholder="Acme Studio" className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ink/60">Your name</label>
                  <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder="Ada Lovelace" className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2" />
                </div>
              </>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">Work email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@company.com" className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} type="password" placeholder="••••••••" className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white ring-1 ring-brand hover:brightness-110 disabled:opacity-50">
              {loading ? "Please wait…" : isSignup ? "Create workspace" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-ink/60">
            {isSignup ? (
              <>Already have an account? <button onClick={() => setMode("signin")} className="font-medium text-brand">Sign in</button></>
            ) : (
              <>New to Lume? <button onClick={() => setMode("signup")} className="font-medium text-brand">Create a workspace</button></>
            )}
          </div>
          <div className="mt-2 text-center text-xs text-ink/40">
            <Link to="/">← Back to home</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
