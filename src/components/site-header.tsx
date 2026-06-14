import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/features", label: "Features" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/integrations", label: "Integrations" },
  { to: "/pricing", label: "Pricing" },
  { to: "/resources", label: "Resources" },
] as const;

export function SiteHeader() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => mounted && setSignedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      if (mounted) setSignedIn(!!session);
    });
    return () => { mounted = false; data.subscription.unsubscribe(); };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-ink text-canvas">
              <span className="size-2.5 rounded-sm bg-brand" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Lume OS</span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm font-medium text-ink/60 transition-colors hover:text-ink" activeProps={{ className: "text-ink" }}>
                {n.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {signedIn ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink">Dashboard</Link>
              <button onClick={signOut} className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-canvas ring-1 ring-ink transition-transform hover:bg-ink/90 active:scale-[0.98]">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/auth" className="px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink">Sign in</Link>
              <Link to="/auth" className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-canvas ring-1 ring-ink transition-transform hover:bg-ink/90 active:scale-[0.98]">Start free trial</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
