import { describe, expect, it } from "vitest";
import { matchProfile, matchProfileId } from "./matchProfile";
import type { Allocation, ProfileId } from "./types";

/**
 * Each fixture is a hand-constructed allocation (summing to 100) designed to
 * satisfy exactly one priority rule from the spec while deliberately failing
 * every higher-priority rule that precedes it. See PDF §4 for the 17 rules.
 */
const FIXTURES: Array<{ id: ProfileId; allocation: Allocation }> = [
  {
    id: "zenMaster",
    allocation: {
      selfStudying: 10,
      assignment: 10,
      networking: 10,
      restWellbeing: 40,
      workExperience: 10,
      careerPrep: 10,
      leadership: 10,
    },
  },
  {
    id: "rechargeChampion",
    allocation: {
      selfStudying: 10,
      assignment: 10,
      networking: 10,
      restWellbeing: 20,
      workExperience: 10,
      careerPrep: 30,
      leadership: 10,
    },
  },
  {
    id: "careerClimber",
    allocation: {
      selfStudying: 15,
      assignment: 15,
      networking: 10,
      restWellbeing: 10,
      workExperience: 10,
      careerPrep: 30,
      leadership: 10,
    },
  },
  {
    id: "networkingNinja",
    allocation: {
      selfStudying: 15,
      assignment: 15,
      networking: 25,
      restWellbeing: 10,
      workExperience: 10,
      careerPrep: 15,
      leadership: 10,
    },
  },
  {
    id: "opportunityHunter",
    allocation: {
      selfStudying: 15,
      assignment: 15,
      networking: 15,
      restWellbeing: 10,
      workExperience: 15,
      careerPrep: 15,
      leadership: 15,
    },
  },
  {
    id: "miniCeo",
    allocation: {
      selfStudying: 15,
      assignment: 15,
      networking: 10,
      restWellbeing: 10,
      workExperience: 20,
      careerPrep: 20,
      leadership: 10,
    },
  },
  {
    id: "sideHustleHero",
    allocation: {
      selfStudying: 15,
      assignment: 15,
      networking: 10,
      restWellbeing: 10,
      workExperience: 30,
      careerPrep: 10,
      leadership: 10,
    },
  },
  {
    id: "busyBeeProfessional",
    allocation: {
      selfStudying: 18,
      assignment: 20,
      networking: 10,
      restWellbeing: 8,
      workExperience: 18,
      careerPrep: 10,
      leadership: 16,
    },
  },
  {
    id: "academicStrategist",
    allocation: {
      selfStudying: 25,
      assignment: 25,
      networking: 10,
      restWellbeing: 5,
      workExperience: 15,
      careerPrep: 10,
      leadership: 10,
    },
  },
  {
    id: "deadlineWarrior",
    allocation: {
      selfStudying: 10,
      assignment: 30,
      networking: 10,
      restWellbeing: 5,
      workExperience: 15,
      careerPrep: 10,
      leadership: 20,
    },
  },
  {
    id: "rmitScholar",
    allocation: {
      selfStudying: 30,
      assignment: 10,
      networking: 10,
      restWellbeing: 5,
      workExperience: 15,
      careerPrep: 10,
      leadership: 20,
    },
  },
  {
    id: "timeManagementArchitect",
    allocation: {
      selfStudying: 18,
      assignment: 18,
      networking: 14,
      restWellbeing: 14,
      workExperience: 11,
      careerPrep: 10,
      leadership: 15,
    },
  },
  {
    id: "campusConnector",
    allocation: {
      selfStudying: 22,
      assignment: 17,
      networking: 15,
      restWellbeing: 10,
      workExperience: 10,
      careerPrep: 10,
      leadership: 16,
    },
  },
  {
    id: "communityBuilder",
    allocation: {
      selfStudying: 22,
      assignment: 20,
      networking: 10,
      restWellbeing: 10,
      workExperience: 18,
      careerPrep: 10,
      leadership: 10,
    },
  },
  {
    id: "balancedBattery",
    allocation: {
      selfStudying: 18,
      assignment: 22,
      networking: 5,
      restWellbeing: 15,
      workExperience: 10,
      careerPrep: 10,
      leadership: 20,
    },
  },
  {
    id: "strategicJuggler",
    allocation: {
      selfStudying: 15,
      assignment: 15,
      networking: 11,
      restWellbeing: 11,
      workExperience: 14,
      careerPrep: 8,
      leadership: 26,
    },
  },
  {
    id: "rmitAllRounder",
    allocation: {
      selfStudying: 12,
      assignment: 21,
      networking: 10,
      restWellbeing: 18,
      workExperience: 18,
      careerPrep: 9,
      leadership: 12,
    },
  },
];

describe("matchProfileId", () => {
  it.each(FIXTURES)("matches $id", ({ id, allocation }) => {
    const total = Object.values(allocation).reduce((sum, v) => sum + v, 0);
    expect(total).toBe(100);
    expect(matchProfileId(allocation)).toBe(id);
  });

  it("resolves priority order: Recharge Champion (rule 2) beats Academic Strategist (rule 9) when both conditions hold", () => {
    // rest=22 (>=20, not highest) AND selfStudying+assignment=45 (both >=18):
    // satisfies rule 2 and rule 9 simultaneously — rule 2 must win.
    const allocation: Allocation = {
      selfStudying: 20,
      assignment: 25,
      networking: 8,
      restWellbeing: 22,
      workExperience: 8,
      careerPrep: 8,
      leadership: 9,
    };
    expect(matchProfileId(allocation)).toBe("rechargeChampion");
  });

  it("falls back to RMIT All-Rounder for an allocation matching no rule", () => {
    const allocation: Allocation = {
      selfStudying: 12,
      assignment: 21,
      networking: 10,
      restWellbeing: 18,
      workExperience: 18,
      careerPrep: 9,
      leadership: 12,
    };
    expect(matchProfileId(allocation)).toBe("rmitAllRounder");
  });
});

describe("matchProfile", () => {
  it("returns the full profile object with metrics and text", () => {
    const allocation: Allocation = {
      selfStudying: 10,
      assignment: 10,
      networking: 10,
      restWellbeing: 40,
      workExperience: 10,
      careerPrep: 10,
      leadership: 10,
    };
    const profile = matchProfile(allocation);
    expect(profile.id).toBe("zenMaster");
    expect(profile.name).toBe("Zen Master");
    expect(profile.metrics).toEqual({
      performance: 2,
      stress: 1,
      wellbeing: 5,
      missedOpps: 5,
    });
  });
});
