/**
 * The game's asset library labels the allocatable week as "40-hour week"
 * (see Resouces/Self-paced mode). All profile-matching and role rules in the
 * spec are expressed as percentages, so only the displayed hour figures are
 * derived from this constant.
 *
 * A session can have a "surprise event" bonus (see lib/supabase/sessions.ts
 * `bonus_hours`) that raises the effective total for that playthrough only —
 * pass it as `totalHours` so hour labels stay correct without touching the
 * percentage-based matching engine at all.
 */
export const TOTAL_HOURS = 40;

export function percentToHours(percent: number, totalHours = TOTAL_HOURS): number {
  return Math.round((percent / 100) * totalHours);
}

export function hoursToPercent(hours: number, totalHours = TOTAL_HOURS): number {
  return Math.round((hours / totalHours) * 100);
}
