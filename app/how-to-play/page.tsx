import Link from "next/link";
import { StickerCard } from "@/components/ui/StickerCard";
import { Button } from "@/components/ui/Button";
import { BLOCK_ORDER, BLOCKS } from "@/lib/game/blocks";

export default function HowToPlayPage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-4 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-center">
        How to play
      </h1>

      <StickerCard className="w-full max-w-2xl p-5 sm:p-6">
        <ol className="list-decimal space-y-2 pl-5 text-sm sm:text-base">
          <li>Pick a mode: Self-paced, Pair Comparison, or Group Roleplay.</li>
          <li>
            Allocate your 40-hour week across 7 activity blocks as
            percentages that add up to 100%.
          </li>
          <li>
            We match your allocation to one of 17 Time Profile characters.
          </li>
          <li>
            See your character, 4 outcome metrics, a key insight, and
            reflection questions to discuss.
          </li>
        </ol>
      </StickerCard>

      <div className="w-full max-w-2xl">
        <h2 className="font-display text-xl sm:text-2xl mb-4 text-center">
          The 7 activity blocks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BLOCK_ORDER.map((key) => {
            const block = BLOCKS[key];
            return (
              <StickerCard key={key} tone="gold" className="p-4 sm:p-5">
                <p className="text-2xl mb-1" aria-hidden>
                  {block.icon}
                </p>
                <h3 className="font-display text-lg">{block.label}</h3>
                <p className="text-sm mt-1">{block.description}</p>
                <p className="text-xs font-bold mt-2 text-brand-navy/70">
                  Career relevance: {block.careerRelevance}
                </p>
              </StickerCard>
            );
          })}
        </div>
      </div>

      <Link href="/mode">
        <Button variant="primary" size="lg">
          Let&apos;s go ›
        </Button>
      </Link>
    </main>
  );
}
