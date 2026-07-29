import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";

export default function StartPage() {
  return (
    <main className="bg-grid-yellow flex flex-1 flex-col items-center justify-center gap-5 px-4 py-7 sm:gap-8 sm:py-12">
      <Image
        src="/assets/logo.png"
        alt="The Time Budget"
        width={800}
        height={220}
        className="h-auto w-full max-w-xs sm:max-w-md"
        priority
      />

      <div className="flex flex-col items-center gap-6">
        <StickerCard className="px-5 py-3 text-center sm:px-6 sm:py-4">
          <p className="text-lg font-semibold leading-snug sm:text-xl">
            <span className="text-brand-red">Balance</span> your time.{" "}
            <span className="text-brand-red">Shape</span> your future.
          </p>
        </StickerCard>

        <Link href="/rmit-id">
          <Button variant="primary" size="lg">
            START
          </Button>
        </Link>
      </div>

      <Image
        src="/assets/mascot-start.png"
        alt="Time Budget guide"
        width={220}
        height={260}
        className="h-auto w-60 sm:w-72"
      />
    </main>
  );
}
