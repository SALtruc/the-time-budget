import { StickerCard } from "@/components/ui/StickerCard";
import type { Profile } from "@/lib/game/types";

export function ProfileResultCard({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-4">
      <StickerCard tone="navy" className="p-5 sm:p-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-brand-gold mb-1">
          Your Time Profile
        </p>
        <h1 className="font-display text-3xl sm:text-4xl">{profile.name}</h1>
      </StickerCard>

      <StickerCard tone="white" className="p-5 sm:p-6">
        <h2 className="font-display text-lg sm:text-xl mb-2">
          What does this character mean?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-3">
          {profile.meaning}
        </p>
        <p className="text-sm sm:text-base font-bold">
          Key insight: {profile.keyInsight}
        </p>
      </StickerCard>

      <StickerCard tone="gold" className="p-5 sm:p-6">
        <h2 className="font-display text-lg sm:text-xl mb-2">
          What to do differently?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">{profile.advice}</p>
      </StickerCard>
    </div>
  );
}
