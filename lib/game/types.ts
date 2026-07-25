export const BLOCK_KEYS = [
  "selfStudying",
  "assignment",
  "networking",
  "restWellbeing",
  "workExperience",
  "careerPrep",
  "leadership",
] as const;

export type BlockKey = (typeof BLOCK_KEYS)[number];

export type Allocation = Record<BlockKey, number>;

export const PROFILE_IDS = [
  "zenMaster",
  "rechargeChampion",
  "careerClimber",
  "networkingNinja",
  "opportunityHunter",
  "miniCeo",
  "sideHustleHero",
  "busyBeeProfessional",
  "academicStrategist",
  "deadlineWarrior",
  "rmitScholar",
  "timeManagementArchitect",
  "campusConnector",
  "communityBuilder",
  "balancedBattery",
  "strategicJuggler",
  "rmitAllRounder",
] as const;

export type ProfileId = (typeof PROFILE_IDS)[number];

export interface ProfileMetrics {
  performance: number;
  stress: number;
  wellbeing: number;
  missedOpps: number;
}

export interface Profile {
  id: ProfileId;
  name: string;
  metrics: ProfileMetrics;
  meaning: string;
  keyInsight: string;
  advice: string;
}

export const ROLE_IDS = [
  "intern",
  "partTimeWorker",
  "studentLeader",
  "freeAgent",
  "carer",
] as const;

export type RoleId = (typeof ROLE_IDS)[number];

export interface RoleDefinition {
  id: RoleId;
  name: string;
  context: string;
  challenge: string;
  fixedBlock: BlockKey | null;
  fixedPercent: number;
}
