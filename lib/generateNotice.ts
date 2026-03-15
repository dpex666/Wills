import type { FormState, RelationshipEntry, ToneStyle } from "./types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function inferPronoun(relationships: RelationshipEntry[]): "he" | "she" | "they" {
  const malVerbs = [
    "beloved husband of",
    "loving father of",
    "dear son of",
    "cherished brother of",
    "adored grandfather of",
    "loving uncle of",
  ];
  const femVerbs = [
    "beloved wife of",
    "loving mother of",
    "dear daughter of",
    "cherished sister of",
    "adored grandmother of",
    "loving aunt of",
  ];
  const first = relationships[0]?.verb ?? "";
  if (malVerbs.includes(first)) return "he";
  if (femVerbs.includes(first)) return "she";
  return "they";
}

function inferPossessive(pronoun: "he" | "she" | "they"): string {
  return pronoun === "he" ? "his" : pronoun === "she" ? "her" : "their";
}

function inferReflexive(pronoun: "he" | "she" | "they"): string {
  return pronoun === "he" ? "himself" : pronoun === "she" ? "herself" : "themselves";
}

function formatRelationships(relationships: RelationshipEntry[]): string {
  if (relationships.length === 0) return "";
  const parts = relationships.map((r) => `${r.verb} ${r.name}`);
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]}, and ${parts[1]}`;
  const last = parts.pop();
  return `${parts.join(", ")}, and ${last}`;
}

function getPassingVerb(tone: ToneStyle): string {
  const verbs: Record<ToneStyle, string> = {
    traditional: "passed away",
    warm: "passed away peacefully",
    religious: "entered God's loving care",
    celebration: "completed a remarkable journey",
  };
  return verbs[tone];
}

function getClosingSentiment(tone: ToneStyle, pronoun: "he" | "she" | "they"): string {
  const poss = inferPossessive(pronoun);
  const sentiments: Record<ToneStyle, string> = {
    traditional: `Deeply missed by all who knew ${pronoun === "they" ? "them" : pronoun}.`,
    warm: `Forever in our hearts, never forgotten.`,
    religious: `May ${pronoun} rest in the peace of God's loving care.`,
    celebration: `A life beautifully lived. Celebrate well.`,
  };
  void poss;
  return sentiments[tone];
}

function getToneOpening(tone: ToneStyle): string {
  const openings: Record<ToneStyle, string> = {
    traditional: "great sadness",
    warm: "heavy but grateful hearts",
    religious: "deep sorrow and faith",
    celebration: "love and celebration",
  };
  return openings[tone];
}

/** Newspaper line counter — standard ~40 chars per column width */
export function countNewsLines(text: string): number {
  return text.split("\n").reduce((acc, line) => {
    if (line.trim() === "") return acc + 0.5;
    return acc + Math.max(1, Math.ceil(line.length / 40));
  }, 0);
}

function buildServiceBlock(state: FormState, style: "short" | "full" = "full"): string {
  if (!state.hasService) return "";

  const type = state.serviceType
    ? state.serviceType.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Service";

  if (style === "short") {
    const parts: string[] = [`${type} to be held`];
    if (state.serviceDate) parts.push(`on ${formatDate(state.serviceDate)}`);
    if (state.serviceTime) parts.push(`at ${state.serviceTime}`);
    if (state.venueName) parts.push(`at ${state.venueName}`);
    if (state.venueAddress) parts.push(state.venueAddress);
    let block = parts.join(" ") + ".";
    if (state.specialInstructions) block += `\n${state.specialInstructions}`;
    return block;
  }

  // Full style
  const lines: string[] = [];
  const dateParts: string[] = [];
  if (state.serviceDate) dateParts.push(formatDate(state.serviceDate));
  if (state.serviceTime) dateParts.push(`at ${state.serviceTime}`);

  lines.push(`A ${type.toLowerCase()} will be held`);
  if (dateParts.length) lines.push(dateParts.join(" "));
  if (state.venueName) lines.push(`at ${state.venueName}`);
  if (state.venueAddress) lines.push(state.venueAddress);
  if (state.specialInstructions) lines.push(state.specialInstructions);

  return lines.join(", ") + ".";
}

