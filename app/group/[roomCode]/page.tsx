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
import { RoleContextCard } from "@/components/game/RoleContextCard";
import { BLOCK_ORDER } from "@/lib/game/blocks";
import { matchProfile } from "@/lib/game/matchProfile";
import { getRole, ROLE_ORDER } from "@/lib/game/roles";
import { useGameStore } from "@/lib/store/useGameStore";
import { useSessionStore } from "@/lib/store/useSessionStore";
import {
  subscribeToParticipants,
  submitAllocation,
  updateParticipantRole,
  type ParticipantRow,
} from "@/lib/supabase/sessions";

export default function GroupRoomPage() {
  const router = useRouter();
  const params = useParams<{ roomCode: string }>();
  const roomCode = params.roomCode ?? "";

  const sessionId = useSessionStore((s) => s.sessionId);
  const participantId = useSessionStore((s) => s.participantId);
  const storedRoomCode = useSessionStore((s) => s.roomCode);
  const roleId = useSessionStore((s) => s.roleId);
  const bonusHours = useSessionStore((s) => s.bonusHours);
  const setRoleId = useSessionStore((s) => s.setRoleId);
  const clearSession = useSessionStore((s) => s.clearSession);

  const allocation = useGameStore((s) => s.allocation);
  const setPercent = useGameStore((s) => s.setPercent);
  const setRole = useGameStore((s) => s.setRole);
  const reset = useGameStore((s) => s.reset);

  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  const role = roleId ? getRole(roleId) : null;
  const profile = useMemo(() => matchProfile(allocation), [allocation]);

  useEffect(() => {
    if (!sessionId) return;
    const unsubscribe = subscribeToParticipants(sessionId, setParticipants);
    return unsubscribe;
  }, [sessionId]);

  useEffect(() => {
    if (role?.fixedBlock) {
      setRole(role.id, { [role.fixedBlock]: role.fixedPercent });
    }
  }, [role, setRole]);

  if (!sessionId || !participantId || storedRoomCode !== roomCode || !role) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
        <StickerCard className="max-w-md p-6">
          <h1 className="font-display text-2xl mb-3">Session not found</h1>
          <p className="text-sm sm:text-base mb-5">
            This room link isn&apos;t linked to an active session on this
            device. Join or host a new room to continue.
          </p>
          <Link href="/group">
            <Button variant="primary">Back to Group Roleplay</Button>
          </Link>
        </StickerCard>
      </main>
    );
  }

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

  async function handleChangeRole() {
    if (!participantId || !role) return;
    const currentIndex = ROLE_ORDER.indexOf(role.id);
    const nextRoleId = ROLE_ORDER[(currentIndex + 1) % ROLE_ORDER.length];
    await updateParticipantRole(participantId, nextRoleId);
    setRoleId(nextRoleId);
  }

  function handlePlayAgain() {
    reset();
    clearSession();
    router.push("/mode");
  }

  if (allReady) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center gap-6 px-4 py-10 sm:py-14">
        <h1 className="font-display text-2xl sm:text-3xl text-white text-center">
          Everyone&apos;s allocations
        </h1>

        <div className="grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {participants.map((p) => (
            <div key={p.id} className="flex flex-col gap-4">
              <StickerCard tone="navy" className="p-4 sm:p-5 text-center">
                <p className="font-display text-xs uppercase tracking-[0.3em] text-brand-gold mb-1">
                  {p.display_name}
                  {p.role_id && ` · ${getRole(p.role_id).name}`}
                </p>
                <h2 className="font-display text-xl">
                  {p.profile_result?.name}
                </h2>
              </StickerCard>
              {p.profile_result && <MetricsGrid metrics={p.profile_result.metrics} />}
            </div>
          ))}
        </div>

        <div className="w-full max-w-3xl">
          <ReflectionQuestions discussionPrompt="Compare your profiles with your group — did you end up with the same character? Where did your priorities differ? What does that tell you about how different students manage the same 40 hours?" />
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
            Waiting for the rest of the group…
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

  if (!started) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12 text-center">
        <ScreenHeader />
        <h1 className="font-display text-2xl sm:text-3xl text-white">
          Waiting room
        </h1>
        <RoomCodeBadge code={roomCode} />

        <StickerCard tone="gold" className="w-full max-w-sm p-5 text-center">
          <p className="text-sm font-bold mb-1">You are</p>
          <p className="font-display text-2xl">{role.name}</p>
        </StickerCard>
        <button
          onClick={handleChangeRole}
          className="text-sm sm:text-base font-bold text-brand-red underline underline-offset-4"
        >
          ⇄ Change to a different role
        </button>

        <p className="text-sm sm:text-base max-w-sm text-white">
          Share this code with your group (3+ players recommended). Everyone
          can allocate whenever they&apos;re ready — you don&apos;t have to
          wait for the others to start.
        </p>
        <StickerCard className="w-full max-w-sm p-5">
          <ParticipantsList participants={participants} />
        </StickerCard>
        <Button variant="primary" size="lg" onClick={() => setStarted(true)}>
          Start ›
        </Button>
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

        <div className="mb-4">
          <Ribbon color="red" className="mb-4">
            {role.name} — Spend 100% of your time budget across 7 activities
            for 1 week!
          </Ribbon>
          <RoleContextCard role={role} />
        </div>

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
              disabled={role.fixedBlock === key}
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
