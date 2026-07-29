import type { BlockKey } from "@/lib/game/types";

const iconPaths: Record<BlockKey, string[]> = {
  selfStudying: ["M5 7c2-1 4-1 7 1v10c-3-2-5-2-7-1z", "M19 7c-2-1-4-1-7 1v10c3-2 5-2 7-1z"],
  assignment: ["M7 4h8l3 3v13H7z", "M15 4v4h4", "M9 12h6", "M9 16h6"],
  networking: ["M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M4 20c.5-4 3-6 6-6", "M20 20c-.5-4-3-6-6-6"],
  restWellbeing: ["M19 15.5A7.5 7.5 0 0 1 8.5 5 8 8 0 1 0 19 15.5z"],
  workExperience: ["M5 8h14v11H5z", "M9 8V6h6v2", "M5 13h14"],
  careerPrep: ["M12 4l7 16-7-4-7 4z", "M12 4v12"],
  leadership: ["M5 19h14l-2-9-4 3-1-7-1 7-4-3z"],
};

export function ActivityIcon({
  blockKey,
  className = "size-10",
}: {
  blockKey: BlockKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {iconPaths[blockKey].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