// ─── Newspaper Notice ─────────────────────────────────────────────────────────

export function generateNewspaper(state: FormState): string {
  if (!state.fullName) return "";

  const lines: string[] = [];
  const pronoun = inferPronoun(state.relationships);

  // Name line
  let nameLine = state.fullName;
  if (state.preferredName) nameLine += ` (${state.preferredName})`;
  lines.push(nameLine);

  // Age + date + place
  const ageDateParts: string[] = [];
  if (state.age) ageDateParts.push(`Aged ${state.age}`);
  if (state.dateOfPassing) ageDateParts.push(formatDate(state.dateOfPassing));
  if (state.placeOfPassing) ageDateParts.push(state.placeOfPassing);
  if (ageDateParts.length) lines.push(ageDateParts.join(", ") + ".");
  lines.push("");

  // Relationships
  const relBlock = formatRelationships(state.relationships);
  if (relBlock) {
    lines.push(`${state.fullName.split(" ")[0]} was the ${relBlock}.`);
    lines.push("");
  }

  // Closing
  lines.push(getClosingSentiment(state.toneStyle, pronoun));

  // Service
  if (state.hasService) {
    lines.push("");
    lines.push(buildServiceBlock(state, "short"));
  }

  return lines.join("\n");
}

// ─── Social Media Post ────────────────────────────────────────────────────────

export function generateSocial(state: FormState): string {
  if (!state.fullName) return "";

  const pronoun = inferPronoun(state.relationships);
  const poss = inferPossessive(pronoun);
  const firstName = state.fullName.split(" ")[0];
  const paragraphs: string[] = [];

  // Opening
  let opening = `It is with ${getToneOpening(state.toneStyle)} that we share the passing of ${state.fullName}`;
  if (state.preferredName) opening += ` (known as ${state.preferredName})`;
  if (state.age) opening += `, aged ${state.age}`;
  if (state.dateOfPassing) opening += `, on ${formatDate(state.dateOfPassing)}`;
  if (state.placeOfPassing) opening += ` in ${state.placeOfPassing}`;
  opening += ".";
  paragraphs.push(opening);

  // Life details (only used in social/email)
  const lifeParts: string[] = [];
  if (state.occupation) lifeParts.push(`${pronoun === "they" ? "They were" : pronoun === "he" ? "He was" : "She was"} a ${state.occupation}`);
  if (state.militaryService) lifeParts.push(`and served ${state.militaryService}`);
  if (state.passions) {
    const passionList = state.passions.split(",").map((p) => p.trim()).filter(Boolean);
    if (passionList.length > 0) {
      lifeParts.push(`with a deep love for ${passionList.join(", ")}`);
    }
  }
  if (lifeParts.length > 0) {
    paragraphs.push(`${lifeParts.join(", ")}.`);
  }

  // Relationships
  const relBlock = formatRelationships(state.relationships);
  if (relBlock) {
    const pronounCap = pronoun === "they" ? "They are" : pronoun === "he" ? "He is" : "She is";
    paragraphs.push(`${pronounCap} survived by ${poss} ${relBlock}.`);
  }

  // Faith
  if (state.faith) {
    paragraphs.push(`${firstName}'s ${state.faith} faith was a cornerstone of ${poss} life.`);
  }

  // Closing
  paragraphs.push(getClosingSentiment(state.toneStyle, pronoun));

  // Service
  if (state.hasService) {
    paragraphs.push(buildServiceBlock(state, "full"));
  }

  return paragraphs.join("\n\n");
}

// ─── Email Announcement ───────────────────────────────────────────────────────

