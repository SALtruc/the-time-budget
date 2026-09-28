import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PROFILES } from "@/lib/game/profiles";
import { EMPTY_ALLOCATION } from "@/lib/game/blocks";

const { from, upsert, update, responses } = vi.hoisted(() => ({
  from: vi.fn(), upsert: vi.fn(), update: vi.fn(),
  responses: [] as Array<{ data: unknown; error: unknown }>,
}));
vi.mock("./client", () => ({ supabase: { from } }));
import { joinSession, submitAllocation } from "./sessions";

const readyPlayer = {
  id: "saved-id", session_id: "room", display_name: "Tu", is_ready: true,
  allocation: { ...EMPTY_ALLOCATION, restWellbeing: 100 }, profile_result: PROFILES.zenMaster,
  player_profile_id: "profile", role_id: null, joined_at: "2026-09-28",
};
const enqueue = (...data: unknown[]) => responses.push(...data.map((value) => ({ data: value, error: null })));

beforeEach(() => {
  vi.clearAllMocks();
  responses.length = 0;
  const storage = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
  });
  const take = () => {
    const response = responses.shift();
    if (!response) throw new Error("Unexpected database request");
    return Promise.resolve(response);
  };
  const query = {
    select: vi.fn(() => query), eq: vi.fn(() => query), order: vi.fn(() => query),
    limit: vi.fn(() => query), upsert, update,
    maybeSingle: vi.fn(take), single: vi.fn(take),
    then: (resolve: (value: { data: unknown; error: unknown }) => unknown) => take().then(resolve),
  };
  upsert.mockReturnValue(query);
  update.mockReturnValue(query);
  from.mockReturnValue(query);
});
afterEach(() => vi.unstubAllGlobals());

describe("joinSession", () => {
  it("creates only one participant when the same player joins twice concurrently", async () => {
    localStorage.setItem("time-budget:participant:room", "saved-id");
    enqueue(null, { mode: "pair" }, [], readyPlayer);
    const firstJoin = joinSession("room", "Tu");
    const secondJoin = joinSession("room", "Tu");
    expect(secondJoin).toBe(firstJoin);
    expect(await Promise.all([firstJoin, secondJoin])).toEqual([readyPlayer, readyPlayer]);
    expect(upsert).toHaveBeenCalledOnce();
    expect(responses).toHaveLength(0);
  });

  it("reuses a saved participant including their submitted result", async () => {
    localStorage.setItem("time-budget:participant:room", "saved-id");
    enqueue(readyPlayer);
    expect(await joinSession("room", "Tu")).toEqual(readyPlayer);
    expect(upsert).not.toHaveBeenCalled();
  });

  it("recovers a legacy join by profile ID, without resetting readiness", async () => {
    enqueue(null, readyPlayer);
    expect(await joinSession("room", "Tu", null, "profile")).toEqual(readyPlayer);
    expect(localStorage.getItem("time-budget:participant:room")).toBe("saved-id");
    expect(upsert).not.toHaveBeenCalled();
  });

  it("blocks a new third player before inserting", async () => {
    enqueue(null, { mode: "pair" }, [readyPlayer, { ...readyPlayer, id: "other" }]);
    await expect(joinSession("room", "Van")).rejects.toThrow("already has two players");
    expect(upsert).not.toHaveBeenCalled();
  });

  it("retains the ID across a failed insert and retry", async () => {
    enqueue(null, { mode: "pair" }, []);
    responses.push({ data: null, error: new Error("Failed to fetch") });
    await expect(joinSession("room", "Tu")).rejects.toThrow("Failed to fetch");
    const savedId = localStorage.getItem("time-budget:participant:room");
    enqueue(null, { mode: "pair" }, [], { ...readyPlayer, id: savedId });
    await joinSession("room", "Tu");
    expect(upsert).toHaveBeenCalledTimes(2);
    for (const [row, options] of upsert.mock.calls) {
      expect(row.id).toBe(savedId);
      expect(options).toEqual({ onConflict: "id", ignoreDuplicates: true });
    }
  });

  it("recovers the row after a concurrent duplicate insert", async () => {
    enqueue(null, { mode: "group" }, null, readyPlayer);
    expect(await joinSession("room", "Tu")).toEqual(readyPlayer);
    expect(upsert).toHaveBeenCalledOnce();
  });
});

it("rejects a submission when the database did not update a participant", async () => {
  responses.push({ data: null, error: new Error("No rows returned") });
  await expect(submitAllocation("missing", readyPlayer.allocation, PROFILES.zenMaster)).rejects.toThrow("No rows returned");
});
