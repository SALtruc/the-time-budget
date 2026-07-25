import { StickerCard } from "@/components/ui/StickerCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { InfoModal } from "@/components/ui/InfoModal";
import { Stepper } from "@/components/ui/Stepper";
import { BLOCKS } from "@/lib/game/blocks";
import { percentToHours } from "@/lib/game/hours";
import type { BlockKey } from "@/lib/game/types";

export function BlockAllocatorCard({
  blockKey,
  percent,
  onChange,
  disabled = false,
}: {
  blockKey: BlockKey;
  percent: number;
  onChange: (next: number) => void;
  disabled?: boolean;
}) {
  const block = BLOCKS[blockKey];
  const hours = percentToHours(percent);

  return (
    <StickerCard tone="gold" className="flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <span className="text-3xl" aria-hidden>
          {block.icon}
        </span>
        <InfoModal title={block.label}>
          <p className="mb-2">{block.description}</p>
          <p>
            <strong>Career relevance:</strong> {block.careerRelevance}.{" "}
            {block.careerRelevanceNote}
          </p>
        </InfoModal>
      </div>

      <div>
        <h3 className="font-display text-xl sm:text-2xl">{block.label}</h3>
        <p className="mt-1 text-sm sm:text-base text-brand-navy/80">
          {block.description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-display text-2xl sm:text-3xl">{percent}%</span>
          <span className="text-sm font-bold">{hours}h / wk</span>
        </div>
        <ProgressBar
          percent={percent}
          colorClassName="bg-brand-navy"
          className="h-3 bg-white/60"
        />
      </div>

      <div className="flex justify-center pt-1">
        {disabled ? (
          <span className="font-display text-lg">{percent}% (fixed)</span>
        ) : (
          <Stepper value={percent} onChange={onChange} />
        )}
      </div>
    </StickerCard>
  );
}
