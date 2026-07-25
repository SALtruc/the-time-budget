import { create } from "zustand";
import { EMPTY_ALLOCATION } from "@/lib/game/blocks";
import type { Allocation, BlockKey, RoleId } from "@/lib/game/types";

interface GameState {
  playerName: string;
  allocation: Allocation;
  roleId: RoleId | null;
  setPlayerName: (name: string) => void;
  setPercent: (key: BlockKey, value: number) => void;
  adjustPercent: (key: BlockKey, delta: number) => void;
  setRole: (roleId: RoleId | null, fixedAllocation: Partial<Allocation>) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerName: "",
  allocation: { ...EMPTY_ALLOCATION },
  roleId: null,

  setPlayerName: (name) => set({ playerName: name }),

  setPercent: (key, value) =>
    set((state) => ({
      allocation: { ...state.allocation, [key]: Math.max(0, Math.min(100, value)) },
    })),

  adjustPercent: (key, delta) =>
    set((state) => ({
      allocation: {
        ...state.allocation,
        [key]: Math.max(0, Math.min(100, state.allocation[key] + delta)),
      },
    })),

  setRole: (roleId, fixedAllocation) =>
    set((state) => ({
      roleId,
      allocation: { ...state.allocation, ...fixedAllocation },
    })),

  reset: () =>
    set({ playerName: "", allocation: { ...EMPTY_ALLOCATION }, roleId: null }),
}));
