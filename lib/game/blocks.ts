import { BlockKey } from "./types";

export interface BlockDefinition {
  key: BlockKey;
  label: string;
  icon: string;
  description: string;
  careerRelevance: "Moderate" | "Foundational" | "High" | "Very high";
  careerRelevanceNote: string;
  /** Tailwind background/text classes for the allocation card, matching the design reference. */
  cardBg: string;
  cardText: string;
}

export const BLOCKS: Record<BlockKey, BlockDefinition> = {
  selfStudying: {
    key: "selfStudying",
    label: "Self-studying",
    icon: "📖",
    description:
      "Reviewing lecture content, reading, and consolidating knowledge in your own time.",
    careerRelevance: "Moderate",
    careerRelevanceNote:
      "Academic knowledge supports career readiness but is not sufficient alone.",
    cardBg: "bg-brand-gold",
    cardText: "text-brand-navy",
  },
  assignment: {
    key: "assignment",
    label: "Assignment",
    icon: "📝",
    description:
      "Completing assessments, group projects, and submissions with deadlines.",
    careerRelevance: "Moderate",
    careerRelevanceNote:
      "Deadline-driven work matters, but rarely translates into career capital on its own.",
    cardBg: "bg-brand-pink",
    cardText: "text-brand-navy",
  },
  networking: {
    key: "networking",
    label: "Networking",
    icon: "🤝",
    description:
      "Industry events, career fairs, alumni talks, LinkedIn, and student associations.",
    careerRelevance: "Very high",
    careerRelevanceNote:
      "Genuine relationships create opportunities that job boards never will.",
    cardBg: "bg-brand-cyan",
    cardText: "text-brand-navy",
  },
  restWellbeing: {
    key: "restWellbeing",
    label: "Rest & Wellbeing",
    icon: "🌿",
    description: "Sleep, exercise, social connection, hobbies, mental health.",
    careerRelevance: "Foundational",
    careerRelevanceNote:
      "Everything else you do runs on the recovery you protect here.",
    cardBg: "bg-white",
    cardText: "text-brand-navy",
  },
  workExperience: {
    key: "workExperience",
    label: "Work Experience",
    icon: "💼",
    description:
      "Part-time work, internships, volunteer roles, and unpaid placements.",
    careerRelevance: "High",
    careerRelevanceNote:
      "Real-world experience becomes career capital when you reflect on it.",
    cardBg: "bg-brand-red",
    cardText: "text-white",
  },
  careerPrep: {
    key: "careerPrep",
    label: "Career Preparation",
    icon: "🎯",
    description:
      "CV writing, LinkedIn, interview prep, career workshops, and applications.",
    careerRelevance: "Very high",
    careerRelevanceNote:
      "Small, consistent career actions compound over time.",
    cardBg: "bg-brand-navy",
    cardText: "text-white",
  },
  leadership: {
    key: "leadership",
    label: "Leadership",
    icon: "🌟",
    description:
      "Student clubs, peer mentoring, leadership programs, and community activities.",
    careerRelevance: "High",
    careerRelevanceNote:
      "Community-building is a highly transferable professional skill.",
    cardBg: "bg-brand-blue",
    cardText: "text-white",
  },
};

export const BLOCK_ORDER: BlockKey[] = [
  "selfStudying",
  "assignment",
  "networking",
  "restWellbeing",
  "workExperience",
  "careerPrep",
  "leadership",
];

export const EMPTY_ALLOCATION: Record<BlockKey, number> = {
  selfStudying: 0,
  assignment: 0,
  networking: 0,
  restWellbeing: 0,
  workExperience: 0,
  careerPrep: 0,
  leadership: 0,
};
