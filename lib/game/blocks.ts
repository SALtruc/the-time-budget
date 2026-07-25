import { BlockKey } from "./types";

export interface BlockDefinition {
  key: BlockKey;
  label: string;
  icon: string;
  description: string;
  careerRelevance: "Moderate" | "Foundational" | "High" | "Very high";
  careerRelevanceNote: string;
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
  },
  restWellbeing: {
    key: "restWellbeing",
    label: "Rest & Wellbeing",
    icon: "🌿",
    description: "Sleep, exercise, social connection, hobbies, mental health.",
    careerRelevance: "Foundational",
    careerRelevanceNote:
      "Everything else you do runs on the recovery you protect here.",
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
