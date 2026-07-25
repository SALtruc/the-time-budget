import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";

export default function StartPage() {
  return (
    <main className="bg-grid-yellow flex flex-1 flex-col items-center justify-center gap-8 sm:gap-10 px-4 py-10 sm:py-14">
      <Image
        src="/assets/logo.png"
        alt="The Time Budget"
        width={800}
        height={220}
        className="w-full max-w-xs sm:max-w-md h-auto"
        priority
      />

      <div className="flex flex-col items-center gap-6">
        <StickerCard className="px-6 py-4 text-center">
          <p className="text-lg sm:text-xl font-semibold">
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
        className="w-40 sm:w-56 h-auto"
      />
    </main>
  );
}
