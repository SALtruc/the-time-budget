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
    <div className="flex items-end gap-3 sm:gap-4">
      <Image
        src="/assets/mascot-clipboard.png"
        alt=""
        width={120}
        height={150}
        className="w-20 sm:w-28 h-auto shrink-0"
      />
      <div className="flex flex-1 flex-col gap-3">
        <StickerCard className="p-3 sm:p-4 text-sm sm:text-base font-semibold">
          Would you like to challenge again?
        </StickerCard>
        <button onClick={onChallengeAgain} className="text-left">
          <Ribbon color="red" className="text-sm sm:text-base">
            Of course, LET&apos;S GO!
          </Ribbon>
        </button>
        <button
          onClick={onGoHome}
          className="rounded-full border-ink bg-brand-grey/50 px-5 py-2.5 text-sm sm:text-base font-semibold text-brand-navy shadow-sticker-sm active-press text-left"
        >
          No, let&apos;s go back to homepage
        </button>
      </div>
    </div>
  );
}
