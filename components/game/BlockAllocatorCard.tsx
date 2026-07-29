import clsx from "clsx";
import { StickerCard } from "@/components/ui/StickerCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { InfoModal } from "@/components/ui/InfoModal";
import { Stepper } from "@/components/ui/Stepper";
import { ActivityIcon } from "@/components/game/ActivityIcon";
import { BLOCKS } from "@/lib/game/blocks";
import { percentToHours, TOTAL_HOURS } from "@/lib/game/hours";
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

  return (
    <StickerCard
      tone="custom"
      className={clsx("flex flex-col gap-3 p-4 sm:p-5", block.cardBg, block.cardText)}
    >
      <div className="flex items-start justify-between">
        <ActivityIcon blockKey={blockKey} className="size-9 sm:size-10" />
        <InfoModal title={block.label}>
          <p className="mb-2">{block.description}</p>
          <p>
            <strong>168-hour note:</strong> {percent}% equals{" "}
            {percentToHours(percent, TOTAL_HOURS)} hours this week.
          </p>
          <p>
            <strong>Career relevance:</strong> {block.careerRelevance}.{" "}
            {block.careerRelevanceNote}
          </p>
        </InfoModal>
      </div>

      <div>
        <h3 className="font-display text-xl leading-tight sm:text-2xl">{block.label}</h3>
        <p className="mt-1 text-sm leading-snug opacity-80 sm:text-base">{block.description}</p>
      </div>

      <div className="mt-auto">
        <div className="mb-2 flex items-baseline justify-end">
          <span className="font-display text-2xl leading-none sm:text-3xl">{percent}%</span>
        </div>
        <ProgressBar
          percent={percent}
          colorClassName={block.cardText === "text-white" ? "bg-white" : "bg-brand-navy"}
          className="h-4 border-2 border-brand-navy bg-brand-grey"
        />
      </div>

      <div className="pt-1">
        {disabled ? (
          <span className="font-display text-lg">{percent}% (fixed)</span>
        ) : (
          <Stepper value={percent} onChange={onChange} showValue={false} />
        )}
      </div>
    </StickerCard>
  );
}
