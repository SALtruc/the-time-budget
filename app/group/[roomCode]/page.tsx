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
import { StripeDivider } from "@/components/ui/StripeDivider";
import { BlockAllocatorCard } from "@/components/game/BlockAllocatorCard";
import { AllocationSummaryBar } from "@/components/game/AllocationSummaryBar";
import { TimeBudgetCard } from "@/components/game/TimeBudgetCard";
import { ParticipantsList } from "@/components/game/ParticipantsList";
import { ParticipantResultCard } from "@/components/game/ParticipantResultCard";
import { ProfileResultCard } from "@/components/game/ProfileResultCard";
import { ReflectionQuestions } from "@/components/game/ReflectionQuestions";
import { ChallengeAgainCTA } from "@/components/game/ChallengeAgainCTA";
import { RoleContextCard } from "@/components/game/RoleContextCard";
import { AllocationComparisonGrid } from "@/components/game/AllocationComparisonGrid";
import { BLOCK_ORDER } from "@/lib/game/blocks";
import { matchProfile } from "@/lib/game/matchProfile";
import { getRole, ROLE_ORDER } from "@/lib/game/roles";
import { useGameStore } from "@/lib/store/useGameStore";
import { usePlayerStore } from "@/lib/store/usePlayerStore";
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
  const setRoleId = useSessionStore((s) => s.setRoleId);
  const clearSession = useSessionStore((s) => s.clearSession);

  const allocation = useGameStore((s) => s.allocation);
  const setPercent = useGameStore((s) => s.setPercent);
  const setRole = useGameStore((s) => s.setRole);
  const reset = useGameStore((s) => s.reset);
  const yearOfStudy = usePlayerStore((s) => s.yearOfStudy);

  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const [revealResults, setRevealResults] = useState(false);

  const role = roleId ? getRole(roleId) : null;
  const profile = useMemo(() => matchProfile(allocation), [allocation]);
  const myIndex = Math.max(0, participants.findIndex((p) => p.id === participantId));

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
          <h1 className="mb-3 font-display text-2xl">Session not found</h1>
          <p className="mb-5 text-sm sm:text-base">
            This room link isn&apos;t linked to an active session on this device.
            Join or host a new room to continue.
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

  if (allReady && !revealResults) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center gap-6 px-4 py-8 sm:py-10">
        <div className="w-full max-w-5xl">
          <ScreenHeader backHref="/mode" />
        </div>
        <div className="w-full max-w-5xl">
          <Ribbon color="red" className="mb-3">
            <p className="mb-1 font-display text-lg sm:text-xl">Before the reveal: discuss</p>
            <p className="text-sm font-normal sm:text-base">
              Compare how each role changed the 168-hour allocation before the
              Time Profiles are revealed.
            </p>
          </Ribbon>
          <AllocationComparisonGrid participants={participants} />
        </div>
        <div className="w-full max-w-3xl">
          <ReflectionQuestions variant="group" />
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
        <div className="w-full max-w-5xl">
          <ScreenHeader backHref="/mode" />
        </div>
        <Image
          src="/assets/logo.png"
          alt="The Time Budget"
          width={800}
          height={220}
          className="h-auto w-full max-w-xs"
        />

        <div className="grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {participants.map((p, i) => (
            <ParticipantResultCard
              key={p.id}
              index={i}
              roleName={p.role_id ? getRole(p.role_id).name : undefined}
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
            variant="group"
            discussionPrompt="Compare your profiles with your group: where did priorities differ, and what does that say about different ways to manage the same 168 hours?"
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
          <h1 className="mb-3 font-display text-2xl">
            Waiting for the rest of the group...
          </h1>
          <p className="mb-5 text-sm sm:text-base">
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
      <main className="bg-grid-blue flex flex-1 flex-col items-center gap-6 px-4 py-8 text-center sm:py-10">
        <ScreenHeader backHref="/group" />
        <RoomCodeBadge code={roomCode} />

        <div className="w-full max-w-sm">
          <StripeDivider />
          <StickerCard className="rounded-t-none p-6 sm:p-8">
            <h1 className="mb-6 font-display text-3xl text-brand-red">
              Group roleplay
            </h1>

            <StickerCard tone="gold" className="p-5 text-center">
              <p className="mb-1 text-sm font-bold">You are</p>
              <p className="section-title-shadow text-stroke font-display text-2xl text-white">
                {role.name}
              </p>
            </StickerCard>
            <button
              type="button"
              onClick={handleChangeRole}
              className="mt-4 text-sm font-bold text-brand-red underline underline-offset-4 sm:text-base"
            >
              Change to a different role
            </button>
          </StickerCard>
        </div>

        <p className="max-w-sm text-left text-sm text-white sm:text-base">
          Share this code with your group (3+ players recommended). Everyone
          can allocate whenever they&apos;re ready; you don&apos;t have to wait for the
          others to start.
        </p>
        <StickerCard className="w-full max-w-sm p-5">
          <ParticipantsList participants={participants} />
        </StickerCard>
        <Button variant="primary" size="lg" onClick={() => setStarted(true)}>
          Start
        </Button>
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

        <div className="mb-4">
          <Ribbon color="red" className="mb-4">
            Player {myIndex + 1} - {role.name}
          </Ribbon>
          <RoleContextCard role={role} />
        </div>

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
              disabled={role.fixedBlock === key}
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
