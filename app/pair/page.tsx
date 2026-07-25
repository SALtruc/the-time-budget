"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { StripeDivider } from "@/components/ui/StripeDivider";
import { DigitInput } from "@/components/ui/DigitInput";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  createSession,
  getSessionByRoomCode,
  joinSession,
} from "@/lib/supabase/sessions";
import { useGameStore } from "@/lib/store/useGameStore";
import { usePlayerStore } from "@/lib/store/usePlayerStore";
import { useSessionStore } from "@/lib/store/useSessionStore";

type Step = "intro" | "create" | "code-shown" | "join";

export default function PairLobbyPage() {
  const router = useRouter();
  const setPlayerName = useGameStore((s) => s.setPlayerName);
  const setSession = useSessionStore((s) => s.setSession);
  const playerProfileId = usePlayerStore((s) => s.playerProfileId);

  const [step, setStep] = useState<Step>("intro");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isSupabaseConfigured) {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12">
        <StickerCard className="w-full max-w-md p-6 text-center">
          <h1 className="font-display text-2xl mb-3">
            Pair Comparison needs a database
          </h1>
          <p className="text-sm sm:text-base mb-3">
            This mode syncs two players in real time via Supabase. Add these
            to <code className="break-all">.env.local</code> to enable it:
          </p>
          <div className="flex flex-col gap-2 text-left">
            <code className="block break-all rounded bg-brand-grey/40 px-2 py-1.5 text-xs sm:text-sm">
              NEXT_PUBLIC_SUPABASE_URL
            </code>
            <code className="block break-all rounded bg-brand-grey/40 px-2 py-1.5 text-xs sm:text-sm">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>
          </div>
        </StickerCard>
      </main>
    );
  }

  async function handleCreate() {
    setLoading(true);
    setError(null);
    try {
      const session = await createSession("pair");
      setRoomCode(session.room_code);
      setStep("code-shown");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleEnterRoomAsHost() {
    if (!name.trim()) {
      setError("Enter your name first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const session = await getSessionByRoomCode(roomCode);
      if (!session) throw new Error("Session not found.");
      const participant = await joinSession(
        session.id,
        name.trim(),
        null,
        playerProfileId
      );
      setPlayerName(name.trim());
      setSession({
        sessionId: session.id,
        roomCode: session.room_code,
        participantId: participant.id,
        mode: "pair",
        isHost: true,
        bonusHours: session.bonus_hours,
      });
      router.push(`/pair/${session.room_code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin() {
    if (!name.trim() || code.length !== 5) {
      setError("Enter your name and the 5-digit code.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const session = await getSessionByRoomCode(code);
      if (!session || session.mode !== "pair") {
        setError("That code doesn't match a Pair Comparison game.");
        return;
      }
      const participant = await joinSession(
        session.id,
        name.trim(),
        null,
        playerProfileId
      );
      setPlayerName(name.trim());
      setSession({
        sessionId: session.id,
        roomCode: session.room_code,
        participantId: participant.id,
        mode: "pair",
        isHost: false,
        bonusHours: session.bonus_hours,
      });
      router.push(`/pair/${session.room_code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "intro") {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col px-4 py-8 sm:py-10">
        <ScreenHeader backHref="/mode" />
        <div className="mx-auto w-full max-w-md">
          <StripeDivider />
          <StickerCard className="rounded-t-none p-6 sm:p-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl text-brand-red mb-8">
              Pair Comparison
            </h1>
            <div className="flex flex-col gap-4">
              <Button variant="secondary" size="lg" onClick={() => setStep("create")}>
                Create invitation code
              </Button>
              <Button
                className="!bg-brand-cyan !text-brand-navy"
                size="lg"
                onClick={() => setStep("join")}
              >
                Enter invitation code
              </Button>
            </div>
          </StickerCard>

          <div className="mt-8 flex items-end gap-3">
            <Image
              src="/assets/mascot-clipboard.png"
              alt=""
              width={120}
              height={150}
              className="w-24 sm:w-32 h-auto shrink-0"
            />
            <StickerCard className="p-4 text-sm sm:text-base">
              Let&apos;s do this challenge with a partner! Learn together,
              discuss together.
            </StickerCard>
          </div>
        </div>
      </main>
    );
  }

  if (step === "create") {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col px-4 py-8 sm:py-10">
        <ScreenHeader backHref="/pair" />
        <div className="mx-auto w-full max-w-md">
          <StripeDivider />
          <StickerCard className="rounded-t-none p-6 sm:p-8 text-center">
            <h1 className="font-display text-2xl sm:text-3xl text-brand-red mb-4">
              Invitation Code
            </h1>
            <p className="mb-8 text-sm sm:text-base">
              You can create an invitation code to send to your friend.
            </p>
            {error && (
              <p className="mb-4 text-sm font-bold text-brand-red">{error}</p>
            )}
            <Button
              variant="primary"
              size="lg"
              disabled={loading}
              onClick={handleCreate}
            >
              {loading ? "Please wait…" : "Create ›"}
            </Button>
          </StickerCard>
        </div>
      </main>
    );
  }

  if (step === "code-shown") {
    return (
      <main className="bg-grid-blue flex flex-1 flex-col px-4 py-8 sm:py-10">
        <ScreenHeader />
        <div className="mx-auto w-full max-w-md">
          <StripeDivider />
          <StickerCard className="rounded-t-none p-6 sm:p-8 text-center">
            <h1 className="font-display text-2xl sm:text-3xl text-brand-red mb-4">
              Invitation Code
            </h1>
            <p className="mb-6 text-sm sm:text-base">
              Share this code with your friend.
            </p>
            <p className="mb-6 font-display text-4xl tracking-[0.3em]">
              {roomCode}
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigator.clipboard?.writeText(roomCode)}
              className="mb-4"
            >
              Copy
            </Button>

            <div className="mt-6 border-t-2 border-brand-navy/10 pt-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border-ink px-4 py-3 text-base font-semibold mb-4"
                maxLength={40}
              />
              {error && (
                <p className="mb-3 text-sm font-bold text-brand-red">{error}</p>
              )}
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={loading}
                onClick={handleEnterRoomAsHost}
              >
                {loading ? "Please wait…" : "Continue to waiting room ›"}
              </Button>
            </div>
          </StickerCard>
        </div>
      </main>
    );
  }

  // step === "join"
  return (
    <main className="bg-grid-blue flex flex-1 flex-col px-4 py-8 sm:py-10">
      <ScreenHeader backHref="/pair" />
      <div className="mx-auto w-full max-w-md">
        <StripeDivider />
        <StickerCard className="rounded-t-none p-6 sm:p-8 text-center">
          <h1 className="font-display text-2xl sm:text-3xl text-brand-red mb-4">
            Invitation Code
          </h1>
          <p className="mb-6 text-sm sm:text-base">
            You can get an invitation code from your friend.
          </p>
          <div className="mb-6">
            <DigitInput length={5} value={code} onChange={setCode} />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-2xl border-ink px-4 py-3 text-base font-semibold mb-4"
            maxLength={40}
          />
          {error && (
            <p className="mb-3 text-sm font-bold text-brand-red">{error}</p>
          )}
          <Button
            variant="primary"
            size="lg"
            disabled={loading}
            onClick={handleJoin}
          >
            {loading ? "Please wait…" : "Start ›"}
          </Button>
        </StickerCard>
      </div>
    </main>
  );
}
