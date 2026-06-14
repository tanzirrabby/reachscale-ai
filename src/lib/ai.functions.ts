import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-3-flash-preview";

function getGateway() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key);
}

const AdCopyInput = z.object({
  product: z.string().min(1).max(500),
  audience: z.string().min(1).max(500),
  tone: z.string().min(1).max(100),
  channel: z.string().min(1).max(100),
});

export const generateAdCopy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AdCopyInput.parse(input))
  .handler(async ({ data, context }) => {
    const gateway = getGateway();
    const prompt = `You are a senior performance marketer. Create ad copy for the following.

Product/Offer: ${data.product}
Target audience: ${data.audience}
Tone: ${data.tone}
Channel: ${data.channel}

Return strictly valid JSON (no markdown, no commentary) matching this schema:
{
  "headlines": string[5],
  "descriptions": string[3],
  "ctas": string[4],
  "hashtags": string[6]
}`;

    const { text } = await generateText({ model: gateway(MODEL), prompt });
    const cleaned = text.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("AI returned an unparseable response. Please try again.");
    }

    await context.supabase.from("ai_generations").insert({
      user_id: context.userId,
      kind: "ad_copy",
      input: data,
      output: parsed as object,
    });
    return parsed as {
      headlines: string[];
      descriptions: string[];
      ctas: string[];
      hashtags: string[];
    };
  });

const AnalyzerInput = z.object({
  data: z.string().min(10).max(8000),
  goal: z.string().min(1).max(500),
});

export const analyzeCampaign = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AnalyzerInput.parse(input))
  .handler(async ({ data, context }) => {
    const gateway = getGateway();
    const prompt = `You are a senior marketing analyst. Analyze this campaign data and produce concise, actionable insights.

GOAL: ${data.goal}

DATA:
${data.data}

Write the report in clean Markdown with these sections:
## Summary
## Key insights (3-5 bullets)
## Recommendations (3-5 concrete next steps)
## Risks & Watchouts`;

    const { text } = await generateText({ model: gateway(MODEL), prompt });

    await context.supabase.from("ai_generations").insert({
      user_id: context.userId,
      kind: "analysis",
      input: data,
      output: { markdown: text },
    });
    return { markdown: text };
  });
