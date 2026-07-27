"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlockAllocatorCard } from "@/components/game/BlockAllocatorCard";
import { AllocationSummaryBar } from "@/components/game/AllocationSummaryBar";
import { TimeBudgetCard } from "@/components/game/TimeBudgetCard";
import { SurpriseEventCard } from "@/components/game/SurpriseEventCard";
import { ProfileResultCard } from "@/components/game/ProfileResultCard";
import { MetricsGrid } from "@/components/game/MetricsGrid";
import { ReflectionQuestions } from "@/components/game/ReflectionQuestions";
import { ChallengeAgainCTA } from "@/components/game/ChallengeAgainCTA";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Ribbon } from "@/components/ui/Ribbon";
import { BLOCK_ORDER } from "@/lib/game/blocks";
import { matchProfile } from "@/lib/game/matchProfile";
import { useGameStore } from "@/lib/store/useGameStore";
import { usePlayerStore } from "@/lib/store/usePlayerStore";

type Step = "allocate" | "result";

export default function SelfPacedPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("allocate");
  const allocation = useGameStore((s) => s.allocation);
  const setPercent = useGameStore((s) => s.setPercent);
  const reset = useGameStore((s) => s.reset);
  const bonusHours = useGameStore((s) => s.bonusHours);
  const rollBonusHours = useGameStore((s) => s.rollBonusHours);
  const yearOfStudy = usePlayerStore((s) => s.yearOfStudy);

  useEffect(() => {
    rollBonusHours();
  }, [rollBonusHours]);

  const profile = useMemo(() => matchProfile(allocation), [allocation]);

  if (step === "allocate") {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col px-4 py-8 sm:py-10 pb-32">
        <ScreenHeader backHref="/mode" />
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="font-display text-2xl sm:text-3xl mb-4 text-white">
            Allocate your 40-hour week
          </h1>

          <Ribbon color="red" className="mb-4">
            Spend 100% of your time budget across 7 activities for 1 week!
          </Ribbon>

          <div className="mb-4 flex flex-col gap-4">
            <SurpriseEventCard bonusHours={bonusHours} />
            <TimeBudgetCard allocation={allocation} />
          </div>

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
          bonusHours={bonusHours}
        />
      </main>
    );
  }

  return (
    <main className="bg-grid-blue flex flex-1 flex-col items-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-2xl">
        <ScreenHeader backHref="/mode" />
      </div>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Image
            src="/assets/logo.png"
            alt="The Time Budget"
            width={800}
            height={220}
            className="mx-auto w-full max-w-xs h-auto"
          />
          <ProfileResultCard
            profile={profile}
            subtitle={yearOfStudy ? `${yearOfStudy} Student` : undefined}
          />
        </div>
        <MetricsGrid metrics={profile.metrics} />
        <ReflectionQuestions />

        <ChallengeAgainCTA
          onChallengeAgain={() => {
            reset();
            setStep("allocate");
          }}
          onGoHome={() => {
            reset();
            router.push("/mode");
          }}
        />
      </div>
    </main>
  );
}
