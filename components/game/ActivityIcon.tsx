import Image from "next/image";
import type { BlockKey } from "@/lib/game/types";

const iconSrc: Record<BlockKey, string> = {
  selfStudying: "/assets/time-icons/self-studying.png",
  assignment: "/assets/time-icons/assignment.png",
  networking: "/assets/time-icons/networking.png",
  restWellbeing: "/assets/time-icons/rest-wellbeing.png",
  workExperience: "/assets/time-icons/work-experience.png",
  careerPrep: "/assets/time-icons/career-prep.png",
  leadership: "/assets/time-icons/leadership.png",
};

export function ActivityIcon({
  blockKey,
  className = "size-10",
}: {
  blockKey: BlockKey;
  className?: string;
}) {
  return (
    <Image
      src={iconSrc[blockKey]}
      alt=""
      width={80}
      height={80}
      className={className}
      aria-hidden
    />
  );
}
