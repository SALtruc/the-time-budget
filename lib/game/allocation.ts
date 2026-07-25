import { BLOCK_KEYS } from "./types";
import type { Allocation } from "./types";

export function getTotalPercent(allocation: Allocation): number {
  return BLOCK_KEYS.reduce((sum, key) => sum + allocation[key], 0);
}

export function getRemainingPercent(allocation: Allocation): number {
  return 100 - getTotalPercent(allocation);
}

export function isFullyAllocated(allocation: Allocation): boolean {
  return getTotalPercent(allocation) === 100;
}
