import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";

export default function StartPage() {
  return (
    <main className="bg-grid-yellow flex min-h-dvh flex-1 flex-col items-center justify-center gap-7 px-4 py-8 sm:gap-9 sm:py-12">
      <Image
        src="/assets/logo.png"
        alt="The Time Budget"
        width={800}
        height={220}
        className="h-auto w-full max-w-[340px] sm:max-w-md"
        priority
      />

      <div className="flex w-full max-w-sm flex-col items-center gap-5">
        <StickerCard className="w-full px-5 py-4 text-center sm:px-6 sm:py-5">
          <p className="text-[1.45rem] font-semibold leading-snug sm:text-2xl">
            <span className="text-brand-red">Balance</span> your time.{" "}
            <span className="text-brand-red">Shape</span> your future.
          </p>
        </StickerCard>

        <Link href="/rmit-id">
          <Button variant="primary" size="lg" className="px-8 text-xl sm:text-2xl">
            START
          </Button>
        </Link>
      </div>

      <Image
        src="/assets/mascot-start.png"
        alt="Time Budget guide"
        width={220}
        height={260}
        className="h-auto w-64 sm:w-72"
      />
    </main>
  );
}
