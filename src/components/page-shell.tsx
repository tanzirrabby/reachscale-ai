import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</span>
          <h1 className="mt-3 max-w-[22ch] text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-[56ch] text-pretty text-lg text-ink/60">{lede}</p>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>
      <SiteFooter />
    </div>
  );
}
