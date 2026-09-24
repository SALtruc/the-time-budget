/**
 * Tidies a free-text year of study: trims it and turns a bare number such
 * as "3" or "4+" into "Year 3" / "Year 4+".
 */
export function normalizeYearOfStudy(value: string): string {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return /^\d+\+?$/.test(trimmed) ? `Year ${trimmed}` : trimmed;
}

/** A year of study needs at least one letter or digit. */
export function isValidYearOfStudy(value: string): boolean {
  return /[\p{L}\p{N}]/u.test(value.trim());
}

/**
 * Subtitle under the Time Profile name, e.g. "Year 2 Student". Returns
 * undefined for empty or overly long entries so stray free text never
 * breaks the result card.
 */
export function formatStudentSubtitle(yearOfStudy: string): string | undefined {
  const normalized = normalizeYearOfStudy(yearOfStudy);
  if (!isValidYearOfStudy(normalized) || normalized.length > 30) return undefined;
  return /student/i.test(normalized) ? normalized : `${normalized} Student`;
}
