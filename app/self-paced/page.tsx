"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { BlockAllocatorCard } from "@/components/game/BlockAllocatorCard";
import { AllocationSummaryBar } from "@/components/game/AllocationSummaryBar";
import { ProfileResultCard } from "@/components/game/ProfileResultCard";
import { MetricsGrid } from "@/components/game/MetricsGrid";
import { ReflectionQuestions } from "@/components/game/ReflectionQuestions";
import { BLOCK_ORDER } from "@/lib/game/blocks";
import { matchProfile } from "@/lib/game/matchProfile";
import { useGameStore } from "@/lib/store/useGameStore";

type Step = "name" | "allocate" | "result";

export default function SelfPacedPage() {
  const [step, setStep] = useState<Step>("name");
  const playerName = useGameStore((s) => s.playerName);
  const setPlayerName = useGameStore((s) => s.setPlayerName);
  const allocation = useGameStore((s) => s.allocation);
  const setPercent = useGameStore((s) => s.setPercent);
  const reset = useGameStore((s) => s.reset);

  const profile = useMemo(() => matchProfile(allocation), [allocation]);

  if (step === "name") {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
        <StickerCard className="w-full max-w-md p-6 sm:p-8">
          <h1 className="font-display text-2xl sm:text-3xl mb-2">
            What should we call you?
          </h1>
          <p className="text-sm sm:text-base mb-5">
            Optional — this just personalises your result screen.
          </p>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-2xl border-ink px-4 py-3 text-base sm:text-lg font-semibold mb-6"
            maxLength={40}
          />
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setStep("allocate")}
          >
            Continue ›
          </Button>
        </StickerCard>
      </main>
    );
  }

  if (step === "allocate") {
    return (
      <main className="flex flex-1 flex-col gap-6 px-4 py-8 sm:py-10 pb-32">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="font-display text-2xl sm:text-3xl mb-1">
            Allocate your 40-hour week
          </h1>
          <p className="text-sm sm:text-base mb-6">
            {playerName ? `${playerName}, spread` : "Spread"} your 100% across
            the 7 blocks below. Use the − / + buttons on each card.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOCK_ORDER.map((key) => (
              <BlockAllocatorCard
                key={key}
                blockKey={key}
                percent={allocation[key]}
                onChange={(next) => setPercent(key, next)}
              />
            ))}
          </div>
        </div>

        <AllocationSummaryBar
          allocation={allocation}
          onContinue={() => setStep("result")}
        />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10 sm:py-14">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <ProfileResultCard profile={profile} />
        <MetricsGrid metrics={profile.metrics} />
        <ReflectionQuestions />

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              reset();
              setStep("name");
            }}
          >
            Play again ›
          </Button>
          <Link href="/mode">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => reset()}
            >
              Back to modes
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
