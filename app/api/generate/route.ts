import Anthropic from "@anthropic-ai/sdk";
import { buildNewspaperPrompt, buildSocialPrompt, buildEmailPrompt } from "@/lib/buildPrompt";
import { generateAllNotices } from "@/lib/generateNotice";
import type { FormState } from "@/lib/types";

export async function POST(req: Request) {
  let state: FormState;
  try {
    state = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // If no API key, fall back to template generation
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(generateAllNotices(state));
  }

  try {
    const client = new Anthropic();

    const [newspaper, social, email] = await Promise.all([
      client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        messages: [{ role: "user", content: buildNewspaperPrompt(state) }],
      }),
      client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        messages: [{ role: "user", content: buildSocialPrompt(state) }],
      }),
      client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 900,
        messages: [{ role: "user", content: buildEmailPrompt(state) }],
      }),
    ]);

    const extractText = (msg: Anthropic.Message): string => {
      const block = msg.content[0];
      return block.type === "text" ? block.text.trim() : "";
    };

    return Response.json({
      newspaper: extractText(newspaper),
      social: extractText(social),
      email: extractText(email),
    });
  } catch (err) {
    // Graceful fallback to templates on API error
    console.error("Claude API error:", err);
    return Response.json(generateAllNotices(state));
  }
}
