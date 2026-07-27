"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createPlayerProfile } from "@/lib/supabase/profiles";
import { usePlayerStore } from "@/lib/store/usePlayerStore";

export default function RmitIdPage() {
  const router = useRouter();
  const studentId = usePlayerStore((s) => s.studentId);
  const setStudentId = usePlayerStore((s) => s.setStudentId);
  const setPlayerProfileId = usePlayerStore((s) => s.setPlayerProfileId);

  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = /^[0-9]{6}$/.test(studentId);

  async function handleContinue() {
    setTouched(true);
    if (!isValid) return;

    if (!isSupabaseConfigured) {
      router.push("/avatar");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const profile = await createPlayerProfile(studentId);
      setPlayerProfileId(profile.id);
      router.push("/avatar");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-grid-yellow flex flex-1 flex-col px-4 py-8 sm:py-10">
      <ScreenHeader theme="yellow" />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-start gap-6">
        <Image
          src="/assets/logo.png"
          alt="The Time Budget"
          width={800}
          height={220}
          className="w-full max-w-xs h-auto"
        />

        <StickerCard className="w-full p-6 sm:p-8 text-center">
          <p className="text-lg sm:text-xl">This is exclusively for</p>
          <p className="font-display text-2xl sm:text-3xl text-brand-red mb-6">
            RMIT Students
          </p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="Enter your Student ID"
            className="w-full border-b-2 border-brand-navy bg-transparent pb-2 text-center text-lg font-semibold outline-none placeholder:text-brand-navy/40"
          />
          {touched && !isValid && (
            <p className="mt-3 text-sm font-bold text-brand-red">
              Please enter your 6-digit SID to verify!
            </p>
          )}
          {error && (
            <p className="mt-3 text-sm font-bold text-brand-red">{error}</p>
          )}
        </StickerCard>

        <Image
          src="/assets/mascot-start.png"
          alt=""
          width={140}
          height={165}
          className="w-28 sm:w-36 h-auto self-start"
        />

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={submitting}
          onClick={handleContinue}
        >
          {submitting ? "Please wait…" : "Next ›"}
        </Button>
      </div>
    </main>
  );
}
