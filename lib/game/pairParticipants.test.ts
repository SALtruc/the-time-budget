import { describe, expect, it } from "vitest";
import { getReadyPair } from "./pairParticipants";
import { PROFILES } from "./profiles";
import { EMPTY_ALLOCATION } from "./blocks";
import type { ParticipantRow } from "@/lib/supabase/sessions";

function player(id: string, ready: boolean, name = id): ParticipantRow {
  return { id, session_id: "room", display_name: name, role_id: null,
    player_profile_id: null, is_ready: ready, joined_at: `2026-09-28T00:00:0${id}Z`,
    allocation: ready ? { ...EMPTY_ALLOCATION, restWellbeing: 100 } : null,
    profile_result: ready ? PROFILES.zenMaster : null };
}

describe("getReadyPair", () => {
  it("unblocks the reported pair with an abandoned Tu and two ready players", () => {
    expect(getReadyPair([player("1", false, "Tu"), player("2", true, "Van"), player("3", true, "Tu")]).map((p) => p.id)).toEqual(["2", "3"]);
  });
  it("keeps waiting while only one player is ready", () => {
    expect(getReadyPair([player("1", true), player("2", false)])).toHaveLength(1);
  });
  it("keeps distinct players who share the same name", () => {
    expect(getReadyPair([player("1", true, "Tu"), player("2", true, "Tu")])).toHaveLength(2);
  });
  it("selects the same first two completed players regardless of response order", () => {
    expect(getReadyPair([player("3", true), player("2", true), player("1", true)]).map((p) => p.id)).toEqual(["1", "2"]);
  });
  it("does not reveal incomplete result data", () => {
    expect(getReadyPair([{ ...player("1", true), allocation: null }, { ...player("2", true), profile_result: null }])).toHaveLength(0);
  });
});
