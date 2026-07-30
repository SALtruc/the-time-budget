import { StickerCard } from "@/components/ui/StickerCard";

const NAME_COLORS = [
  "text-brand-gold-dark",
  "text-brand-cyan",
  "text-brand-pink",
  "text-brand-red",
];

export function ParticipantResultCard({
  index,
  roleName,
  profileName,
}: {
  index: number;
  roleName?: string;
  profileName: string;
}) {
  const color = NAME_COLORS[index % NAME_COLORS.length];

  return (
    <StickerCard
      tone="white"
      className="animate-pop-in p-4 sm:p-5 text-center"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <p className="text-sm sm:text-base font-bold text-brand-navy/70">
        Player {index + 1}
      </p>
      {roleName && (
        <p className="text-sm sm:text-base font-bold text-brand-navy">
          {roleName}
        </p>
      )}
      <p className={`profile-title-shadow text-stroke break-words font-display text-base font-extrabold leading-tight sm:text-lg ${color}`}>
        {profileName}
      </p>
    </StickerCard>
  );
}
