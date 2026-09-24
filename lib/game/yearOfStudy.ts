export const YEAR_OF_STUDY_OPTIONS = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4+",
  "Postgraduate",
] as const;

/**
 * Subtitle under the Time Profile name, e.g. "Year 2 Student". Returns
 * undefined for anything outside the fixed options so stray free text
 * never shows up on the result card.
 */
export function formatStudentSubtitle(yearOfStudy: string): string | undefined {
  return (YEAR_OF_STUDY_OPTIONS as readonly string[]).includes(yearOfStudy)
    ? `${yearOfStudy} Student`
    : undefined;
}
