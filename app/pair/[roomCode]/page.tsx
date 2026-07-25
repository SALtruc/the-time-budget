"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { RoomCodeBadge } from "@/components/ui/RoomCodeBadge";
import { BlockAllocatorCard } from "@/components/game/BlockAllocatorCard";
import { AllocationSummaryBar } from "@/components/game/AllocationSummaryBar";
import { MetricsGrid } from "@/components/game/MetricsGrid";
import { ParticipantsList } from "@/components/game/ParticipantsList";
import { ReflectionQuestions } from "@/components/game/ReflectionQuestions";
import { BLOCK_ORDER } from "@/lib/game/blocks";
import { matchProfile } from "@/lib/game/matchProfile";
import { useGameStore } from "@/lib/store/useGameStore";
import { useSessionStore } from "@/lib/store/useSessionStore";
import {
  subscribeToParticipants,
  submitAllocation,
  type ParticipantRow,
} from "@/lib/supabase/sessions";

export default function PairRoomPage() {
  const params = useParams<{ roomCode: string }>();
  const roomCode = params.roomCode?.toUpperCase() ?? "";

  const sessionId = useSessionStore((s) => s.sessionId);
  const participantId = useSessionStore((s) => s.participantId);
  const storedRoomCode = useSessionStore((s) => s.roomCode);

  const allocation = useGameStore((s) => s.allocation);
  const setPercent = useGameStore((s) => s.setPercent);

  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const profile = useMemo(() => matchProfile(allocation), [allocation]);

  useEffect(() => {
    if (!sessionId) return;
    const unsubscribe = subscribeToParticipants(sessionId, setParticipants);
    return unsubscribe;
  }, [sessionId]);

  if (!sessionId || !participantId || storedRoomCode !== roomCode) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
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

  if (allReady) {
    return (
      <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10 sm:py-14">
        <h1 className="font-display text-2xl sm:text-3xl text-center">
          Your allocations, side by side
        </h1>

        <div className="grid w-full max-w-3xl grid-cols-1 sm:grid-cols-2 gap-5">
          {participants.map((p) => (
            <div key={p.id} className="flex flex-col gap-4">
              <StickerCard tone="navy" className="p-4 sm:p-5 text-center">
                <p className="font-display text-xs uppercase tracking-[0.3em] text-brand-gold mb-1">
                  {p.display_name}
                </p>
                <h2 className="font-display text-2xl">
                  {p.profile_result?.name}
                </h2>
              </StickerCard>
              {p.profile_result && <MetricsGrid metrics={p.profile_result.metrics} />}
            </div>
          ))}
        </div>

        <div className="w-full max-w-3xl">
          <ReflectionQuestions discussionPrompt="Compare your profiles with your partner — did you end up with the same character? Where did your priorities differ? What does that tell you about how different students manage the same 40 hours?" />
        </div>

        <Link href="/mode">
          <Button variant="secondary" size="lg">
            Play again ›
          </Button>
        </Link>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12 text-center">
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
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12 text-center">
        <h1 className="font-display text-2xl sm:text-3xl">
          Waiting for your partner to join
        </h1>
        <RoomCodeBadge code={roomCode} />
        <p className="text-sm sm:text-base max-w-sm">
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
    <main className="flex flex-1 flex-col gap-6 px-4 py-8 sm:py-10 pb-32">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl sm:text-3xl">
            Allocate your 40-hour week
          </h1>
          <RoomCodeBadge code={roomCode} />
        </div>
        <p className="text-sm sm:text-base mb-6">
          Your partner is allocating theirs too — you won&apos;t see their
          picks until you&apos;re both done.
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
        onContinue={handleSubmit}
        buttonLabel={submitting ? "Submitting…" : "Submit"}
        disabled={submitting}
      />
    </main>
  );
}
