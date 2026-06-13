import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-zinc-50 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-ink text-canvas">
              <span className="size-2.5 rounded-sm bg-brand" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Lume OS</span>
          </div>
          <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-ink/50">
            The unified marketing operating system for the global digital economy.
          </p>
        </div>
        <div>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-ink/40">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/features" className="text-ink/70 hover:text-brand">Features</Link></li>
            <li><Link to="/integrations" className="text-ink/70 hover:text-brand">Integrations</Link></li>
            <li><Link to="/pricing" className="text-ink/70 hover:text-brand">Pricing</Link></li>
            <li><Link to="/dashboard" className="text-ink/70 hover:text-brand">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-ink/40">Solutions</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/use-cases" className="text-ink/70 hover:text-brand">For Agencies</Link></li>
            <li><Link to="/use-cases" className="text-ink/70 hover:text-brand">For Freelancers</Link></li>
            <li><Link to="/use-cases" className="text-ink/70 hover:text-brand">For SMBs</Link></li>
            <li><Link to="/resources" className="text-ink/70 hover:text-brand">Blog & Resources</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-ink/40">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="text-ink/70 hover:text-brand">Privacy Policy</a></li>
            <li><a href="#" className="text-ink/70 hover:text-brand">Terms of Service</a></li>
            <li><a href="#" className="text-ink/70 hover:text-brand">GDPR & Compliance</a></li>
            <li><a href="#" className="text-ink/70 hover:text-brand">Global Data Center</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
        <p className="text-xs text-ink/40">© {new Date().getFullYear()} Lume Systems Inc. All rights reserved.</p>
        <p className="text-xs text-ink/40">Available in 28 languages · Multi-currency · SOC 2 ready</p>
      </div>
    </footer>
  );
}
