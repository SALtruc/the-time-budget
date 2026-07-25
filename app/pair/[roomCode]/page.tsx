"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { Ribbon } from "@/components/ui/Ribbon";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { RoomCodeBadge } from "@/components/ui/RoomCodeBadge";
import { BlockAllocatorCard } from "@/components/game/BlockAllocatorCard";
import { AllocationSummaryBar } from "@/components/game/AllocationSummaryBar";
import { TimeBudgetCard } from "@/components/game/TimeBudgetCard";
import { SurpriseEventCard } from "@/components/game/SurpriseEventCard";
import { MetricsGrid } from "@/components/game/MetricsGrid";
import { ParticipantsList } from "@/components/game/ParticipantsList";
import { ReflectionQuestions } from "@/components/game/ReflectionQuestions";
import { ChallengeAgainCTA } from "@/components/game/ChallengeAgainCTA";
import { BLOCK_ORDER, BLOCKS } from "@/lib/game/blocks";
import { matchProfile } from "@/lib/game/matchProfile";
import { percentToHours, TOTAL_HOURS } from "@/lib/game/hours";
import { useGameStore } from "@/lib/store/useGameStore";
import { useSessionStore } from "@/lib/store/useSessionStore";
import {
  subscribeToParticipants,
  submitAllocation,
  type ParticipantRow,
} from "@/lib/supabase/sessions";

export default function PairRoomPage() {
  const router = useRouter();
  const params = useParams<{ roomCode: string }>();
  const roomCode = params.roomCode ?? "";

  const sessionId = useSessionStore((s) => s.sessionId);
  const participantId = useSessionStore((s) => s.participantId);
  const storedRoomCode = useSessionStore((s) => s.roomCode);
  const bonusHours = useSessionStore((s) => s.bonusHours);
  const clearSession = useSessionStore((s) => s.clearSession);

  const allocation = useGameStore((s) => s.allocation);
  const setPercent = useGameStore((s) => s.setPercent);
  const reset = useGameStore((s) => s.reset);

  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const profile = useMemo(() => matchProfile(allocation), [allocation]);
  const effectiveTotalHours = TOTAL_HOURS + bonusHours;

  useEffect(() => {
    if (!sessionId) return;
    const unsubscribe = subscribeToParticipants(sessionId, setParticipants);
    return unsubscribe;
  }, [sessionId]);

  if (!sessionId || !participantId || storedRoomCode !== roomCode) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
        <StickerCard className="max-w-md p-6">
          <h1 className="font-display text-2xl mb-3">Session not found</h1>
          <p className="text-sm sm:text-base mb-5">
            This room link isn&apos;t linked to an active session on this
            device. Join or create a new room to continue.
          </p>
          <Link href="/pair">
            <Button variant="primary">Back to Pair Comparison</Button>
          </Link>
        </StickerCard>
      </main>
    );
  }

  const bothJoined = participants.length >= 2;
  const allReady = participants.length >= 2 && participants.every((p) => p.is_ready);

  async function handleSubmit() {
    if (!participantId) return;
    setSubmitting(true);
    try {
      await submitAllocation(participantId, allocation, profile);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handlePlayAgain() {
    reset();
    clearSession();
    router.push("/mode");
  }

  if (allReady) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center gap-6 px-4 py-10 sm:py-14">
        <div className="w-full max-w-3xl">
          <Ribbon color="red" className="mb-6">
            <p className="font-display text-lg sm:text-xl mb-1">
              Before the reveal — discuss
            </p>
            <p className="text-sm sm:text-base font-normal">
              Compare your allocations with your partner. Which activities
              did you each prioritize? Where did you make different choices
              and why?
            </p>
          </Ribbon>
        </div>

        <h2 className="font-display text-lg sm:text-xl text-white text-center">
          Your allocations side by side
        </h2>
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BLOCK_ORDER.map((key) => (
            <div key={key} className="contents">
              {participants.map((p) => (
                <StickerCard
                  key={p.id + key}
                  tone="custom"
                  className={`p-4 ${BLOCKS[key].cardBg} ${BLOCKS[key].cardText}`}
                >
                  <p className="text-xs sm:text-sm opacity-80">{p.display_name}</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {BLOCKS[key].icon} {BLOCKS[key].label}
                  </p>
                  <p className="font-display text-2xl">
                    {p.allocation
                      ? percentToHours(p.allocation[key], effectiveTotalHours)
                      : 0}
                    h
                  </p>
                </StickerCard>
              ))}
            </div>
          ))}
        </div>

        <div className="w-full max-w-3xl flex flex-col gap-4">
          {participants.map((p) => (
            <StickerCard key={p.id} tone="navy" className="p-4 sm:p-5 text-center">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-brand-gold mb-1">
                {p.display_name}
              </p>
              <h2 className="font-display text-2xl">{p.profile_result?.name}</h2>
              {p.profile_result && (
                <div className="mt-3">
                  <MetricsGrid metrics={p.profile_result.metrics} />
                </div>
              )}
            </StickerCard>
          ))}
        </div>

        <div className="w-full max-w-3xl">
          <ReflectionQuestions discussionPrompt="Compare your profiles with your partner — did you end up with the same character? Where did your priorities differ? What does that tell you about how different students manage the same 40 hours?" />
        </div>

        <div className="w-full max-w-3xl">
          <ChallengeAgainCTA
            onChallengeAgain={handlePlayAgain}
            onGoHome={handlePlayAgain}
          />
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12 text-center">
        <StickerCard className="max-w-md p-6">
          <h1 className="font-display text-2xl mb-3">
            Waiting for your partner…
          </h1>
          <p className="text-sm sm:text-base mb-5">
            You matched <strong>{profile.name}</strong>. Results reveal once
            everyone has submitted.
          </p>
          <ParticipantsList participants={participants} />
        </StickerCard>
      </main>
    );
  }

  if (!bothJoined) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12 text-center">
        <h1 className="font-display text-2xl sm:text-3xl text-white">
          Waiting for your partner to join
        </h1>
        <RoomCodeBadge code={roomCode} />
        <p className="text-sm sm:text-base max-w-sm text-white">
          Share this code with your partner. As soon as they join, you can
          both start allocating your 40-hour week.
        </p>
        <StickerCard className="w-full max-w-sm p-5">
          <ParticipantsList participants={participants} />
        </StickerCard>
      </main>
    );
  }

  return (
    <main className="bg-grid-blue flex flex-1 flex-col gap-6 px-4 py-8 sm:py-10 pb-32">
      <ScreenHeader />
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4 gap-4">
          <h1 className="font-display text-2xl sm:text-3xl text-white">
            Allocate your 40-hour week
          </h1>
          <RoomCodeBadge code={roomCode} />
        </div>

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
        onContinue={handleSubmit}
        buttonLabel={submitting ? "Submitting…" : "Submit"}
        disabled={submitting}
        bonusHours={bonusHours}
      />
    </main>
  );
}
