"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  createSession,
  getSessionByRoomCode,
  joinSession,
  listParticipants,
} from "@/lib/supabase/sessions";
import { ROLE_ORDER } from "@/lib/game/roles";
import { useGameStore } from "@/lib/store/useGameStore";
import { useSessionStore } from "@/lib/store/useSessionStore";

export default function GroupLobbyPage() {
  const router = useRouter();
  const setPlayerName = useGameStore((s) => s.setPlayerName);
  const setSession = useSessionStore((s) => s.setSession);

  const [tab, setTab] = useState<"create" | "join">("create");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isSupabaseConfigured) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12">
        <StickerCard className="w-full max-w-md p-6 text-center">
          <h1 className="font-display text-2xl mb-3">
            Group Roleplay needs a database
          </h1>
          <p className="text-sm sm:text-base mb-3">
            This mode syncs a group in real time via Supabase. Add these to{" "}
            <code className="break-all">.env.local</code> to enable it:
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
    if (!name.trim()) {
      setError("Enter your name first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const session = await createSession("group");
      const participant = await joinSession(session.id, name.trim(), ROLE_ORDER[0]);
      setPlayerName(name.trim());
      setSession({
        sessionId: session.id,
        roomCode: session.room_code,
        participantId: participant.id,
        mode: "group",
        roleId: ROLE_ORDER[0],
        isHost: true,
      });
      router.push(`/group/${session.room_code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin() {
    if (!name.trim() || !code.trim()) {
      setError("Enter your name and the room code.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const session = await getSessionByRoomCode(code.trim());
      if (!session || session.mode !== "group") {
        setError("That room code doesn't match a Group Roleplay game.");
        return;
      }
      const existing = await listParticipants(session.id);
      const roleId = ROLE_ORDER[existing.length % ROLE_ORDER.length];
      const participant = await joinSession(session.id, name.trim(), roleId);
      setPlayerName(name.trim());
      setSession({
        sessionId: session.id,
        roomCode: session.room_code,
        participantId: participant.id,
        mode: "group",
        roleId,
        isHost: false,
      });
      router.push(`/group/${session.room_code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <h1 className="font-display text-3xl sm:text-4xl text-center">
        Group Roleplay
      </h1>
      <p className="text-sm sm:text-base text-center max-w-sm">
        Each player gets assigned a role with its own constraints — Intern,
        Part-time Worker, Student Leader, Free Agent, or Carer.
      </p>

      <div className="flex gap-2">
        <Button
          variant={tab === "create" ? "primary" : "outline"}
          onClick={() => {
            setTab("create");
            setError(null);
          }}
        >
          Host a room
        </Button>
        <Button
          variant={tab === "join" ? "primary" : "outline"}
          onClick={() => {
            setTab("join");
            setError(null);
          }}
        >
          Join a room
        </Button>
      </div>

      <StickerCard className="w-full max-w-sm p-6">
        <label className="block text-sm font-bold mb-1">Your name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-2xl border-ink px-4 py-3 text-base font-semibold mb-4"
          maxLength={40}
        />

        {tab === "join" && (
          <>
            <label className="block text-sm font-bold mb-1">Room code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABCDE"
              className="w-full rounded-2xl border-ink px-4 py-3 text-base font-semibold mb-4 tracking-[0.3em] uppercase"
              maxLength={5}
            />
          </>
        )}

        {error && (
          <p className="text-sm text-brand-red font-bold mb-3">{error}</p>
        )}

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading}
          onClick={tab === "create" ? handleCreate : handleJoin}
        >
          {loading ? "Please wait…" : tab === "create" ? "Host room ›" : "Join room ›"}
        </Button>
      </StickerCard>
    </main>
  );
}
