import Image from "next/image";
import Link from "next/link";
import { StickerCard } from "@/components/ui/StickerCard";
import { Button } from "@/components/ui/Button";
import { Ribbon } from "@/components/ui/Ribbon";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { BLOCK_ORDER, BLOCKS } from "@/lib/game/blocks";

export default function HowToPlayPage() {
  return (
    <main className="bg-grid-blue flex flex-1 flex-col px-4 py-8 sm:py-10">
      <ScreenHeader backHref="/mode" />

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8">
        <Image
          src="/assets/logo.png"
          alt="The Time Budget"
          width={800}
          height={220}
          className="w-full max-w-xs h-auto"
        />

        <div className="w-full">
          <Ribbon color="gold" className="mb-4">
            How does this work?
          </Ribbon>
          <StickerCard className="w-full p-5 sm:p-6">
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
        </div>

        <div className="w-full">
          <h2 className="mb-4 text-center font-display text-xl sm:text-2xl text-white">
            The 7 activity blocks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BLOCK_ORDER.map((key) => {
              const block = BLOCKS[key];
              return (
                <StickerCard
                  key={key}
                  tone="custom"
                  className={`p-4 sm:p-5 ${block.cardBg} ${block.cardText}`}
                >
                  <p className="text-2xl mb-1" aria-hidden>
                    {block.icon}
                  </p>
                  <h3 className="font-display text-lg">{block.label}</h3>
                  <p className="text-sm mt-1 opacity-90">{block.description}</p>
                  <p className="text-xs font-bold mt-2 opacity-70">
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
      </div>
    </main>
  );
}
