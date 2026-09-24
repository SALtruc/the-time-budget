import { StickerCard } from "@/components/ui/StickerCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MetricsGrid } from "@/components/game/MetricsGrid";
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
      <StickerCard tone="white" className="animate-pop-in p-6 text-center sm:p-8">
        <p className="font-display text-lg font-extrabold tracking-wide text-brand-navy/80 sm:text-xl">
          Your Time Profile
        </p>
        <h1 className="profile-title-shadow text-stroke mx-auto break-words text-balance font-display text-4xl font-extrabold leading-[1.05] text-brand-gold sm:text-5xl">
          {profile.name}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm sm:text-base italic text-brand-navy/70">
            {subtitle}
          </p>
        )}
      </StickerCard>

      <MetricsGrid metrics={profile.metrics} />

      <StickerCard tone="gold" className="p-5 sm:p-6">
        <h2 className="section-title-shadow text-stroke mb-3 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
          WHAT DOES YOUR CHARACTER MEAN?
        </h2>
        <p className="mb-3 text-base font-semibold leading-relaxed sm:text-lg">
          {profile.meaning}
        </p>
        <p className="text-base font-extrabold sm:text-lg">
          Key insight: {profile.keyInsight}
        </p>
        {profile.reflect.length > 0 && (
          <div className="mt-4 rounded-[14px] border-2 border-brand-navy bg-white px-4 py-3 shadow-sticker-sm">
            <p className="mb-2 font-display text-base sm:text-lg">Ask yourself</p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm font-semibold leading-relaxed sm:text-base">
              {profile.reflect.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
        )}
      </StickerCard>

      <StickerCard tone="white" className="p-5 sm:p-6">
        <h2 className="section-title-shadow text-stroke mb-3 font-display text-2xl font-extrabold leading-tight text-brand-pink sm:text-3xl">
          SOMETHING TO TRY
        </h2>
        <p className="mb-4 text-base font-semibold leading-relaxed sm:text-lg">
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