export function generateEmail(state: FormState): string {
  if (!state.fullName) return "";

  const pronoun = inferPronoun(state.relationships);
  const poss = inferPossessive(pronoun);
  const pronounCap = pronoun === "they" ? "They" : pronoun === "he" ? "He" : "She";
  const passingVerb = getPassingVerb(state.toneStyle);
  const sections: string[] = [];

  // Subject
  sections.push(`Subject: The Passing of ${state.fullName}`);
  sections.push("");

  // Salutation
  sections.push("Dear friends and family,");
  sections.push("");

  // Intro paragraph
  let intro = `We write to share the sad news of the passing of ${state.fullName}`;
  if (state.preferredName) intro += ` (known to many as ${state.preferredName})`;
  intro += `, who ${passingVerb}`;
  if (state.age) intro += `, aged ${state.age}`;
  if (state.dateOfPassing) intro += `, on ${formatDate(state.dateOfPassing)}`;
  if (state.placeOfPassing) intro += ` in ${state.placeOfPassing}`;
  intro += ".";
  sections.push(intro);

  // Life paragraph
  const lifeSentences: string[] = [];
  if (state.occupation) {
    lifeSentences.push(`${pronounCap} devoted ${poss} career to ${poss} work as a ${state.occupation}.`);
  }
  if (state.militaryService) {
    lifeSentences.push(`${pronounCap} served with distinction — ${state.militaryService}.`);
  }
  if (state.passions) {
    const passionList = state.passions.split(",").map((p) => p.trim()).filter(Boolean);
    if (passionList.length > 0) {
      lifeSentences.push(`${pronounCap} had a lifelong passion for ${passionList.join(", ")}.`);
    }
  }
  if (state.faith) {
    lifeSentences.push(`${poss.charAt(0).toUpperCase() + poss.slice(1)} ${state.faith} faith was a guiding light throughout ${poss} life.`);
  }
  if (lifeSentences.length > 0) {
    sections.push("");
    sections.push(lifeSentences.join(" "));
  }

  // Family paragraph
  const relBlock = formatRelationships(state.relationships);
  if (relBlock) {
    sections.push("");
    const pronSurv = pronoun === "they" ? "They are" : pronoun === "he" ? "He is" : "She is";
    sections.push(`${pronSurv} deeply loved and survived by ${poss} ${relBlock}. ${poss.charAt(0).toUpperCase() + poss.slice(1)} presence will leave an irreplaceable void in all our lives.`);
  }

  // Service paragraph
  if (state.hasService) {
    sections.push("");
    const type = state.serviceType
      ? state.serviceType.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Service";
    const serviceLines: string[] = [`A ${type.toLowerCase()} will be held`];
    if (state.serviceDate) serviceLines.push(`on ${formatDate(state.serviceDate)}`);
    if (state.serviceTime) serviceLines.push(`at ${state.serviceTime}`);
    if (state.venueName) serviceLines.push(`at ${state.venueName}, ${state.venueAddress || ""}`);
    let servicePara = serviceLines.filter(Boolean).join(" ") + ".";
    if (state.specialInstructions) {
      servicePara += ` ${state.specialInstructions}`;
    }
    sections.push(servicePara.trim());
  }

  // Closing
  sections.push("");
  const closings: Record<ToneStyle, string> = {
    traditional:
      `We ask that you keep the family in your thoughts during this difficult time.\n\nWith sympathy,`,
    warm:
      `We are grateful for every memory shared and every kindness shown.\n\nWith love,`,
    religious:
      `We ask for your prayers and kindness as the family walks this difficult path.\n\nWith faith and sympathy,`,
    celebration:
      `We invite you to hold ${state.fullName.split(" ")[0]} in your heart with joy and gratitude.\n\nWith love and celebration,`,
  };
  sections.push(closings[state.toneStyle]);
  sections.push(`The family of ${state.fullName}`);

  return sections.join("\n");
}

// ─── Combined export ──────────────────────────────────────────────────────────

export function generateAllNotices(state: FormState) {
  return {
    newspaper: generateNewspaper(state),
    social: generateSocial(state),
    email: generateEmail(state),
  };
}
