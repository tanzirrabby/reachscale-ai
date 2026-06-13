import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Lume OS" },
      { name: "description", content: "200+ integrations across ads, CRM, commerce, analytics and productivity. Plus an open API for everything else." },
      { property: "og:title", content: "Integrations — Lume OS" },
      { property: "og:description", content: "Plug into the stack you already run." },
    ],
  }),
  component: IntegrationsPage,
});

const groups = {
  "Ads & Social": ["Meta Ads", "Google Ads", "TikTok Ads", "LinkedIn Ads", "X Ads", "Reddit Ads"],
  "CRM & Sales": ["HubSpot", "Salesforce", "Pipedrive", "Attio", "Close", "Copper"],
  "Commerce": ["Shopify", "Stripe", "WooCommerce", "Recharge", "Paddle", "Lemon Squeezy"],
  "Email & Messaging": ["Mailchimp", "Klaviyo", "Postmark", "Twilio", "SendGrid", "Intercom"],
  "Analytics & Data": ["GA4", "Mixpanel", "PostHog", "Amplitude", "Segment", "BigQuery"],
  "Productivity": ["Slack", "Notion", "Linear", "Zapier", "Make", "Webflow"],
};

function IntegrationsPage() {
  return (
    <PageShell eyebrow="Integrations" title="200+ integrations. One source of truth." lede="Connect your stack in minutes. Two-way sync, field mapping and consent-aware data routing — no warehouse required.">
      <div className="space-y-12">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/50">{group}</div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3 md:grid-cols-6">
              {items.map((i) => (
                <div key={i} className="flex h-24 items-center justify-center bg-white text-sm font-medium text-ink/70">{i}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
