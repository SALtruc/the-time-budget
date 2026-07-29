import Image from "next/image";
import Link from "next/link";
import { StickerCard } from "@/components/ui/StickerCard";
import { Button } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ActivityIcon } from "@/components/game/ActivityIcon";
import { BLOCK_ORDER, BLOCKS } from "@/lib/game/blocks";

export default async function HowToPlayPage({
  searchParams,
}: PageProps<"/how-to-play">) {
  const params = await searchParams;
  const from =
    typeof params.from === "string" && params.from.startsWith("/")
      ? params.from
      : "/mode";

  return (
    <main className="bg-grid-blue flex flex-1 flex-col px-4 py-8 sm:py-10">
      <ScreenHeader backHref={from} />

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8">
        <Image
          src="/assets/logo.png"
          alt="The Time Budget"
          width={800}
          height={220}
          className="w-full max-w-xs h-auto"
        />

        <div className="w-full">
          <StickerCard tone="custom" className="overflow-hidden bg-brand-red text-white">
            <div className="border-b-[3px] border-brand-navy bg-brand-gold px-5 py-2 text-center font-display text-xl text-brand-navy">
              HOW TO PLAY
            </div>
            <ol className="space-y-3 px-5 py-5 text-sm leading-relaxed sm:text-base">
              <li>
                <strong>1.</strong> Your 100% time budget equals 168 hours:
                24 hours a day, 7 days a week.
              </li>
              <li>
                <strong>2.</strong> Allocate that budget across the 7 activity
                blocks until the total reaches 100%.
              </li>
              <li>
                <strong>3.</strong> Review your Time Profile, live outcome
                metrics, key insight, and reflection questions.
              </li>
              <li>
                <strong>4.</strong> There is no perfect balance here, only
                trade-offs worth discussing.
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
                  <ActivityIcon blockKey={key} className="mb-1 size-8" />
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

        <Link href={from}>
          <Button variant="primary" size="lg">
            Let&apos;s go
          </Button>
        </Link>
      </div>
    </main>
  );
}
