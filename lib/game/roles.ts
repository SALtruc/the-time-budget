import type { RoleDefinition, RoleId } from "./types";

/**
 * Pre-allocated percentages are from the spec (PDF §7) and are unchanged.
 * Fixed role constraints are represented as percentages so they scale with
 * the 168-hour weekly budget.
 */
export const ROLES: Record<RoleId, RoleDefinition> = {
  intern: {
    id: "intern",
    name: "The Intern",
    context:
      "You are currently doing a full-time internship 5 days a week. This takes up a significant portion of your time. How do you manage everything else around this?",
    challenge:
      "High workload leaves you limited time for study, rest, and career prep simultaneously.",
    fixedBlock: "workExperience",
    fixedPercent: 25,
  },
  partTimeWorker: {
    id: "partTimeWorker",
    name: "The Part-time Worker",
    context:
      "You work part-time 3 days a week to support your living costs. This is non-negotiable. How do you balance it with university and your future career?",
    challenge:
      "Work is present but not dominant — the real test is whether you invest the remaining time strategically or fill it with low-return activities.",
    fixedBlock: "workExperience",
    fixedPercent: 15,
  },
  studentLeader: {
    id: "studentLeader",
    name: "The Student Leader",
    context:
      "You hold a leadership position in a student club or society. Meetings, events, and team responsibilities take up a regular chunk of your week. How do you lead and still look after your own development?",
    challenge:
      "Networking is already high — you must decide whether to keep building community or redirect time toward career preparation and academic performance.",
    fixedBlock: "leadership",
    fixedPercent: 20,
  },
  freeAgent: {
    id: "freeAgent",
    name: "The Free Agent",
    context:
      "You have no fixed commitments outside of university. No job, no leadership role, no caring responsibilities. You have more discretionary time than most students. What do you do with it?",
    challenge:
      "Total freedom is harder than it looks. Without constraints, students often default to study and rest while neglecting career preparation and networking.",
    fixedBlock: null,
    fixedPercent: 0,
  },
  carer: {
    id: "carer",
    name: "The Carer",
    context:
      "You have family caring responsibilities — a younger sibling, an elderly parent, or a family member who needs regular support. This is not optional. How do you build your career while managing a commitment most people around you don't have?",
    challenge:
      "Hardest role — fewer total hours AND a fixed block. Builds empathy in group discussion for students with hidden responsibilities.",
    fixedBlock: "restWellbeing",
    fixedPercent: 10,
  },
};

export function getRole(id: RoleId): RoleDefinition {
  return ROLES[id];
}

export const ROLE_ORDER: RoleId[] = [
  "intern",
  "partTimeWorker",
  "studentLeader",
  "freeAgent",
  "carer",
];
