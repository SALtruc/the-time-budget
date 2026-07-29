"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { usePlayerStore } from "@/lib/store/usePlayerStore";

export default function RmitIdPage() {
  const router = useRouter();
  const studentId = usePlayerStore((s) => s.studentId);
  const setStudentId = usePlayerStore((s) => s.setStudentId);

  const [touched, setTouched] = useState(false);

  const isValid = /^[0-9]{7}$/.test(studentId);
  const errorId = "student-id-error";

  function handleContinue() {
    setTouched(true);
    if (!isValid) return;
    router.push("/avatar");
  }

  return (
    <main className="bg-grid-yellow flex flex-1 flex-col px-4 py-6 sm:py-10">
      <ScreenHeader theme="yellow" />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center pb-6">
        <Image
          src="/assets/logo.png"
          alt="The Time Budget"
          width={800}
          height={220}
          className="relative z-10 mb-[-42px] h-auto w-full max-w-[360px]"
          priority
        />

        <StickerCard className="w-full px-6 pb-8 pt-24 text-center sm:px-8 sm:pb-10">
          <p className="text-xl font-semibold sm:text-2xl">
            This is exclusively for
          </p>
          <p className="mb-10 font-display text-3xl text-brand-red sm:text-4xl">
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
            className="w-full border-b-2 border-brand-navy bg-transparent pb-3 text-center text-xl font-semibold outline-none placeholder:text-brand-navy/25 sm:text-2xl"
          />
        </StickerCard>

        <div className="mt-5 flex w-full items-start gap-3">
          <Image
            src="/assets/mascot-start.png"
            alt=""
            width={260}
            height={322}
            className="h-auto w-40 shrink-0 sm:w-48"
          />
          <div className="flex flex-1 flex-col items-stretch gap-5 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full !bg-brand-red px-4 text-sm !text-white sm:text-base"
              onClick={handleContinue}
              aria-describedby={touched && !isValid ? errorId : undefined}
            >
              Please enter your SID to verify!
            </Button>
            {touched && !isValid && (
              <p id={errorId} className="sr-only">
                Please enter your 7-digit SID to verify.
              </p>
            )}
            <div
              className="flex gap-1 self-end rounded-[10px] border-2 border-brand-navy bg-white px-3 py-2 shadow-sticker-sm"
              aria-hidden
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className="block size-4 bg-brand-gold"
                  style={{
                    clipPath:
                      "polygon(50% 0, 61% 35%, 98% 35%, 68% 56%, 79% 91%, 50% 70%, 21% 91%, 32% 56%, 2% 35%, 39% 35%)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
