"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { Ribbon } from "@/components/ui/Ribbon";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { RoomCodeBadge } from "@/components/ui/RoomCodeBadge";
import { BlockAllocatorCard } from "@/components/game/BlockAllocatorCard";
import { AllocationSummaryBar } from "@/components/game/AllocationSummaryBar";
import { TimeBudgetCard } from "@/components/game/TimeBudgetCard";
import { ParticipantsList } from "@/components/game/ParticipantsList";
import { ParticipantResultCard } from "@/components/game/ParticipantResultCard";
import { ProfileResultCard } from "@/components/game/ProfileResultCard";
import { ReflectionQuestions } from "@/components/game/ReflectionQuestions";
import { ChallengeAgainCTA } from "@/components/game/ChallengeAgainCTA";
import { AllocationComparisonGrid } from "@/components/game/AllocationComparisonGrid";
import { BLOCK_ORDER } from "@/lib/game/blocks";
import { matchProfile } from "@/lib/game/matchProfile";
import { useGameStore } from "@/lib/store/useGameStore";
import { usePlayerStore } from "@/lib/store/usePlayerStore";
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
  const clearSession = useSessionStore((s) => s.clearSession);

  const allocation = useGameStore((s) => s.allocation);
  const setPercent = useGameStore((s) => s.setPercent);
  const reset = useGameStore((s) => s.reset);
  const yearOfStudy = usePlayerStore((s) => s.yearOfStudy);

  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [revealResults, setRevealResults] = useState(false);

  const profile = useMemo(() => matchProfile(allocation), [allocation]);

  useEffect(() => {
    if (!sessionId) return;
    const unsubscribe = subscribeToParticipants(sessionId, setParticipants);
    return unsubscribe;
  }, [sessionId]);

  if (!sessionId || !participantId || storedRoomCode !== roomCode) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
        <StickerCard className="max-w-md p-6">
          <h1 className="mb-3 font-display text-2xl">Session not found</h1>
          <p className="mb-5 text-sm sm:text-base">
            This room link isn&apos;t linked to an active session on this device.
            Join or create a new room to continue.
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

  if (allReady && !revealResults) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center gap-6 px-4 py-8 sm:py-10">
        <div className="w-full max-w-3xl">
          <ScreenHeader backHref="/mode" />
        </div>
        <div className="w-full max-w-3xl">
          <Ribbon color="red" className="mb-3">
            <p className="mb-1 font-display text-lg sm:text-xl">Before the reveal: discuss</p>
            <p className="text-sm font-normal sm:text-base">
              Compare your allocations with your partner before you reveal the
              Time Profiles.
            </p>
          </Ribbon>
          <AllocationComparisonGrid participants={participants} columns="pair" />
        </div>
        <div className="w-full max-w-3xl">
          <ReflectionQuestions variant="pair" />
        </div>
        <Button
          variant="primary"
          size="lg"
          className="!bg-brand-blue !text-white"
          onClick={() => setRevealResults(true)}
        >
          Reveal results
        </Button>
      </main>
    );
  }

  if (allReady) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center gap-6 px-4 py-8 sm:py-10">
        <div className="w-full max-w-3xl">
          <ScreenHeader backHref="/mode" />
        </div>
        <Image
          src="/assets/logo.png"
          alt="The Time Budget"
          width={800}
          height={220}
          className="h-auto w-full max-w-xs"
        />

        <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:gap-4">
          {participants.map((p, i) => (
            <ParticipantResultCard
              key={p.id}
              index={i}
              profileName={p.profile_result?.name ?? ""}
            />
          ))}
        </div>

        <div className="flex w-full max-w-2xl flex-col gap-6">
          <ProfileResultCard
            profile={profile}
            subtitle={yearOfStudy ? `${yearOfStudy} Student` : undefined}
          />
          <ReflectionQuestions
            variant="pair"
            discussionPrompt="Compare your profiles with your partner: did you end up with the same character, and what does that say about different ways to manage the same 168 hours?"
          />
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
          <h1 className="mb-3 font-display text-2xl">Waiting for your partner...</h1>
          <p className="mb-5 text-sm sm:text-base">
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
        <h1 className="font-display text-2xl text-white sm:text-3xl">
          Waiting for your partner to join
        </h1>
        <RoomCodeBadge code={roomCode} />
        <p className="max-w-sm text-sm text-white sm:text-base">
          Share this code with your partner. As soon as they join, you can both
          start allocating your 168-hour week.
        </p>
        <StickerCard className="w-full max-w-sm p-5">
          <ParticipantsList participants={participants} />
        </StickerCard>
      </main>
    );
  }

  return (
    <main className="bg-grid-blue flex flex-1 flex-col gap-6 px-4 pb-32 py-8 sm:py-10">
      <ScreenHeader />
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="font-display text-2xl text-white sm:text-3xl">
            Allocate your 168-hour week
          </h1>
          <RoomCodeBadge code={roomCode} />
        </div>

        <Ribbon color="red" className="mb-4">
          Spend 100% of your time budget across 7 activities for 1 week.
        </Ribbon>

        <div className="mb-4">
          <TimeBudgetCard allocation={allocation} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        buttonLabel={submitting ? "Submitting..." : "Submit"}
        disabled={submitting}
      />
    </main>
  );
}
