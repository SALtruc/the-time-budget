import Image from "next/image";
import { Ribbon } from "@/components/ui/Ribbon";
import { StickerCard } from "@/components/ui/StickerCard";

export function ChallengeAgainCTA({
  onChallengeAgain,
  onGoHome,
}: {
  onChallengeAgain: () => void;
  onGoHome: () => void;
}) {
  return (
    <div className="flex items-end gap-3 sm:gap-5">
      <Image
        src="/assets/mascot-clipboard.png"
        alt=""
        width={240}
        height={154}
        className="h-auto w-40 shrink-0 sm:w-48"
      />
      <div className="flex flex-1 flex-col gap-3">
        <StickerCard className="p-3 text-sm font-semibold leading-snug sm:p-4 sm:text-base">
          Would you like to challenge again?
        </StickerCard>
        <button onClick={onChallengeAgain} className="text-left">
          <Ribbon color="red" className="text-xs sm:text-sm" contentClassName="py-2 sm:py-2.5">
            Of course, LET&apos;S GO!
          </Ribbon>
        </button>
        <button
          onClick={onGoHome}
          className="rounded-[18px] border-ink bg-white px-3 py-2 text-left text-xs font-semibold text-brand-navy shadow-sticker-sm active-press sm:text-sm"
        >
          No, let&apos;s go back to homepage
        </button>
      </div>
    </div>
  );
}
