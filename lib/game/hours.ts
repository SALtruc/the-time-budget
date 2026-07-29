/**
 * Students allocate a full calendar week: 24 hours x 7 days.
 * Profile matching stays percentage-based, so this constant only affects
 * displayed hour figures.
 */
export const TOTAL_HOURS = 168;

export function percentToHours(percent: number, totalHours = TOTAL_HOURS): number {
  return Math.round((percent / 100) * totalHours);
}

export function hoursToPercent(hours: number, totalHours = TOTAL_HOURS): number {
  return Math.round((hours / totalHours) * 100);
}
