/**
 * The game's asset library labels the allocatable week as "40-hour week"
 * (see Resouces/Self-paced mode). All profile-matching and role rules in the
 * spec are expressed as percentages, so only the displayed hour figures are
 * derived from this constant.
 */
export const TOTAL_HOURS = 40;

export function percentToHours(percent: number): number {
  return Math.round((percent / 100) * TOTAL_HOURS);
}

export function hoursToPercent(hours: number): number {
  return Math.round((hours / TOTAL_HOURS) * 100);
}
