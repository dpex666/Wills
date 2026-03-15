import type { FormState } from "./types";

function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatRelationships(state: FormState): string {
  if (state.relationships.length === 0) return "Not specified";
  return state.relationships.map((r) => `${r.verb} ${r.name}`).join("; ");
}

function buildBaseContext(state: FormState): string {
  const rawLines: (string | null)[] = [
    `Full name: ${state.fullName}`,
    state.preferredName ? `Preferred name/nickname: ${state.preferredName}` : null,
    state.age ? `Age at passing: ${state.age}` : null,
    state.dateOfPassing ? `Date of passing: ${formatDate(state.dateOfPassing)}` : null,
    state.placeOfPassing ? `Place of passing: ${state.placeOfPassing}` : null,
    `Family relationships: ${formatRelationships(state)}`,
    state.occupation ? `Occupation/career: ${state.occupation}` : null,
    state.faith ? `Faith/religion: ${state.faith}` : null,
    state.militaryService ? `Military service: ${state.militaryService}` : null,
    state.passions ? `Passions/interests: ${state.passions}` : null,
    `Tone requested: ${state.toneStyle}`,
  ];
  const lines = rawLines.filter((x): x is string => x !== null).join("\n");

  let serviceSection = "No service details.";
  if (state.hasService) {
    const parts: string[] = [];
    if (state.serviceType) parts.push(`Type: ${state.serviceType}`);
    if (state.serviceDate) parts.push(`Date: ${formatDate(state.serviceDate)}`);
    if (state.serviceTime) parts.push(`Time: ${state.serviceTime}`);
    if (state.venueName) parts.push(`Venue: ${state.venueName}`);
    if (state.venueAddress) parts.push(`Address: ${state.venueAddress}`);
    if (state.specialInstructions) parts.push(`Special instructions: ${state.specialInstructions}`);
    serviceSection = parts.join("\n");
  }

  return `${lines}\n\nService details:\n${serviceSection}`;
}

export function buildNewspaperPrompt(state: FormState): string {
  return `You are writing a death notice for an Australian newspaper. Write a short, dignified notice.

Rules:
- Plain text only, no markdown, no asterisks, no bullet points
- Maximum 12 lines (newspapers charge per line — keep it concise)
- Each line should be no longer than 40-45 characters
- Use Australian date format (12 March 2026)
- Tone must be: ${state.toneStyle}
- Write ONLY the notice text — no preamble, no "Here is the notice:", no explanation

Tone guide:
- traditional: formal, dignified, broadsheet style
- warm: conversational, emphasises love and connection
- religious: includes faith language, references to God's care
- celebration: upbeat, forward-looking, honours a life well lived

Person details:
${buildBaseContext(state)}

Write the death notice now:`;
}

export function buildSocialPrompt(state: FormState): string {
  return `You are writing a death announcement for social media (Facebook/Instagram). Write a warm, shareable post.

Rules:
- Plain text only, no markdown, no asterisks
- 150-250 words
- Use paragraph breaks (blank lines between paragraphs)
- Include occupation, passions, and faith details if provided — they personalise the post
- Tone must be: ${state.toneStyle}
- Write ONLY the post text — no preamble, no explanation

Tone guide:
- traditional: formal, dignified
- warm: conversational, emphasises love and connection
- religious: includes faith language, references to God's care
- celebration: upbeat, forward-looking, honours a life well lived

Person details:
${buildBaseContext(state)}

Write the social media post now:`;
}

export function buildEmailPrompt(state: FormState): string {
  return `You are writing a death announcement email to be sent to friends and family of the deceased.

Rules:
- Plain text only, no markdown, no asterisks
- 350-500 words
- Start with: Subject: The Passing of ${state.fullName}
- Then a blank line, then "Dear friends and family,"
- Use proper paragraph structure with blank lines between paragraphs
- Include all details provided — occupation, passions, faith, military service
- End with a tone-appropriate closing and "The family of ${state.fullName}"
- Tone must be: ${state.toneStyle}
- Write ONLY the email text — no preamble, no explanation

Tone guide:
- traditional: formal, dignified, respectful
- warm: heartfelt, conversational, emphasises love
- religious: includes faith language and prayers
- celebration: grateful, forward-looking, celebratory

Person details:
${buildBaseContext(state)}

Write the email announcement now:`;
}
