"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { Ribbon } from "@/components/ui/Ribbon";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { InfoModal } from "@/components/ui/InfoModal";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { updatePlayerProfile } from "@/lib/supabase/profiles";
import { usePlayerStore } from "@/lib/store/usePlayerStore";
import { YEAR_OF_STUDY_OPTIONS } from "@/lib/game/yearOfStudy";

export default function ProfilePage() {
  const router = useRouter();
  const yearOfStudy = usePlayerStore((s) => s.yearOfStudy);
  const program = usePlayerStore((s) => s.program);
  const accessCode = usePlayerStore((s) => s.accessCode);
  const setProfileFields = usePlayerStore((s) => s.setProfileFields);
  const playerProfileId = usePlayerStore((s) => s.playerProfileId);

  const [submitting, setSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const hasYear = (YEAR_OF_STUDY_OPTIONS as readonly string[]).includes(yearOfStudy);
  const hasProgram = program.trim().length > 0;

  async function handleNext() {
    if (!hasYear || !hasProgram) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);
    if (isSupabaseConfigured && playerProfileId) {
      await updatePlayerProfile(playerProfileId, {
        yearOfStudy,
        program,
        accessCode,
      }).catch(() => {});
    }
    router.push("/mode");
  }

  return (
    <main className="bg-grid-blue flex flex-1 flex-col px-4 py-6 sm:py-10">
      <ScreenHeader backHref="/avatar" />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 sm:gap-5">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/mascot-start.png"
            alt=""
            width={150}
            height={185}
            className="h-auto w-24 shrink-0 sm:w-28 animate-mascot-bob"
          />
          <div className="rounded-[16px] border-ink bg-white px-4 py-3 text-sm font-semibold shadow-sticker-sm sm:text-base">
            Tell us more about yourself
          </div>
        </div>

        <div role="radiogroup" aria-labelledby="year-of-study-label">
          <Ribbon color="gold" className="mb-2">
            <span id="year-of-study-label">What year of study are you in?</span>
          </Ribbon>
          <div className="flex flex-wrap gap-2">
            {YEAR_OF_STUDY_OPTIONS.map((option) => {
              const isSelected = yearOfStudy === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setProfileFields({ yearOfStudy: option })}
                  className={clsx(
                    "rounded-full border-ink px-4 py-2 text-sm font-bold shadow-sticker-sm transition-colors sm:text-base",
                    isSelected
                      ? "bg-brand-navy text-white"
                      : "bg-white text-brand-navy",
                    showErrors && !hasYear && "!border-brand-red"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {showErrors && !hasYear && (
            <p className="mt-2 text-sm font-bold text-white" role="alert">
              Please choose your year of study.
            </p>
          )}
        </div>

        <div>
          <Ribbon color="gold" className="mb-2">
            <label htmlFor="program">What is your current program?</label>
          </Ribbon>
          <input
            id="program"
            type="text"
            value={program}
            onChange={(e) => setProfileFields({ program: e.target.value })}
            placeholder="e.g. Digital Marketing"
            aria-invalid={showErrors && !hasProgram}
            className={clsx(
              "w-full rounded-[16px] border-ink bg-white px-4 py-2.5 text-base font-semibold shadow-sticker-sm",
              showErrors && !hasProgram && "!border-brand-red"
            )}
          />
          {showErrors && !hasProgram && (
            <p className="mt-2 text-sm font-bold text-white" role="alert">
              Please enter your program.
            </p>
          )}
        </div>

        <div>
          <Ribbon
            color="gold"
            className="mb-2"
            contentClassName="flex items-center gap-3 pr-10"
          >
            <span>Access code (Optional)</span>
            <InfoModal title="Access code">
              If your facilitator gave you a class access code, enter it here. Otherwise,
              leave this blank.
            </InfoModal>
          </Ribbon>
          <input
            type="text"
            value={accessCode}
            onChange={(e) => setProfileFields({ accessCode: e.target.value })}
            placeholder="e.g. CXVED"
            className="w-full rounded-[16px] border-ink bg-white px-4 py-2.5 text-base font-semibold shadow-sticker-sm"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="secondary"
            size="lg"
            disabled={submitting}
            onClick={handleNext}
          >
            {submitting ? "Please wait..." : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
}
