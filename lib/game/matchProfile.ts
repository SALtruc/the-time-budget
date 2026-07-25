import { BLOCK_KEYS } from "./types";
import type { Allocation, Profile, ProfileId } from "./types";
import { getProfile } from "./profiles";

function maxValue(a: Allocation): number {
  return Math.max(...BLOCK_KEYS.map((key) => a[key]));
}

/** True when `key`'s value equals the highest value across all blocks (ties count as highest). */
function isHighest(a: Allocation, key: keyof Allocation): boolean {
  return a[key] === maxValue(a);
}

function allBlocksUsed(a: Allocation): boolean {
  return BLOCK_KEYS.every((key) => a[key] > 0);
}

function noBlockAbove(a: Allocation, threshold: number): boolean {
  return BLOCK_KEYS.every((key) => a[key] <= threshold);
}

function countBlocksAbove(a: Allocation, threshold: number): number {
  return BLOCK_KEYS.filter((key) => a[key] > threshold).length;
}

/**
 * Implements the 17 priority-ordered matching rules from the game spec
 * (checked top to bottom, first match wins). `allocation` values are
 * percentages that should sum to 100.
 */
export function matchProfileId(allocation: Allocation): ProfileId {
  const {
    selfStudying,
    assignment,
    networking,
    restWellbeing,
    workExperience,
    careerPrep,
    leadership,
  } = allocation;

  // 1. Zen Master
  if (isHighest(allocation, "restWellbeing") && restWellbeing >= 25) {
    return "zenMaster";
  }

  // 2. Recharge Champion
  if (restWellbeing >= 20 && !isHighest(allocation, "restWellbeing")) {
    return "rechargeChampion";
  }

  // 3. Career Climber
  if (isHighest(allocation, "careerPrep") && careerPrep >= 22) {
    return "careerClimber";
  }

  // 4. Networking Ninja
  if (isHighest(allocation, "networking") && networking >= 20) {
    return "networkingNinja";
  }

  // 5. Opportunity Hunter
  if (careerPrep >= 12 && networking >= 12 && workExperience >= 12) {
    return "opportunityHunter";
  }

  // 6. Mini CEO
  if (
    workExperience + careerPrep >= 35 &&
    workExperience >= 15 &&
    careerPrep >= 15
  ) {
    return "miniCeo";
  }

  // 7. Side Hustle Hero
  if (isHighest(allocation, "workExperience") && workExperience >= 25) {
    return "sideHustleHero";
  }

  // 8. Busy Bee Professional
  if (workExperience >= 18 && selfStudying >= 18 && restWellbeing <= 8) {
    return "busyBeeProfessional";
  }

  // 9. Academic Strategist
  if (
    selfStudying + assignment >= 45 &&
    selfStudying >= 18 &&
    assignment >= 18
  ) {
    return "academicStrategist";
  }

  // 10. Deadline Warrior
  if (isHighest(allocation, "assignment") && assignment >= 25) {
    return "deadlineWarrior";
  }

  // 11. RMIT Scholar
  if (isHighest(allocation, "selfStudying") && selfStudying >= 25) {
    return "rmitScholar";
  }

  // 12. Time Management Architect
  if (allBlocksUsed(allocation) && noBlockAbove(allocation, 20)) {
    return "timeManagementArchitect";
  }

  // 13. Campus Connector
  if (networking + leadership >= 30 && networking >= 12 && leadership >= 12) {
    return "campusConnector";
  }

  // 14. Community Builder
  if (networking >= 10 && leadership >= 10 && careerPrep >= 10) {
    return "communityBuilder";
  }

  // 15. Balanced Battery
  if (
    restWellbeing >= 15 &&
    selfStudying >= 15 &&
    careerPrep >= 10 &&
    noBlockAbove(allocation, 25)
  ) {
    return "balancedBattery";
  }

  // 16. Strategic Juggler
  if (countBlocksAbove(allocation, 10) >= 5 && countBlocksAbove(allocation, 25) >= 1) {
    return "strategicJuggler";
  }

  // 17. RMIT All-Rounder (default fallback)
  return "rmitAllRounder";
}

export function matchProfile(allocation: Allocation): Profile {
  return getProfile(matchProfileId(allocation));
}
