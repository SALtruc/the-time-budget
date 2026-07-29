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

  const isValid = /^[0-9]{7}$/.test(studentId);
  const errorId = "student-id-error";

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
    <main className="bg-grid-yellow flex flex-1 flex-col px-4 py-6 sm:py-10">
      <ScreenHeader theme="yellow" />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-start gap-5">
        <Image
          src="/assets/logo.png"
          alt="The Time Budget"
          width={800}
          height={220}
          className="h-auto w-full max-w-xs"
        />

        <StickerCard className="w-full p-5 text-center sm:p-7">
          <p className="mb-3 font-display text-xl text-brand-blue sm:text-2xl">
            Verify your SID
          </p>
          <p className="text-lg sm:text-xl">This is exclusively for</p>
          <p className="mb-6 font-display text-2xl text-brand-red sm:text-3xl">
            RMIT Students
          </p>
          <label htmlFor="student-id" className="sr-only">
            Student ID
          </label>
          <input
            id="student-id"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value.replace(/\D/g, "").slice(0, 7))
            }
            placeholder="Enter your Student ID"
            aria-invalid={touched && !isValid}
            aria-describedby={touched && !isValid ? errorId : undefined}
            className="w-full border-b-2 border-brand-navy bg-transparent pb-2 text-center text-lg font-semibold outline-none placeholder:text-brand-navy/40"
          />
          {touched && !isValid && (
            <p id={errorId} className="mt-3 text-sm font-bold text-brand-red">
              Please enter your 7-digit SID to verify.
            </p>
          )}
          {error && (
            <p className="mt-3 text-sm font-bold text-brand-red">{error}</p>
          )}

          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full !bg-brand-blue !text-white"
              disabled={submitting}
              onClick={handleContinue}
            >
              {submitting ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </StickerCard>

        <Image
          src="/assets/mascot-start.png"
          alt=""
          width={180}
          height={220}
          className="-mt-1 h-auto w-44 self-start sm:w-52"
        />
      </div>
    </main>
  );
}
