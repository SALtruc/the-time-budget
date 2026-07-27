import { StickerCard } from "@/components/ui/StickerCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BLOCKS } from "@/lib/game/blocks";
import type { Profile } from "@/lib/game/types";

function DeltaRow({ block, hours }: { block: string; hours: number }) {
  const label = BLOCKS[block as keyof typeof BLOCKS].label;
  const positive = hours > 0;

  return (
    <div className="flex items-center gap-3">
      <span className="w-28 sm:w-36 shrink-0 text-sm sm:text-base font-bold">
        {label}
      </span>
      <ProgressBar
        percent={Math.min(Math.abs(hours) * 8, 100)}
        colorClassName={positive ? "bg-brand-pink" : "bg-brand-red"}
        className="h-2.5 flex-1"
      />
      <span
        className={`w-10 shrink-0 text-right text-sm sm:text-base font-bold ${
          positive ? "text-brand-pink" : "text-brand-red"
        }`}
      >
        {positive ? "+" : ""}
        {hours}h
      </span>
    </div>
  );
}

export function ProfileResultCard({
  profile,
  subtitle,
}: {
  profile: Profile;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <StickerCard tone="white" className="p-6 sm:p-8 text-center">
        <p className="font-display text-base sm:text-lg tracking-wide text-brand-navy/70">
          Your Time Profile
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-brand-gold-dark">
          {profile.name}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm sm:text-base italic text-brand-navy/70">
            {subtitle}
          </p>
        )}
      </StickerCard>

      <StickerCard tone="gold" className="p-5 sm:p-6">
        <h2 className="text-stroke font-display text-xl sm:text-2xl mb-2 text-white">
          WHAT DOES YOUR CHARACTER MEAN?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-3">
          {profile.meaning}
        </p>
        <p className="text-sm sm:text-base font-bold">
          Key insight: {profile.keyInsight}
        </p>
      </StickerCard>

      <StickerCard tone="white" className="p-5 sm:p-6">
        <h2 className="text-stroke font-display text-xl sm:text-2xl mb-2 text-brand-pink">
          WHAT TO DO DIFFERENTLY
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-4">
          {profile.advice}
        </p>
        <div className="flex flex-col gap-3">
          {profile.deltas.map((delta) => (
            <DeltaRow key={delta.block} block={delta.block} hours={delta.hours} />
          ))}
        </div>
      </StickerCard>
    </div>
  );
}
