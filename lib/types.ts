export type RelationshipVerb =
  | "beloved husband of"
  | "beloved wife of"
  | "loving father of"
  | "loving mother of"
  | "dear son of"
  | "dear daughter of"
  | "devoted partner of"
  | "cherished brother of"
  | "cherished sister of"
  | "adored grandfather of"
  | "adored grandmother of"
  | "dear friend of"
  | "loving uncle of"
  | "loving aunt of";

export const RELATIONSHIP_VERBS: RelationshipVerb[] = [
  "beloved husband of",
  "beloved wife of",
  "loving father of",
  "loving mother of",
  "dear son of",
  "dear daughter of",
  "devoted partner of",
  "cherished brother of",
  "cherished sister of",
  "adored grandfather of",
  "adored grandmother of",
  "dear friend of",
  "loving uncle of",
  "loving aunt of",
];

export interface RelationshipEntry {
  id: string;
  verb: RelationshipVerb;
  name: string;
}

export type ToneStyle = "traditional" | "warm" | "religious" | "celebration";

export const TONE_OPTIONS: {
  value: ToneStyle;
  label: string;
  description: string;
  preview: string;
}[] = [
  {
    value: "traditional",
    label: "Traditional",
    description: "Formal, dignified language as seen in broadsheet newspapers.",
    preview: "Deeply missed by all who knew him.",
  },
  {
    value: "warm",
    label: "Warm & Personal",
    description: "Conversational, emphasises love and connection.",
    preview: "Forever in our hearts, never forgotten.",
  },
  {
    value: "religious",
    label: "Religious",
    description: "Includes faith language and references to God's care.",
    preview: "May he rest in the peace of God's loving care.",
  },
  {
    value: "celebration",
    label: "Celebration of Life",
    description: "Upbeat, forward-looking, honours a life well lived.",
    preview: "A life beautifully lived — celebrate well.",
  },
];

export type ServiceType =
  | "funeral"
  | "memorial"
  | "graveside"
  | "celebration-of-life"
  | "private";

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  funeral: "Funeral Service",
  memorial: "Memorial Service",
  graveside: "Graveside Service",
  "celebration-of-life": "Celebration of Life",
  private: "Private Service",
};

export type OutputFormat = "newspaper" | "social" | "email";

export interface FormState {
  // Step 1 — The Person
  fullName: string;
  preferredName: string;
  age: string;
  dateOfPassing: string;
  placeOfPassing: string;

  // Step 2 — Family & Relationships
  relationships: RelationshipEntry[];

  // Step 3 — Their Life (optional enrichment)
  occupation: string;
  faith: string;
  militaryService: string;
  passions: string;

  // Step 4 — Tone & Style
  toneStyle: ToneStyle;

  // Step 5 — Funeral Details
  hasService: boolean;
  serviceType: ServiceType | "";
  serviceDate: string;
  serviceTime: string;
  venueName: string;
  venueAddress: string;
  specialInstructions: string;
}

export const INITIAL_FORM_STATE: FormState = {
  fullName: "",
  preferredName: "",
  age: "",
  dateOfPassing: "",
  placeOfPassing: "",
  relationships: [],
  occupation: "",
  faith: "",
  militaryService: "",
  passions: "",
  toneStyle: "traditional",
  hasService: false,
  serviceType: "",
  serviceDate: "",
  serviceTime: "",
  venueName: "",
  venueAddress: "",
  specialInstructions: "",
};

export interface GeneratedNotices {
  newspaper: string;
  social: string;
  email: string;
}

export interface LeadData {
  yourName: string;
  yourEmail: string;
  wantsContact: boolean;
  deceasedName: string;
  submittedAt: string;
}
