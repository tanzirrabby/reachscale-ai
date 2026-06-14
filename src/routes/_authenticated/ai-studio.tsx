import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, Send, Megaphone, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { DashboardShell } from "./dashboard";
import { generateAdCopy, analyzeCampaign } from "@/lib/ai.functions";

const searchSchema = z.object({ tab: z.enum(["chat", "copy", "analyze"]).catch("chat") });

export const Route = createFileRoute("/_authenticated/ai-studio")({
  head: () => ({ meta: [{ title: "AI Studio — Lume OS" }] }),
  validateSearch: searchSchema,
  component: AIStudio,
});

const tabs = [
  { id: "chat" as const, label: "Campaign Copilot", icon: Sparkles },
  { id: "copy" as const, label: "Ad Copy Generator", icon: Megaphone },
  { id: "analyze" as const, label: "Campaign Analyzer", icon: BarChart3 },
];

function AIStudio() {
  const search = useSearch({ from: "/_authenticated/ai-studio" });
  const navigate = Route.useNavigate();
  const tab = search.tab;

  return (
    <DashboardShell title="AI Studio" eyebrow="AI-powered marketing">
      <div className="mb-6 inline-flex rounded-lg border border-zinc-200 bg-white p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => navigate({ search: { tab: t.id } })}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${tab === t.id ? "bg-ink text-canvas" : "text-ink/60 hover:bg-zinc-50"}`}
          >
            <t.icon className="size-4" /> {t.label}
          </button>
        ))}
      </div>
      {tab === "chat" && <ChatPanel />}
      {tab === "copy" && <AdCopyPanel />}
      {tab === "analyze" && <AnalyzerPanel />}
    </DashboardShell>
  );
}

function ChatPanel() {
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => toast.error(e.message || "Chat failed"),
  });
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="flex h-[70vh] flex-col rounded-xl border border-zinc-200 bg-white">
        <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <Sparkles className="mx-auto size-6 text-brand" />
                <div className="mt-3 text-lg font-semibold">Campaign Copilot</div>
                <div className="mt-1 max-w-sm text-sm text-ink/60">Ask anything about planning, paid social, email, SEO, CRM, automation or campaign optimization.</div>
              </div>
            </div>
          )}
          {messages.map((m) => {
            const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
            return (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-ink text-canvas" : "bg-zinc-50 text-ink"}`}>
                  {text || (m.role === "assistant" && isLoading ? "…" : "")}
                </div>
              </div>
            );
          })}
          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-ink/60"><Loader2 className="inline size-3 animate-spin" /> Thinking…</div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-zinc-100 p-4">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
            rows={2}
            placeholder="Ask about your next campaign…"
            className="flex-1 resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-brand/20 focus:ring-2"
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50">
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            Send
          </button>
        </form>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
          <div className="text-xs font-semibold uppercase tracking-widest text-ink/40">Try asking</div>
          <ul className="mt-3 space-y-2 text-ink/70">
            <li>· Draft a 6-week launch plan for a DTC skincare brand.</li>
            <li>· Suggest 5 audience segments for a SaaS free trial.</li>
            <li>· Write 3 cold email subject lines for SMB founders.</li>
            <li>· What KPIs should I track for a TikTok campaign?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AdCopyPanel() {
  const run = useServerFn(generateAdCopy);
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Confident, friendly");
  const [channel, setChannel] = useState("Meta (Instagram + Facebook)");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ headlines: string[]; descriptions: string[]; ctas: string[]; hashtags: string[] } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await run({ data: { product, audience, tone, channel } });
      setResult(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
        <Field label="Product or offer">
          <textarea required value={product} onChange={(e) => setProduct(e.target.value)} rows={2} placeholder="A subscription meal-kit for busy parents…" className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-brand/20 focus:ring-2" />
        </Field>
        <Field label="Target audience">
          <input required value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Working parents, 30–45, US urban" className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-brand/20 focus:ring-2" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tone">
            <input value={tone} onChange={(e) => setTone(e.target.value)} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-brand/20 focus:ring-2" />
          </Field>
          <Field label="Channel">
            <input value={channel} onChange={(e) => setChannel(e.target.value)} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-brand/20 focus:ring-2" />
          </Field>
        </div>
        <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-medium text-white disabled:opacity-50">
          {loading ? <><Loader2 className="size-4 animate-spin" /> Generating…</> : <><Sparkles className="size-4" /> Generate ad copy</>}
        </button>
      </form>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        {!result && !loading && <div className="grid h-full place-items-center text-center text-sm text-ink/40">Fill in the form to generate ad copy.</div>}
        {loading && <div className="grid h-full place-items-center text-sm text-ink/60"><Loader2 className="size-5 animate-spin" /></div>}
        {result && (
          <div className="space-y-5 text-sm">
            <Group title="Headlines" items={result.headlines} />
            <Group title="Descriptions" items={result.descriptions} />
            <Group title="CTAs" items={result.ctas} />
            <Group title="Hashtags" items={result.hashtags} inline />
          </div>
        )}
      </div>
    </div>
  );
}

function AnalyzerPanel() {
  const run = useServerFn(analyzeCampaign);
  const [data, setData] = useState("");
  const [goal, setGoal] = useState("Maximize ROAS while keeping CPA below $40");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOut(null);
    try {
      const res = await run({ data: { data, goal } });
      setOut(res.markdown);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
        <Field label="Goal">
          <input value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-brand/20 focus:ring-2" />
        </Field>
        <Field label="Campaign data (paste CSV, metrics, or notes)">
          <textarea required value={data} onChange={(e) => setData(e.target.value)} rows={14} placeholder={`Channel, Spend, Impr, Clicks, Conv, Rev\nMeta, $4,200, 410k, 8.2k, 312, $18,600\nGoogle, $3,100, 220k, 5.1k, 280, $15,300\n…`} className="w-full rounded-lg border border-zinc-200 px-3 py-2 font-mono text-xs outline-none ring-brand/20 focus:ring-2" />
        </Field>
        <button type="submit" disabled={loading || data.length < 10} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-medium text-white disabled:opacity-50">
          {loading ? <><Loader2 className="size-4 animate-spin" /> Analyzing…</> : <><BarChart3 className="size-4" /> Analyze campaign</>}
        </button>
      </form>
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        {!out && !loading && <div className="grid h-full place-items-center text-center text-sm text-ink/40">Paste campaign data to get AI insights.</div>}
        {loading && <div className="grid h-full place-items-center text-sm text-ink/60"><Loader2 className="size-5 animate-spin" /></div>}
        {out && <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-ink/80">{out}</div>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink/60">{label}</label>
      {children}
    </div>
  );
}

function Group({ title, items, inline }: { title: string; items: string[]; inline?: boolean }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink/40">{title}</div>
      {inline ? (
        <div className="flex flex-wrap gap-2">{items.map((i, idx) => <span key={idx} className="rounded-full bg-zinc-100 px-3 py-1 text-xs">{i}</span>)}</div>
      ) : (
        <ul className="space-y-1.5">{items.map((i, idx) => <li key={idx} className="rounded-lg bg-zinc-50 px-3 py-2">{i}</li>)}</ul>
      )}
    </div>
  );
}
